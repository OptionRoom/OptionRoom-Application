import React, {useState, useContext, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory, useParams } from 'react-router-dom'
import {get} from 'lodash';
import moment from 'moment';
import numeral from "numeral";

import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import MarketCard from "../../components/MarketCard";
import OutcomeProgress from "../../components/OutcomeProgress";
import {useStyles} from "./styles";
import DepositModal from "../../components/DepositModal";

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import OptionBlock from "../../components/OptionBlock";
import {getMarketById} from "../../shared/firestore.service";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { MaxUint256 } from '../../shared/constants';
import UnstakeModal from "../../components/UnstakeModal";

const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};

function Market() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    //Buy & Sell
    const [selectedTradeType, setSelectedTradeType] = useState('buy');
    const [tradeInput, setTradeInput] = useState(0);
    const [selectedTradeOption, setSelectedTradeOption] = useState('Yes');
    const [pricesOfBuy, setPricesOfBuy] = useState(0);
    const [isTradeInProgress, setIsTradeInProgress] = useState(false);

    //Mrket
    const [market, setMarket] = useState(null);
    const { marketId } = useParams();
    const [marketContractId, setMarketContractId] = useState(false);
    const [marketContractData, setMarketContractData] = useState({});

    //Liq
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isAddLiquidityInProgress, setIsAddLiquidityInProgress] = useState(false);

    const classes = useStyles();

    const [walletBalanceOfCollateralToken, setWalletBalanceOfCollateralToken] = useState(0);
    const [walletAllowanceOfCollateralToken, setWalletAllowanceOfCollateralToken] = useState(0);
    const [walletMarketPositions, setWalletMarketPositions] = useState(0);

    const loadWalletBalanceOfCollateralToken = async ()=> {
        const marketApis = new MarketAPIs();
        const balanceOfColletralToken = await marketApis.getWalletBalanceOfCollateralToken(accountContext.account);
        console.log("balanceOfColletralToken", balanceOfColletralToken, fromWei(balanceOfColletralToken));

        if(balanceOfColletralToken == 0){
            await marketApis.mintCollateralToken(accountContext.account, toWei(100));
        }

        setWalletBalanceOfCollateralToken(balanceOfColletralToken);
    };

    const loadWalletAllowanceOfCollateralToken = async ()=> {
        const marketApis = new MarketAPIs();
        const balanceOfAllowanceToken = await marketApis.getWalletAllowanceOfCollateralTokenForMarket(accountContext.account, marketContractId);
        setWalletAllowanceOfCollateralToken(balanceOfAllowanceToken);
    };

    const loadWalletData = async () => {
        loadWalletBalanceOfCollateralToken();
    };

    const loadWalletMarketPastEvents = async () => {
        const marketApis = new MarketAPIs();
        const myPastEvents = await marketApis.getWalletMarketPastEvents(accountContext.account, marketContractId);
        console.log("myPastEvents", myPastEvents);
    };

    useEffect(() => {
        if(accountContext.account && marketContractId) {
            loadWalletAllowanceOfCollateralToken();
            loadWalletMarketPastEvents();
            //getWalletMarketPastEvents
        }
    }, [accountContext.account, marketContractId]);

    useEffect(() => {
        if(accountContext.account) {
            loadWalletData();
        }
    }, [accountContext.account]);

    const loadMarketContractData = async () => {
        const wallet = accountContext.account;
        const marketApis = new MarketAPIs();
        const markets = await marketApis.getMarkets(accountContext.account);
        const marketId = markets[0];
        setMarketContractId(marketId);

        const marketTotalSupply = await marketApis.getMarketTotalSupply(wallet, marketId);
        const marketState = await marketApis.getMarketState(wallet, marketId);
        const WalletOptionTokensBalance = await marketApis.getWalletOptionTokensBalance(wallet, marketId);
        const MarketOptionTokensPercentage = await marketApis.getMarketOptionTokensPercentage(wallet, marketId);
        const MarketOutcome = await marketApis.getMarketOutcome(wallet, marketId);
        const WalletSharesOfMarket = await marketApis.getWalletSharesOfMarket(wallet, marketId);

        setMarketContractData({
            totalSupply: marketTotalSupply,
            state: marketState,
            optionTokensPercentage: MarketOptionTokensPercentage,
            outcome: MarketOutcome,
            walletSharesOfMarket: WalletSharesOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
        });

        handleGetBuyPrice(marketId);
        console.log("marketTotalSupply", marketTotalSupply);
        console.log("marketState", marketState);
        console.log("WalletOptionTokensBalance", WalletOptionTokensBalance);
        console.log("MarketOptionTokensPercentage", MarketOptionTokensPercentage);
        console.log("MarketOutcome", MarketOutcome);
        console.log("WalletSharesOfMarke", WalletSharesOfMarket);
    };

    useEffect(() => {
        const init = async () => {
            const result = await getMarketById(marketId);
            setMarket(result);

            loadMarketContractData();
        };

        init();
    }, [accountContext.account]);

    //Liquidity stuff
    const handleAddLiquidity = async () => {
        if(walletAllowanceOfCollateralToken > 0) {
            setIsDepositModalOpen(true);
            return;
        }

        setIsAddLiquidityInProgress(true);
        const marketAPIs = new MarketAPIs();
        await marketAPIs.approveCollateralTokenForMarket(accountContext.account, marketContractId);
        setWalletAllowanceOfCollateralToken(MaxUint256);
        setIsAddLiquidityInProgress(false);
    };

    const handleOnAddLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        loadMarketContractData();
    };

    const handleOnRemoveLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        loadMarketContractData();
    };

    //Buy adn sell stuff
    const handleGetBuyPrice = async (marketId) => {
        const marketAPIs = new MarketAPIs();
        //marketId, buyAmount, outcomeIndex
        const numberOfYes = await marketAPIs.getOptionTokensCountOfBuy(accountContext.account, marketId ? marketId : marketContractId, toWei(1), 0);
        const numberOfNo = await marketAPIs.getOptionTokensCountOfBuy(accountContext.account, marketId ? marketId : marketContractId, toWei(1), 1);

        const priceOfYes = 1/fromWei(numberOfYes);
        const priceOfNo = 1/fromWei(numberOfNo);

        console.log("d1", {
            'yes': priceOfYes,
            'no': priceOfNo,
        });

        setPricesOfBuy({
            'yes': priceOfYes,
            'no': priceOfNo,
        })
    };

    const handleSetMaxTradeInput = ()=>{
        setTradeInput(fromWei(walletBalanceOfCollateralToken));
    };

    const getTradeInputAveragePrice = () => {
        return get(pricesOfBuy, selectedTradeOption.toLowerCase()) || 0;
    };

    const getBuyNumberOfShares = () => {
        return tradeInput && get(pricesOfBuy, selectedTradeOption.toLowerCase()) ? tradeInput/get(pricesOfBuy, selectedTradeOption.toLowerCase()) : 0;
    };

    const startTrade = async () => {
        const tradeOption = selectedTradeOption.toLowerCase() === 'yes' ? 0 : 1;
        const marketAPIs = new MarketAPIs();
        setIsTradeInProgress(true);
        try {
            if (selectedTradeType === 'buy') {
                await marketAPIs.buy(accountContext.account, marketContractId, toWei(tradeInput), tradeOption);
            } else {
                await marketAPIs.buy(accountContext.account, marketContractId, toWei(tradeInput), tradeOption);
            }
        } catch (e) {
            console.log("error in trade", e);
        } finally {
            setIsTradeInProgress(false);
        }

        loadMarketContractData();
        loadWalletData();
    };

    return (
        <>
            <Navbar
                title={"Markets"}
            />
            <div className={classes.MarketsPage}>
                {accountContext.account && (
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <div className={classes.MarketDetails}>
                                    <div className={classes.Cat}>{get(market, ['category', 'title'])}</div>
                                    <div className={classes.Title}>{get(market, 'title')}</div>
                                    <div className={classes.Info}>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Trade volume</div>
                                            <div className={classes.Info__BlockValue}>$184,179</div>
                                        </div>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Liquidity</div>
                                            <div className={classes.Info__BlockValue}>
                                                {numeral(fromWei(get(marketContractData, 'totalSupply') || 0)).format("$0,0.00")}
                                            </div>
                                        </div>
                                        <div className={classes.Info__Block}>
                                            <div className={classes.Info__BlockTitle}>Market ends on</div>
                                            <div className={classes.Info__BlockValue}>{moment(get(market, 'endDate') * 1000).format('L')}</div>
                                        </div>
                                    </div>
                                    <div className={classes.Graph}>
                                        <div className={classes.Graph__Header}>
                                            <div className={classes.Graph__HeaderTitle}>History</div>
                                            <div className={classes.Graph__HeaderNav}>
                                                <div className={classes.Graph__HeaderNavOption}>24h</div>
                                                <div className={classes.Graph__HeaderNavOption}>7d</div>
                                                <div className={classes.Graph__HeaderNavOption}>30d</div>
                                                <div className={classes.Graph__HeaderNavOption}>all</div>
                                            </div>
                                        </div>
                                        <div className={classes.Graph__Deatils}>

                                        </div>
                                    </div>
                                    <div className={classes.Outcome}>
                                        <div className={classes.Outcome__Header}>
                                            Outcome
                                        </div>
                                        <div className={classes.Outcome__Details}>
                                            <div>
                                                <OutcomeProgress title={'Yes'}
                                                                 count={'50'}
                                                                 percent={get(marketContractData, ['optionTokensPercentage', ['0']]) || 0}
                                                                 color={'#86DC8B'}/>
                                            </div>
                                            <div>
                                                <OutcomeProgress title={'No'}
                                                                 count={'$0.01'}
                                                                 percent={get(marketContractData, ['optionTokensPercentage', ['1']]) || 0}
                                                                 color={'#7084FF'}/>
                                            </div>
                                        </div>
                                    </div>
                                    {get(marketContractData, ['walletOptionTokensBalance']) && get(marketContractData, ['walletOptionTokensBalance']).map((entry, index) => {
                                        if(entry == 0) {
                                            return null;
                                        }
                                        const optionName = index === 0 ? 'Yes' : 'No';

                                        return (
                                            <div className={classes.MarketPositions}>
                                                <div className={classes.MarketPositions__Header}>
                                                    Market Positions
                                                </div>
                                                <div className={classes.MarketPositions__Details}>
                                                    {
                                                        [
                                                            {
                                                                title: 'Outcome',
                                                                value: `${optionName} (${fromWei(entry, null, 3)} Shares)`
                                                            },
                                                            {
                                                                title: 'Price: Average | Current',
                                                                value: `$0.46 | ${numeral(get(pricesOfBuy, optionName.toLowerCase()) || 0).format("$0,0.00")}`
                                                            },
                                                            {
                                                                title: 'P/L: $ | %',
                                                                value: '-3.66 | -5.428%'
                                                            },
                                                            {
                                                                title: 'Value: Initial | Current',
                                                                value: `$6.75 | ${numeral((get(pricesOfBuy, optionName.toLowerCase()) || 0) * fromWei(entry)).format("$0,0.00")}`
                                                            },
                                                            {
                                                                title: 'Max Payout',
                                                                value: `${numeral(fromWei(entry, null, 3)).format("$0,0.00")}`
                                                            },
                                                        ].map((entry) => {
                                                            return (
                                                                <div className={classes.MarketPosition__Block}>
                                                                    <span>{entry.title}</span>
                                                                    <span>{entry.value}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                                    <div className={classes.About}>
                                        <div className={classes.About__Header}>
                                            About
                                        </div>
                                        <div className={classes.About__Details}>{get(market, 'description')}</div>
                                    </div>
                                    <div className={classes.Resolution}>
                                        <div className={classes.Resolution__Header}>
                                            Resolution Source
                                        </div>
                                        <div className={classes.Resolution__Details}>
                                            {get(market, 'sources') && get(market, 'sources').map((entry) => {
                                                return (
                                                    <div className={classes.ResolutionLink}>
                                                        {entry}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.MarketSidebar}>
                                    <div className={classes.MarketSidebar__AddLiquidity}>
                                        <Button className={classes.MarketSidebar__AddLiquidityBtn}
                                                color="gray"
                                                isProcessing={isAddLiquidityInProgress}
                                                onClick={handleAddLiquidity}
                                                size={"medium"}>
                                                    <div className={classes.MarketSidebar__AddLiquidityBtnInner}>
                                                        <div>+ Add Liquidity</div>
                                                        {walletAllowanceOfCollateralToken == 0 && (
                                                            <div className={classes.MarketSidebar__AddLiquidityApprove}>(approve first)</div>
                                                        )}
                                                    </div>
                                                </Button>
                                        {(get(marketContractData, ['walletSharesOfMarket']) && get(marketContractData, ['walletSharesOfMarket'])>0) && (
                                            <Button className={classes.MarketSidebar__RemoveLiquidityBtn}
                                                    color="primary"
                                                    onClick={() => setIsRemoveLiquidityModalOpen(true)}
                                                    size={"medium"}>
                                                Remove Liquidity
                                            </Button>
                                        )}
                                    </div>
                                    <div className={classes.BuySellWidget}>
                                        <div className={classes.BuySellWidget__Nav}>
                                            <div data-selected={selectedTradeType === 'buy' ? 'true' : 'false'}
                                                 onClick={() => setSelectedTradeType('buy')}>Buy</div>
                                            <div data-selected={selectedTradeType === 'sell' ? 'true' : 'false'}
                                                 onClick={() => setSelectedTradeType('sell')}>Sell</div>
                                        </div>
                                        <div className={classes.BuySellWidget__Options}>
                                            <div className={classes.Options__Header}>
                                                Pick Outcome
                                            </div>
                                            <div className={classes.Options__Options}>
                                                {
                                                    ['Yes', 'No'].map((entry) => {
                                                        return (
                                                            <OptionBlock isSelected={selectedTradeOption === entry}
                                                                        onClick={(value)=>setSelectedTradeOption(value)}
                                                                        title={entry}
                                                                        value={numeral(get(pricesOfBuy, entry.toLowerCase()) || 0).format("$0,0.00")}/>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className={classes.BuySellWidgetAmount}>
                                            <div className={classes.BuySellWidgetAmount__Header}>How Much?</div>
                                            <div className={classes.BuySellWidgetAmount__InputWrap}>
                                                <input value={tradeInput}
                                                       onChange={(e) => {
                                                           setTradeInput(e.target.value)
                                                       }}
                                                       type='number'/>
                                                <div onClick={handleSetMaxTradeInput}>Max</div>
                                            </div>
                                        </div>
                                        <div className={classes.BuySellWidgetInfo}>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Your Avg. Price</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>{numeral(getTradeInputAveragePrice()).format("$0,0.00")}</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Est. Shares</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>{numeral(getBuyNumberOfShares()).format("0,0.00")}</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Max Winnings</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>{numeral(getBuyNumberOfShares()).format("$0,0.00")}</div>
                                            </div>
                                            <div className={classes.BuySellWidgetInfo__Row}>
                                                <div className={classes.BuySellWidgetInfo__RowTitle}>Max ROI</div>
                                                <div className={classes.BuySellWidgetInfo__RowValue}>{numeral((getBuyNumberOfShares()-tradeInput)/tradeInput).format("0,0.00%")}</div>
                                            </div>
                                        </div>
                                        <Button color="primary"
                                                size={"large"}
                                                fullWidth={true}
                                                onClick={startTrade}
                                                isProcessing={isTradeInProgress}>
                                            {walletAllowanceOfCollateralToken == 0 ? 'Approve' : 'Trade'}
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                        <DepositModal open={isDepositModalOpen}
                            onClose={() =>setIsDepositModalOpen(false)}
                            onStake={()=>{
                                handleOnAddLiquidityComplete();
                            }}
                            userRoomLPTokens={
                                walletBalanceOfCollateralToken
                            }
                            marketContractId={marketContractId}
                            type={"Add_Market_Liquidity"}/>
                        <UnstakeModal
                            marketContractId={marketContractId}
                            open={isRemoveLiquidityModalOpen}
                            onClose={() =>
                                setIsRemoveLiquidityModalOpen(false)
                            }
                            onUnStake={handleOnRemoveLiquidityComplete}
                            stakedTokensBalance={get(marketContractData, ['walletSharesOfMarket']) || 0}
                            type={"market_liquidity"}
                        />
                    </div>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton/>
                    </div>
                )}
            </div>
        </>
    );
}

export default Market;
