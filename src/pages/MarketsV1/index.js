import React, { useState, useContext, useEffect } from "react";
import {get} from "lodash";
import numeral from "numeral";
import clsx from "clsx";

import ChainAlert from '../../components/ChainAlert';
import OrLoader from '../../components/OrLoader';
import Button from '../../components/Button';

import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import { useStyles } from "./styles";
import {getMarkets} from "../../shared/firestore.service";
import MarketV1APIs from '../../shared/contracts/MarketV1APIs';
import {fromWei, toWei, truncateText} from "../../shared/helper";
import {ChainNetworks} from "../../shared/constants";

function MarketCard(props) {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);
    const [walletLiquidity, setWalletLiquidity] = useState({
        totalLiq: 0,
        walletSharesOfMarket: 0,
        shares: 0
    });

    const [walletOptionTokensBalance, setWalletOptionTokensBalance] = useState([0, 0]);
    const [isRemoveLiquidityInProgress, setIsRemoveLiquidityInProgress] = useState(false);
    const [isRedeemInProgress, setIsRedeemInProgress] = useState(false);
    const [isWalletOptionTokenApprovedForMarket, setIsWalletOptionTokenApprovedForMarket] = useState(0);

    useEffect(() => {
        const init = async () => {
            const marketsV1Api = new MarketV1APIs(props.selectedArchiveVersion);
            const marketiquidity = await marketsV1Api.getMarketiquidity(accountContext.account, props.market.marketAddress);
            const walletSharesPercentageOfMarket = await marketsV1Api.getWalletSharesPercentageOfMarket(accountContext.account, props.market.marketAddress);
            const WalletSharesOfMarket = await marketsV1Api.getWalletSharesOfMarket(accountContext.account, props.market.marketAddress);

            setWalletLiquidity({
                totalLiq: marketiquidity,
                shares: walletSharesPercentageOfMarket,
                walletSharesOfMarket: WalletSharesOfMarket,
            })

            const WalletOptionTokensBalance = await marketsV1Api.getWalletOptionTokensBalance(accountContext.account, props.market.marketAddress);
            setWalletOptionTokensBalance(WalletOptionTokensBalance);

            const isWalletOptionTokenApprovedForMarketRes = await marketsV1Api.getIsWalletOptionTokenApprovedForMarket(accountContext.account, props.market.marketAddress);
            setIsWalletOptionTokenApprovedForMarket(isWalletOptionTokenApprovedForMarketRes);
        }

        init();
    }, []);

    const handleRemoveLiquidity = async () => {
        setIsRemoveLiquidityInProgress(true);
        const marketsV1Api = new MarketV1APIs(props.selectedArchiveVersion);

        if(!isWalletOptionTokenApprovedForMarket) {
            await marketsV1Api.approveOptionTokenForMarket(accountContext.account, props.market.marketAddress);
            setIsWalletOptionTokenApprovedForMarket(true);
            setIsRemoveLiquidityInProgress(false);
            return;
        }

        await marketsV1Api.removeLiquidityFromMarket(accountContext.account, props.market.marketAddress, walletLiquidity.walletSharesOfMarket);
        setWalletLiquidity({
            ...walletLiquidity,
            shares: 0,
            walletSharesOfMarket: 0,
        });

        setIsRemoveLiquidityInProgress(false);
    };

    const handleRedeem = async () => {
        setIsRedeemInProgress(true);
        const marketsV1Api = new MarketV1APIs(props.selectedArchiveVersion);
        try {
            await marketsV1Api.redeemMarketRewards(accountContext.account, props.market.marketAddress);
            setWalletOptionTokensBalance([0 , 0]);
        } catch (e) {

        } finally {
            setIsRedeemInProgress(false);
        }
    };

    const getRewards = () => {
        const the0rewards = parseFloat(fromWei(walletOptionTokensBalance[0]))/2;
        const the1rewards = parseFloat(fromWei(walletOptionTokensBalance[1]))/2;

        return (the0rewards + the1rewards).toFixed(2);
    };

    return (
      <div className={classes.MarketCard}>
          <div className={classes.AvatarTitle}>
              <div className={classes.Avatar}
                   style={
                       {
                           backgroundImage: `url(${get(props.market, ["image"])})`,
                           backgroundSize: "cover",
                           backgroundPosition: "center",
                           backgroundRepeat: "no-repeat",
                       }
                   }></div>
              <div className={classes.Title}>{truncateText(get(props.market, ["title"]), 60)}</div>
          </div>
          <div className={classes.Block}>
              <div className={classes.BlockTitle}>Your Liquidity</div>
              <div className={classes.BlockValActions}>
                  <div className={classes.BlockVal}>
                      {numeral(walletLiquidity.shares / 1000000).format("0%")} of {numeral(fromWei(walletLiquidity.totalLiq || 0)).format("$0,0.00")}
                  </div>
                  { (walletLiquidity.totalLiq > 0 && walletLiquidity.walletSharesOfMarket > 0) && (
                      <div className={classes.BlockActions}>
                          <Button color={'primary'}
                                  size={'xs'}
                                  onClick={handleRemoveLiquidity}
                                  isProcessing={isRemoveLiquidityInProgress}>
                              {!isWalletOptionTokenApprovedForMarket ? 'Unlock' : 'Withdraw'}
                          </Button>
                      </div>
                  )}

              </div>
          </div>
          <div className={classes.Block}>
              <div className={classes.BlockTitle}>Your Rewards</div>
              <div className={classes.BlockValActions}>
                  <div className={classes.BlockVal}>
                      {numeral(getRewards()).format("$0,0.00")}
                  </div>
                  {
                      (getRewards() > 0) && (
                          <div className={classes.BlockActions}>
                              <Button color={'primary'}
                                      size={'xs'}
                                      onClick={handleRedeem}
                                      isProcessing={isRedeemInProgress}>Claim</Button>
                          </div>
                      )
                  }
              </div>
          </div>
      </div>
    );
}

function MarketsV1() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);

    const [isLoading, setIsLoading] = useState(false);
    const [markets, setMarkets] = useState([]);
    const [selectedArchiveVersion, setSelectedArchiveVersion] = useState(2);

    const loadActiveMarkets = async () => {
        const versionString = `${selectedArchiveVersion}.0`;
        setIsLoading(true);
        setMarkets([]);
        const markets = await getMarkets(versionString);
        const marketsV1Api = new MarketV1APIs(versionString);
        const marketsContracts = await marketsV1Api.getMarketsByState(accountContext.account, 'all');
        const validMarkets = markets.filter((entry) => {
            return !!marketsContracts[entry.id];
        }).map((entry) => {
            return {
                ...entry,
                marketAddress: marketsContracts[entry.id]
            }
        });

        setMarkets(validMarkets);
        setIsLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            loadActiveMarkets();
        };

        if (accountContext.account && accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
            init();
        }
    }, [accountContext.account, accountContext.chainId]);

    useEffect(() => {
        loadActiveMarkets();
    }, [selectedArchiveVersion]);

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton />
            </div>
        );
    }

    if(!accountContext.isChain(ChainNetworks.BINANCE_SMART_CHAIN)) {
        return (
            <ChainAlert/>
        )
    }

    return (
        <div className={classes.MarketsPage}>
            <h1 className={classes.MarketsPage__Title}>Markets (V1/V2) - Archived</h1>
            <ul className={classes.VersionSelector}>
                <li className={clsx({
                    [classes.ActiveVersion]: selectedArchiveVersion === 2,
                })}
                  onClick={() => {
                      setSelectedArchiveVersion(2);
                  }}>V2</li>
                <li className={clsx({
                    [classes.ActiveVersion]: selectedArchiveVersion === 1,
                })}
                    onClick={() => {
                        setSelectedArchiveVersion(1);
                    }}>V1</li>
            </ul>
            <ul className={classes.MarketsList}>
                {
                    markets.map((entry) => {
                        return <li key={`market-${entry.id}`}>
                            <MarketCard
                                        selectedArchiveVersion={`${selectedArchiveVersion}.0`}
                                        market={entry}/>
                        </li>
                    })
                }
            </ul>
            {
                isLoading && (
                    <div className={classes.LoadingWrapper}>
                        <OrLoader width={400}
                                  height={400}/>
                    </div>
                )
            }
        </div>
    );
}

export default MarketsV1;
