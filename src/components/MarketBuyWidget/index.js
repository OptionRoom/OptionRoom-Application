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
    getContractAddress, getDefaultCollateralToken
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
import {formatAddress} from "../../shared/SmartContractsContextProvider";
import {smartState} from "../../shared/SmartState";

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

export const useGetBuySellPosition = (wallet, marketContractAddress, tradeAmount, option, token) => {
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
                token,
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

        if (wallet && marketContractAddress && (tradeAmount && tradeAmount >= 0) && (option || option === 0) && token) {
            init();
        }

    }, [wallet, marketContractAddress, tradeAmount, option, token]);

    return buySellDetails;
};

export const useGetMaxTradeSize = (selectedInToken) => {
    const accountContext = useContext(AccountContext);

    const [maxTradeSize, setMaxTradeSize] = useState(0);

    useEffect(() => {
        const init = async () => {
            const balance = get(smartState.walletBalanceOfSomething, [formatAddress(accountContext.account), formatAddress(selectedInToken.address)], 0);
            setMaxTradeSize(parseFloat(fromWei(balance)).toFixed(2));
        };

        if(accountContext.account && selectedInToken && smartState.walletBalanceOfSomething) {
            init();
        }
    }, [accountContext.account, selectedInToken, smartState.walletBalanceOfSomething]);

    return maxTradeSize;
};

export const useIsTokenApprovedForMarketController = (selectedInToken) => {
    const accountContext = useContext(AccountContext);

    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const init = async () => {
            const isApproved = get(
                smartState.walletAllowanceOfSomething,
                [formatAddress(accountContext.account), formatAddress(selectedInToken), formatAddress(getContractAddress(ContractNames.marketControllerV4))],
                0
            );
            setIsApproved(isApproved > 0 ? true : false);
        };

        if(accountContext.account && selectedInToken && smartState.walletAllowanceOfSomething) {
            init();
        }
    }, [accountContext.account, selectedInToken, smartState.walletAllowanceOfSomething]);

    return isApproved;
};


function MarketBuyWidget(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    let updateTradeInputInterval = null;

    const defaultCollateralToken = getDefaultCollateralToken();

    const [selectedInToken, setSelectedInToken] = useState(defaultCollateralToken);
    //Buy & Sell
    const [tradeInput, setTradeInput] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);
    const [isTradeDisabled, setIsTradeDisabled] = useState(true);
    const buySellDetails = useGetBuySellPosition(accountContext.account, props.marketContractAddress, tradeInput, get(props.selectedOption, ['index']), get(selectedInToken, ['address']));
    const isSelectedTokenApprovedForMarketController = useIsTokenApprovedForMarketController(get(selectedInToken, ['address']));
    const maxTradeSize = useGetMaxTradeSize(selectedInToken);

    const startTrade = async () => {
        setIsTradeInProgress(true);
        try {
            if (!isSelectedTokenApprovedForMarketController) {
                await smartState.callApproveContractForSpender(accountContext.account, get(selectedInToken, ['address']), ContractNames.marketControllerV4);
                props.onApprove && props.onApprove('CollateralToken');
            } else {
                await buyMarketOptions(
                    accountContext.account,
                    props.marketContractAddress,
                    get(selectedInToken, ['address']),
                    toWei(tradeInput),
                    get(props.selectedOption, ['index']),
                    0
                );

                smartState.loadMarketWalletData(accountContext.account, props.marketContractAddress);
                smartState.loadWalletBalanceOfToken(accountContext.account, get(selectedInToken, ['address']));
                smartState.loadMarketInfo(accountContext.account, props.marketContractAddress);

                props.onTrade && props.onTrade();
                handleClose();
            }
        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }
    };

    const handleClose = () => {
        props.onClose();
        setTradeInput(0);
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
                    Buy {get(props.selectedOption, ['title'])} option
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
                            <span>{maxTradeSize}</span>
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
                                        }}
                                        withTokenSelector={true}
                                        selectedToken={selectedInToken}
                                        handleSelectNewToken={(token) => {
                                            setSelectedInToken(token);
                                        }}
                            />
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
                            !isSelectedTokenApprovedForMarketController ? 'Approve' : 'Buy'
                        }
                    </Button>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default MarketBuyWidget;
