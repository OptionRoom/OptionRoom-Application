import React, {useContext, useEffect, useState} from "react";
import numeral from "numeral";

import {useStyles} from "./styles";
import {get} from "lodash";
import Button from "../Button";
import {
    fromWei,
    toWei,
    formatTradeValue
} from "../../shared/helper";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    approveContractForSpender,
    getContractAddress
} from '../../shared/contracts/contracts.helper';

import TradeInput from '../../components/TradeInput';
import {
    buyMarketOptions,
    getBuyAmount, getMarketPoolBalances
} from "../../methods/market-controller.methods";
import {
    ContractNames
} from "../../shared/constants";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const useGetBuyPrices = (wallet, marketContractAddress) => {
    const [buySellDetails, setBuySellDetails] = useState([]);

    useEffect(() => {
        const init = async () => {
            const MarketOptionTokensPercentage = await getMarketPoolBalances(wallet, marketContractAddress);
            const totalCount = MarketOptionTokensPercentage.reduce((a, b) => a + parseFloat(b), 0);
            const formattedPrices = MarketOptionTokensPercentage.map((entry) => {
                return parseFloat(entry)/totalCount;
            });
            setBuySellDetails(formattedPrices);
        };

        if (wallet, marketContractAddress) {
            init();
        }

    }, [wallet, marketContractAddress]);

    return buySellDetails;
};

export const useGetBuySellPosition = (wallet, marketContractAddress, tradeAmount, option) => {
    const [buySellDetails, setBuySellDetails] = useState({
        averagePrice: 0,
        estShares: 0,
        maxRoi: 0
    });

    useEffect(() => {
        const init = async () => {
            const numberOfBoughtTokens = await getBuyAmount(
                wallet,
                marketContractAddress,
                getContractAddress(ContractNames.busd),
                toWei(tradeAmount),
                option
            );

            const averagePrice = parseFloat(tradeAmount) / fromWei(numberOfBoughtTokens);
            const estShares = fromWei(numberOfBoughtTokens);
            const maxRoi = (parseFloat(fromWei(numberOfBoughtTokens)) - parseFloat(tradeAmount)) / parseFloat(tradeAmount);

            setBuySellDetails({
                averagePrice,
                estShares,
                maxRoi
            });
        };

        if (wallet && marketContractAddress && (tradeAmount && tradeAmount >= 0) && (option || option === 0)) {
            init();
        }

    }, [wallet, marketContractAddress, tradeAmount, option]);

    return buySellDetails;
};

export const useGetMaxTradeSize = (wallet, marketContractAddress, tradeOption, walletBalanceOfCollateralToken) => {
    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            setMaxTradeSize(parseFloat(fromWei(walletBalanceOfCollateralToken)));
        };

        init();

    }, [wallet, marketContractAddress, tradeOption, walletBalanceOfCollateralToken]);

    return maxTradeSize;
};


function MarketBuyWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    //Buy & Sell
    const [tradeInput, setTradeInput] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const buySellDetails = useGetBuySellPosition(accountContext.account, props.marketContractAddress, tradeInput, get(props.selectedOption, ['index']));
    const buyPrices = useGetBuyPrices(accountContext.account, props.marketContractAddress);
    const maxTradeSize = useGetMaxTradeSize(accountContext.account, props.marketContractAddress, get(props.selectedOption, ['index']), props.walletBalanceOfCollateralToken);

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (props.walletAllowanceOfCollateralToken == 0) {
                await approveContractForSpender(accountContext.account, ContractNames.busd, ContractNames.marketControllerV4);
                props.onApprove && props.onApprove('CollateralToken');
            } else {
                //wallet, marketAddress, tokenAddress, investmentAmount, outcomeIndex, minOutcomeTokensToBuy
                await buyMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    getContractAddress(ContractNames.busd),
                    toWei(tradeInput),
                    get(props.selectedOption, ['index']),
                    0
                );
                props.onTrade && props.onTrade();
            }
        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }
    };

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            classes={{
                paper: classes.paper,
            }}
            onClose={handleClose}
            aria-labelledby="DepositModal-dialog-title"
            open={props.open}
            disableBackdropClick={true}
        >
            <MuiDialogTitle
                id="DepositModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    Buy {get(props.selectedOption, ['title'])}
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.BuySellWidget}>
                    <div className={classes.BuySellWidgetAmount}>
                        <div className={classes.BuySellWidgetAmount__Header}>
                            <span>Amount</span>
                            <span>{formatTradeValue(maxTradeSize)}</span>
                        </div>
                        <div className={classes.BuySellWidgetAmount__InputWrap}>
                            <TradeInput max={maxTradeSize}
                                        min={0}
                                        value={tradeInput}
                                        onValidityUpdate={(valid) => {
                                            //setIsTradeDisabled(!valid);
                                        }}
                                        onChange={(e) => {
                                            clearTimeout(updateTradeInputInterval);
                                            updateTradeInputInterval = setTimeout(() => {
                                                setTradeInput(e);
                                            }, 100);

                                            if (e == 0) {
                                                setIsTradeDisabled(true);
                                            } else {
                                                setIsTradeDisabled(false);
                                            }
                                        }}/>
                        </div>
                    </div>
                    <div className={classes.BuySellWidgetInfo}>
                        {
                            [
                                {
                                    title: 'Est. Shares',
                                    value: numeral(get(buySellDetails, ['estShares']) || 0).format("0,0.00"),
                                },
                            ].map((entry, index) => {
                                return (
                                    <div key={`data-${index}`}
                                         className={classes.BuySellWidgetInfo__Row}>
                                        <div className={classes.BuySellWidgetInfo__RowTitle}>{entry.title}</div>
                                        <div
                                            className={classes.BuySellWidgetInfo__RowValue}>{entry.value}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Button color="primary"
                            size={"large"}
                            fullWidth={true}
                            onClick={startTrade}
                            isDisabled={isTradeDisabled}
                            isProcessing={isTradeInProgress}>
                        {
                            props.walletAllowanceOfCollateralToken == 0 ? 'Approve' : 'Trade'
                        }
                    </Button>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default MarketBuyWidget;
