import React, { useEffect } from "react";
import {get} from 'lodash';

import { useState, useContext } from "react";
import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import Button from "../Button";

import { nftTires, nftImages, nftNames } from "../../shared/constants";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConnectButton from "../ConnectButton";
import Alert from "@material-ui/lab/Alert";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import {fromWei} from "../../shared/helper";

function NftStake(props) {
    const accountContext = useContext(AccountContext);
    const classes = useStyles();

    const [userCurrentNftTire, setUserCurrentNftTire] = useState({});
    const [isUserExitingPool, setIsUserExitingPool] = useState({});

    const loadUserNftStakeTireBalance = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        const data = {};

        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(
                accountContext.account,
                nftTire
            );
            data[nftTire] = parseInt(res);
        }

        setUserCurrentNftTire(data);
    };

    const loadUserStakingAndRewards = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        const data = {};

        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(
                accountContext.account,
                nftTire
            );

            const res1 = await roomLPFarmingAPIs.getUserNftStakeRewardsBalanceOfTire(
                accountContext.account,
                nftTire
            );
            data[nftTire] = {
                stake: res,
                rewards: res1
            }
        }

        setUserCurrentNftTire(data);
    };

    const handleOnNftStakeExit = async (nftTire) => {
        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: true
        });

        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        await roomLPFarmingAPIs.exitNftStakePool(
            accountContext.account,
            nftTire
        );

        loadUserNftStakeTireBalance();

        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: false
        });
    };

    const handleOnUnstakeRoom = async (nftTire) => {
        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: {
                ...get(isUserExitingPool, [nftTire]),
                stake: false
            }
        });

        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        await roomLPFarmingAPIs.unstakeNftStakeContractForTire(
            accountContext.account,
            nftTire,
            get(userCurrentNftTire, [nftTire, 'stake']),
            parseFloat(get(userCurrentNftTire, [nftTire, 'rewards'])) > 0 ? true : false
        );

        loadUserStakingAndRewards();

        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: {
                ...get(isUserExitingPool, [nftTire]),
                stake: false
            }
        });
    };

    const handleOnClaimRewards = async (nftTire) => {
        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: {
                ...get(isUserExitingPool, [nftTire]),
                rewards: true
            }
        });

        const roomLPFarmingAPIs = new RoomLPFarmingAPIs();

        await roomLPFarmingAPIs.claimNftStakeContractRewardsForTire(
            accountContext.account,
            nftTire
        );

        loadUserStakingAndRewards();
        setIsUserExitingPool({
            ...isUserExitingPool,
            [nftTire]: {
                ...get(isUserExitingPool, [nftTire]),
                rewards: false
            }
        });
    };

    useEffect(() => {
        const init = async () => {
            if(accountContext.isChain('main')) {
                loadUserNftStakeTireBalance();
            } else if(accountContext.isChain('bsc')) {
                loadUserStakingAndRewards();
            }
        };

        if (accountContext.account) {
            init();
        }

        return () => {
        };
    }, [accountContext.account, userCurrentNftTire, accountContext.chainId]);

    return (
        <div className={classes.RoomLpStake}>
            {!accountContext.account && (
                <div className={classes.ConnectWrap}>
                    <ConnectButton />
                </div>
            )}
            {accountContext.account && (
                <>
                    <div className={classes.Pools}>
                        <div className={classes.PoolsTitle}>
                            <div>Tier</div>
                            {
                                accountContext.isChain('main') && (
                                    <>
                                        <div>Your Balance</div>
                                        <div>Actions</div>
                                    </>
                                )
                            }
                            {
                                accountContext.isChain('bsc') && (
                                    <>
                                        <div>Staked ROOM</div>
                                        <div>Rewards</div>
                                    </>
                                )
                            }
                        </div>
                        {
                            nftTires.map((entry) => {
                                return (
                                    <div className={classes.PoolWrap}>
                                        <div>{nftNames[entry]} ({entry+1})</div>
                                        {
                                            accountContext.isChain('main') && (
                                                <>
                                                    <div>{get(userCurrentNftTire, [entry]) ? 'Owns' : 'N/A'}</div>
                                                    <div>
                                                        {
                                                            get(userCurrentNftTire, [entry]) ? (<Button
                                                                isProcessing={get(isUserExitingPool, [entry])}
                                                                size={"small"}
                                                                color="primary"
                                                                onClick={() => handleOnNftStakeExit(entry)}
                                                            >
                                                                Withdraw
                                                            </Button>) : null
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            accountContext.isChain('bsc') && (
                                                <>
                                                    <div>
                                                        <span>{fromWei(get(userCurrentNftTire, [entry, 'stake']) || 0, null, 2)}</span>
                                                        {
                                                            get(userCurrentNftTire, [entry, 'stake']) > 0 ? (<Button
                                                                isProcessing={get(isUserExitingPool, [entry, 'stake'])}
                                                                size={"small"}
                                                                color="primary"
                                                                onClick={() => handleOnUnstakeRoom(entry)}
                                                            >
                                                                Unstake
                                                            </Button>) : null
                                                        }
                                                    </div>
                                                    <div>
                                                        <span>{fromWei(get(userCurrentNftTire, [entry, 'rewards']) || 0, null, 2)}</span>
                                                        {
                                                            get(userCurrentNftTire, [entry, 'rewards']) > 0 ? (<Button
                                                                isProcessing={get(isUserExitingPool, [entry, 'rewards'])}
                                                                size={"small"}
                                                                color="primary"
                                                                onClick={() => handleOnClaimRewards(entry)}
                                                            >
                                                                Claim
                                                            </Button>) : null
                                                        }
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )}
        </div>
    );
}

export default NftStake;
