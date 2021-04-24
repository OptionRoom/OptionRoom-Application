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
import BuySellWidget from "../../components/BuySellWidget";
import VoteWidget from "../../components/VoteWidget";

import {walletHelper} from "../../shared/wallet.helper";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
import OptionBlock from "../../components/OptionBlock";
import {getIfWalletIsWhitelistedForBeta, getMarketById} from "../../shared/firestore.service";
import MarketAPIs from "../../shared/contracts/MarketAPIs";
import { MaxUint256 } from '../../shared/constants';
import UnstakeModal from "../../components/UnstakeModal";
import NotWhitelisted from "../../components/NotWhitelisted";

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

    const [isWalletWhitelistedForBeta, setIsWalletWhitelistedForBeta] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    //Buy and sell
    const [pricesOfBuy, setPricesOfBuy] = useState(null);
    const [pricesOfSell, setPricesOfSell] = useState(null);
    const [buySellHistoryOfWallet, setBuySellHistoryOfWallet] = useState(null);

    //Mrket
    const [market, setMarket] = useState(null);
    const { marketId } = useParams();
    const [marketContractAddress, setMarketContractAddress] = useState(null);
    const [marketContractData, setMarketContractData] = useState({});
    const [marketTradingVolume, setMarketTradingVolume] = useState(0);

    //Liq
    const [isRemoveLiquidityModalOpen, setIsRemoveLiquidityModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isAddLiquidityInProgress, setIsAddLiquidityInProgress] = useState(false);

    const classes = useStyles();

    const [walletBalanceOfCollateralToken, setWalletBalanceOfCollateralToken] = useState(0);
    const [walletAllowanceOfCollateralToken, setWalletAllowanceOfCollateralToken] = useState(0);
    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState(0);
    const [walletMarketPositions, setWalletMarketPositions] = useState(0);

    const loadWalletBalanceOfCollateralToken = async ()=> {
        const marketApis = new MarketAPIs();
        const balanceOfColletralToken = await marketApis.getWalletBalanceOfCollateralToken(accountContext.account);
        setWalletBalanceOfCollateralToken(balanceOfColletralToken);
    };

    const loadWalletAllowanceOfCollateralToken = async ()=> {
        const marketApis = new MarketAPIs();
        const balanceOfAllowanceToken = await marketApis.getWalletAllowanceOfCollateralTokenForMarket(accountContext.account, marketContractAddress);
        setWalletAllowanceOfCollateralToken(balanceOfAllowanceToken);
    };

    const loadWalletAllowanceOfOptionToken = async ()=> {
        const marketApis = new MarketAPIs();
        const isWalletOptionTokenApprovedForMarketRes = await marketApis.getIsWalletOptionTokenApprovedForMarket(accountContext.account, marketContractAddress);
        setIsWalletOptionTokenApprovedForMarket(isWalletOptionTokenApprovedForMarketRes);
    };

    const loadWalletData = async () => {
        loadWalletBalanceOfCollateralToken();
    };


    useEffect(() => {
        if(accountContext.account && marketContractAddress) {
            loadWalletAllowanceOfOptionToken();
            loadWalletAllowanceOfCollateralToken();
            loadBuySellHistoryOfWallet();
            //getWalletMarketPastEvents
        }
    }, [accountContext.account, marketContractAddress]);

    const handleOnBuy = () => {
        pageDetails();
        loadWalletData();
    };

    const handleGetBuyPrice = async (marketId) => {
        const marketAPIs = new MarketAPIs();
        //marketId, buyAmount, outcomeIndex
        const pricesOfBuy = await marketAPIs.getPricesOfBuy(accountContext.account, marketContractAddress);

        setPricesOfBuy({
            'yes': pricesOfBuy.priceOfYes,
            'no': pricesOfBuy.priceOfNo,
        })
    };

    const handleGetSellPrice = async (marketId) => {
        const marketAPIs = new MarketAPIs();
        //marketId, buyAmount, outcomeIndex
        const pricesOfSell = await marketAPIs.getPricesOfSell(accountContext.account, marketContractAddress);

        setPricesOfSell({
            'yes': pricesOfSell.yes,
            'no': pricesOfSell.no,
        })
    };

    const loadMarketTradingVolume = async (marketId) => {
        const marketAPIs = new MarketAPIs();
        const tradingVolume = await marketAPIs.getMarketTradingVolume(accountContext.account, marketContractAddress);
        setMarketTradingVolume(tradingVolume);
    };

    const loadBuySellHistoryOfWallet = async (marketId) => {
        const marketAPIs = new MarketAPIs();
        const historyOfWallet = await marketAPIs.getWalletMarketBuyAndSellHistory(accountContext.account, marketContractAddress);

        let totalBuyOfYes = 0;
        let numberBuyOfYes = 0;
        let tokenBuyOfYes = 0;
        let totalBuyOfNo = 0;
        let numberOfBuyOfNo = 0;
        let tokenOfBuyOfNo = 0;

        historyOfWallet.forEach((entry) => {
            if(entry.event === 'FPMMBuy') {
                const amount = entry.returnValues.investmentAmount;
                const tokens = entry.returnValues.outcomeTokensBought;

                if(entry.returnValues.outcomeIndex == '0') {
                    totalBuyOfYes += amount;
                    numberBuyOfYes += 1;
                    tokenBuyOfYes += tokens;
                } else {
                    totalBuyOfNo += amount;
                    numberOfBuyOfNo += 1;
                    tokenOfBuyOfNo += tokens;
                }
            }
        });

        setBuySellHistoryOfWallet({
            buy: {
                yes: {
                    total: totalBuyOfYes,
                    averagePrice: totalBuyOfYes && tokenBuyOfYes ? totalBuyOfYes/tokenBuyOfYes : 0,
                },
                no: {
                    total: totalBuyOfNo,
                    averagePrice: totalBuyOfNo && tokenOfBuyOfNo ? totalBuyOfNo/tokenOfBuyOfNo : 0,
                }
            }
        });
    };

    const pageDetails = () => {
        loadMarketContractData();
        handleGetBuyPrice();
        handleGetSellPrice();
        loadMarketTradingVolume();
        loadBuySellHistoryOfWallet();
    };

    const loadMarketContractData = async () => {
        const wallet = accountContext.account;
        const marketApis = new MarketAPIs();
        const marketTotalSupply = await marketApis.getMarketTotalSupply(wallet, marketContractAddress);
        const marketState = await marketApis.getMarketState(wallet, marketContractAddress);
        const WalletOptionTokensBalance = await marketApis.getWalletOptionTokensBalance(wallet, marketContractAddress);
        const MarketOptionTokensPercentage = await marketApis.getMarketOptionTokensPercentage(wallet, marketContractAddress);
        const MarketOutcome = await marketApis.getMarketOutcome(wallet, marketContractAddress);
        const WalletSharesOfMarket = await marketApis.getWalletSharesOfMarket(wallet, marketContractAddress);

        console.log("dd", {
            totalSupply: marketTotalSupply,
            state: marketState,
            optionTokensPercentage: MarketOptionTokensPercentage,
            outcome: MarketOutcome,
            walletSharesOfMarket: WalletSharesOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
        });

        setMarketContractData({
            totalSupply: marketTotalSupply,
            state: marketState,
            optionTokensPercentage: MarketOptionTokensPercentage,
            outcome: MarketOutcome,
            walletSharesOfMarket: WalletSharesOfMarket,
            walletOptionTokensBalance: WalletOptionTokensBalance,
        });
    };

    useEffect(() => {
        if(accountContext.account) {
        }
    }, [accountContext.account]);

    useEffect(() => {
        if(marketContractAddress) {
            pageDetails();
        }
    }, [marketContractAddress]);

    useEffect(() => {
        const init = async () => {
            if(accountContext.account) {
                setIsLoading(true);
                const isWalletWhitelistedForBetaRes = await getIfWalletIsWhitelistedForBeta(accountContext.account);
                setIsWalletWhitelistedForBeta(isWalletWhitelistedForBetaRes);
                if(!isWalletWhitelistedForBetaRes) {
                    setIsLoading(false);
                    return;
                }

                if(!market) {
                    const result = await getMarketById(marketId);
                    setMarket(result);
                }

                setIsLoading(false);

                loadWalletData();

                if(!marketContractAddress) {
                    const marketApis = new MarketAPIs();
                    const marketContractAddressVal = await marketApis.getMarketById(accountContext.account, marketId);
                    setMarketContractAddress(marketContractAddressVal);
                } else {
                    pageDetails();
                }
            }
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
        await marketAPIs.approveCollateralTokenForMarket(accountContext.account, marketContractAddress);
        setWalletAllowanceOfCollateralToken(MaxUint256);
        setIsAddLiquidityInProgress(false);
    };

    const handleOnAddLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        pageDetails();
    };

    const handleOnRemoveLiquidityComplete = () => {
        loadWalletBalanceOfCollateralToken();
        pageDetails();
    };

    //UI stuff
    const showOutcomeSection = () => {
        return ["3", "5", "6"].indexOf(get(marketContractData, 'state')) > -1;
    };

    const showTradeVolumeSection = () => {
        return ["3", "5", "6"].indexOf(get(marketContractData, 'state')) > -1;
    };

    const showAddLiquiditySection = () => {
        return ["1", "3"].indexOf(get(marketContractData, 'state')) > -1;
    };

    const getProfit = (option) => {
        if(
            !get(marketContractData, ['walletOptionTokensBalance'])
            || get(marketContractData, ['walletOptionTokensBalance']).length == 0
            || !pricesOfBuy
            || !buySellHistoryOfWallet
        ) {
            return {
                value: 0,
                percent: 0
            }
        };

        const currentValue = get(marketContractData, ['walletOptionTokensBalance'])[`${option === 'yes' ? 0 : 1}`] * get(pricesOfBuy, [`${option}`]);
        const totalInves = get(buySellHistoryOfWallet, ['buy', `${option}`, 'total']);

        if(!currentValue || !totalInves) {
            return {
                value: 0,
                percent: 0
            }
        }

        const profit = currentValue - totalInves;

        return {
            value: numeral(fromWei(profit)).format("$0,0.00"),
            percent: numeral(profit/totalInves).format("0%")
        }
    };

    //Buy adn sell stuff

    return (
        <>
            <Navbar
                title={"Markets"}
            />
            <div className={classes.MarketsPage}>
                {accountContext.account && (
                    <>
                        {
                            !isLoading && (
                                <>
                                    {
                                        isWalletWhitelistedForBeta && (
                                            <div>
                                                <Grid container spacing={3}>
                                                    <Grid item md={8}>
                                                        <div className={classes.MarketDetails}>
                                                            <div className={classes.MarketDetails__Header}>
                                                                <div className={classes.MarketDetails__HeaderAvatar}
                                                                     style={{
                                                                         backgroundImage: `url(${get(market, ['image'])})`
                                                                     }}></div>
                                                                <div>
                                                                    <div className={classes.Cat}>{get(market, ['category', 'title'])}</div>
                                                                    <div className={classes.Title}>{get(market, 'title')}</div>
                                                                </div>
                                                            </div>
                                                            <div className={classes.Info}>
                                                                {
                                                                    showTradeVolumeSection() && (
                                                                        <div className={classes.Info__Block}>
                                                                            <div className={classes.Info__BlockTitle}>Trade volume</div>
                                                                            <div className={classes.Info__BlockValue}>{numeral(fromWei(`${marketTradingVolume}`)).format("$0,0.00")}</div>
                                                                        </div>
                                                                    )
                                                                }

                                                                <div className={classes.Info__Block}>
                                                                    <div className={classes.Info__BlockTitle}>Liquidity</div>
                                                                    <div className={classes.Info__BlockValue}>
                                                                        {numeral(fromWei(get(marketContractData, 'totalSupply') || 0)).format("$0,0.00")}
                                                                    </div>
                                                                </div>
                                                                <div className={classes.Info__Block}>
                                                                    <div className={classes.Info__BlockTitle}>Market ends on</div>
                                                                    <div className={classes.Info__BlockValue}>{moment(get(market, 'endTimestamp') * 1000).format('L')}</div>
                                                                </div>
                                                            </div>
                                                            {
                                                                /**
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
                                                                 */
                                                            }
                                                            {
                                                                showOutcomeSection() && (
                                                                    <div className={classes.Outcome}>
                                                                        <div className={classes.Outcome__Header}>
                                                                            Outcome
                                                                        </div>
                                                                        <div className={classes.Outcome__Details}>
                                                                            <div>
                                                                                <OutcomeProgress title={'Yes'}
                                                                                                 count={numeral(get(pricesOfBuy, 'yes') || 0).format("$0,0.00")}
                                                                                                 percent={get(marketContractData, ['optionTokensPercentage', ['0']]) || 0}
                                                                                                 color={'#86DC8B'}/>
                                                                            </div>
                                                                            <div>
                                                                                <OutcomeProgress title={'No'}
                                                                                                 count={numeral(get(pricesOfBuy, 'no') || 0).format("$0,0.00")}
                                                                                                 percent={get(marketContractData, ['optionTokensPercentage', ['1']]) || 0}
                                                                                                 color={'#7084FF'}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            {get(marketContractData, ['walletOptionTokensBalance']) && get(marketContractData, ['walletOptionTokensBalance']).map((entry, index) => {
                                                                if(entry == 0) {
                                                                    return null;
                                                                }
                                                                const optionName = index === 0 ? 'Yes' : 'No';
                                                                const optionNameL = optionName.toLowerCase();

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
                                                                                        value: `${numeral( get(buySellHistoryOfWallet, ['buy', optionNameL, 'averagePrice']) || 0).format("$0,0.00")} | ${numeral(get(pricesOfBuy, optionNameL) || 0).format("$0,0.00")}`
                                                                                    },
                                                                                    {
                                                                                        title: 'P/L: $ | %',
                                                                                        value: `${getProfit(optionNameL).value} | ${getProfit(optionNameL).percent}`
                                                                                    },
                                                                                    {
                                                                                        title: 'Value: Initial | Current',
                                                                                        value: `${numeral(fromWei(get(buySellHistoryOfWallet, ['buy', `${optionNameL}`, 'total']) || 0)).format("$0,0.00")} | ${numeral((get(pricesOfBuy, optionNameL) || 0) * fromWei(entry)).format("$0,0.00")}`
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
                                                    <Grid item md={4}>
                                                        <div className={classes.MarketSidebar}>
                                                            <div className={classes.MarketSidebar__AddLiquidity}>
                                                                {
                                                                    showAddLiquiditySection() && (
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
                                                                    )
                                                                }
                                                                {(get(marketContractData, ['walletSharesOfMarket']) && get(marketContractData, ['walletSharesOfMarket'])>0) && (
                                                                    <Button className={classes.MarketSidebar__RemoveLiquidityBtn}
                                                                            color="primary"
                                                                            onClick={() => setIsRemoveLiquidityModalOpen(true)}
                                                                            size={"medium"}>
                                                                        Remove Liquidity
                                                                    </Button>
                                                                )}
                                                            </div>
                                                            {
                                                                (["1", "5"].indexOf(get(marketContractData, 'state')) > -1) && (
                                                                    <VoteWidget marketState={get(marketContractData, 'state')}
                                                                                marketContractAddress={marketContractAddress}/>
                                                                )
                                                            }
                                                            {
                                                                get(marketContractData, 'state') == 3 && (
                                                                    <BuySellWidget pricesOfBuy={pricesOfBuy}
                                                                                   pricesOfSell={pricesOfSell}
                                                                                   onBuy={handleOnBuy}
                                                                                   onApprove={(type) => {
                                                                                       if(type == 'CollateralToken') {
                                                                                           setWalletAllowanceOfCollateralToken(MaxUint256);
                                                                                       } else {
                                                                                           setIsWalletOptionTokenApprovedForMarket(true);
                                                                                       }
                                                                                   }}
                                                                                   walletBalanceOfCollateralToken={walletBalanceOfCollateralToken}
                                                                                   walletAllowanceOfCollateralToken={walletAllowanceOfCollateralToken}
                                                                                   isWalletOptionTokenApprovedForMarket={isWalletOptionTokenApprovedForMarket}
                                                                                   walletOptionTokensBalance={get(marketContractData, ['walletOptionTokensBalance'])}
                                                                                   marketContractAddress={marketContractAddress}/>
                                                                )
                                                            }
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
                                                              marketContractId={marketContractAddress}
                                                              type={"Add_Market_Liquidity"}/>
                                                <UnstakeModal
                                                    marketContractId={marketContractAddress}
                                                    open={isRemoveLiquidityModalOpen}
                                                    onClose={() =>
                                                        setIsRemoveLiquidityModalOpen(false)
                                                    }
                                                    onUnStake={handleOnRemoveLiquidityComplete}
                                                    stakedTokensBalance={get(marketContractData, ['walletSharesOfMarket']) || 0}
                                                    type={"market_liquidity"}
                                                />
                                            </div>
                                        )
                                    }
                                    {
                                        !isWalletWhitelistedForBeta && (
                                            <NotWhitelisted/>
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            isLoading && (
                                'Loading ...'
                            )
                        }
                    </>
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
