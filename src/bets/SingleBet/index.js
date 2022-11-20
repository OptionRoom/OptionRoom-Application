import React, {useState, useContext, useMemo} from "react";
import {get, sum} from 'lodash';
import Countdown from "react-countdown";
import {useParams} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import ChainAlert from '../../components/ChainAlert';
import ConnectButton from "../../components/ConnectButton";
import OrLoader from "../../components/OrLoader";

import {ChainNetworks} from '../../shared/constants';
import {useStyles} from "./styles";
import {AccountContext} from "../../shared/AccountContextProvider";

import {
    useGetIsChainSupported,
} from "../../shared/hooks";

import {
    getContractAddress,
    contractName
} from '../methods';

import {useGetBet, useRedeemBet} from "../apis";
import {betStates, betsStateColors} from "../constants";
import {ellipseAddress, fromWei, truncateText} from "../../shared/helper";
import {VolumeIcon} from "../../shared/icons";
import numeral from "numeral";
import BuyBetModal from "../BuyBetModal";

const supportedChains = [ChainNetworks.BINANCE_SMART_CHAIN_TESTNET, ChainNetworks.LOCAL_CHAIN, ChainNetworks.BINANCE_SMART_CHAIN];

function Market() {
    const classes = useStyles();
    const [isBuyBetModalOpen, setIsBuyBetModalOpen] = useState(false);
    const [selectedBetToBuy, setSelectedBetToBuy] = useState(0);
    const accountContext = useContext(AccountContext);
    const isChainSupported = useGetIsChainSupported(supportedChains);

    const {marketId} = useParams();
    const {data: betData, isLoading: isLoadingBet, refetch: refetchBetData} = useGetBet(marketId);
    const redeemBet = useRedeemBet();

    const showClaimBtn = useMemo(() => {
        if (![betStates.Finished, betStates.Canceled].includes(get(betData, ['state'])) || betData.accountRedeemStatus) {
            return false;
        }

        if (get(betData, ['state']) == betStates.Finished) {
            return sum(betData.accountAmounts.map(e => parseFloat(e))) > 0;
        }

        return parseFloat(betData.accountAmounts[betData.resolveIndex]) > 0;
    }, get(betData, ['state']), get(betData, ['accountAmounts']));

    const betStateText = useMemo(() => {
        const marketStates = {
            [betStates.Invalid]: "Invalid",
            [betStates.ActiveNotStarted]: "Active Not Started",
            [betStates.ActiveBetting]: "Active Betting",
            [betStates.ActiveNoBetting]: "Active No Betting",
            [betStates.Finished]: "Finished",
            [betStates.Canceled]: "Cancelled",
        };
        return marketStates[get(betData, 'state')] || 'N/A';
    }, [get(betData, 'state')]);

    const betStateColor = useMemo(() => {
        return betsStateColors[get(betData, 'state')] || '#000';
    }, [get(betData, 'state')]);

    const voteHeadline = useMemo(() => {
        const marketStates = {
            [betStates.Invalid]: "You can't bet",
            [betStates.ActiveNotStarted]: "Starts in:",
            [betStates.ActiveBetting]: "Ends in:",
            [betStates.ActiveNoBetting]: "Waiting resolve",
            [betStates.Finished]: "It's Finished",
            [betStates.Canceled]: "It's Cancelled",
        };
        return marketStates[get(betData, 'state')] || 'N/A';
    }, [get(betData, 'state')]);

    const countDownEndTime = useMemo(() => {
        switch (get(betData, 'state')) {
            case betStates.ActiveBetting:
                return parseInt(betData.endBetTime) * 1000;
            case betStates.ActiveNotStarted:
                return parseInt(betData.starBetTime) * 1000;
            case betStates.Invalid:
            case betStates.ActiveNoBetting:
            case betStates.Finished:
            case betStates.Canceled:
                return null;
            default:
                return null;
        }
    }, [get(betData, 'state')]);

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    if (!isChainSupported) {
        return (
            <ChainAlert/>
        )
    }

    if (isLoadingBet) {
        return (
            <div className={classes.LoadingWrapper}>
                <OrLoader width={400}
                          height={400}/>
            </div>
        )
    }

    const showBuyBtn = get(betData, ['state']) == betStates.ActiveBetting;

    const renderer = ({days, hours, minutes, seconds, completed}) => {
        switch (get(betData, 'state')) {
            case betStates.ActiveBetting:
            case betStates.ActiveNotStarted:
                return (
                    <div className={classes.CounterWrapper}>
                        <div>{voteHeadline}</div>
                        <div className={classes.CounterWrapperInner}>
                            <div>
                                <span>{days}</span>
                                <span>days</span>
                            </div>
                            <div>
                                <span>{hours}</span>
                                <span>hours</span>
                            </div>
                            <div>
                                <span>{minutes}</span>
                                <span>minutes</span>
                            </div>
                        </div>
                    </div>
                )
            case betStates.Invalid:
            case betStates.ActiveNoBetting:
            case betStates.Finished:
            case betStates.Canceled:
                return <span>It ended!</span>;
            default:
                return null;
        }
    };

    const handleClaim = async () => {
        await redeemBet.mutateAsync({betAddress: marketId});
        refetchBetData();
    };

    return (
        <>
            <div className={classes.BetPage}>
                <div className={classes.BetCardWrapper}>
                    <div className={classes.BetCard}>
                        <div className={classes.MainDetails}>
                            <div className={classes.CatStateLine}>
                                <div className={classes.Cat}>
                                    {betData.categories.join(", ")}
                                </div>
                                <div
                                    className={classes.State}
                                    style={{
                                        backgroundColor: betStateColor,
                                    }}
                                >
                                    {betStateText}
                                </div>
                            </div>
                            <div className={classes.Title}>
                                {truncateText(get(betData, ["title"]), 50)}
                            </div>
                            <div className={classes.BaseToken}>
                                Bet Token: <a target={'_blank'}
                                              href={`https://bscscan.com/token/${betData.baskToken}`}>{ellipseAddress(`${betData.baskToken}`)}</a>
                            </div>
                        </div>
                        <div className={classes.Countdown}>
                            <Countdown
                                date={countDownEndTime}
                                renderer={renderer}
                            />
                            <div className={classes.VolumeWrap}>
                                <div className={classes.VolumeIcon}>
                                    <VolumeIcon/>
                                </div>
                                <div>
                                    <div className={classes.Volume__Title}>Volume</div>
                                    <div className={classes.Volume__Val}>
                                        {numeral(fromWei(sum(betData.amounts.map(e => parseFloat(e))))).format("0,0.00")}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.SubDetails}>
                            <div className={classes.OptionsWrap}>
                                {betData.choices.map((entry, entryIndex) => {
                                    return (
                                        <div className={classes.ChoiceTemplate}>
                                            <div className={classes.ChoiceTemplate__Title}>{entry}</div>
                                            <div className={classes.ChoiceTemplate__Wrapper}>
                                                <div className={classes.ChoiceTemplate_Owns}>
                                                    <div>
                                                        Total
                                                        Bets: <span>{fromWei(get(betData, ['amounts', entryIndex]))}</span>
                                                    </div>
                                                    <div>
                                                        You
                                                        Own: <span>{fromWei(get(betData, ['accountAmounts', entryIndex]))}</span>
                                                    </div>
                                                </div>
                                                <div className={classes.ChoiceTemplate__Wrapper__Actions}>
                                                    {
                                                        showBuyBtn && (
                                                            <button className={classes.ChoiceTemplate_BuyBtn}
                                                                    onClick={() => {
                                                                        setSelectedBetToBuy(entryIndex);
                                                                        setIsBuyBetModalOpen(true);
                                                                    }}>Buy</button>
                                                        )
                                                    }
                                                    {
                                                        (showClaimBtn && betData.resolveIndex == entryIndex)  && (
                                                            <button className={classes.ChoiceTemplate_ClaimBtn}
                                                                    onClick={handleClaim}>Redeem</button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={classes.description}>{betData.description}</div>
                    </div>
                </div>
            </div>
            <BuyBetModal open={isBuyBetModalOpen}
                         choice={selectedBetToBuy}
                         betAddress={marketId}
                         baseToken={getContractAddress(contractName.busd)}
                         betsContract={getContractAddress(contractName.markets)}
                         onClose={() => setIsBuyBetModalOpen(false)}
                         onPurchase={() => {
                             refetchBetData();
                         }}/>
        </>
    );
}

export default observer(Market);
