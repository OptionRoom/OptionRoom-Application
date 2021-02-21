import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useState, useContext} from 'react';

import {useStyles} from './styles'
import {convertAmountToTokens} from "../../shared/helper";
import Button from "../Button";
import AddIcon from "@material-ui/icons/Add";
import DepositModal from "../DepositModal";
import UnstakeModal from "../UnstakeModal";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import swal from "sweetalert";
import {AccountContext} from "../../shared/AccountContextProvider";

import {nftTires, nftImages} from '../../shared/constants';

function NftStake(props) {
    const accountContext = useContext(AccountContext);
    const classes = useStyles();
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [isHarvestInProgress, setIsHarvestInProgress] = useState(false);


    const [userRoomLPTokensAllowance, setUserRoomLPTokensAllowance] = useState(0);
    const [userRoomLPTokens, setUserRoomLPTokens] = useState(0);
    const [farmedRoomTokens, setFarmedRoomTokens] = useState(0);
    const [stackedRoomTokensWithNftStakeContract, setStackedRoomTokensWithNftStakeContract] = useState(0);


    const [isRoomTokenApprovedForNftStakeContract, setIsRoomTokenApprovedForNftStakeContract] = useState(false);
    const [isNftTokenApprovedForNftStakeContract, setIsNftTokenApprovedForNftStakeContract] = useState(false);

    const [isApprovingRoomTokenForNftStakeContract, setIsApprovingRoomTokenForNftStakeContract] = useState(false);
    const [isApprovingNftTokenForNftStakeContract, setIsApprovingNftTokenForNftStakeContract] = useState(false);

    const [userRoomTokenBalance, setUserRoomTokenBalance] = useState(0);
    const [userCurrentNftTire, setUserCurrentNftTire] = useState(-1);


    const findUserCurrentNftTire = (userNftTireBalance, userNftStakeTireBalance) => {
        if (userNftStakeTireBalance['4'] > 0) {
            return 4;
        }

        if (userNftStakeTireBalance['3'] > 0) {
            return 3;
        }

        if (userNftStakeTireBalance['2'] > 0) {
            return 2;
        }

        if (userNftStakeTireBalance['1'] > 0) {
            return 1;
        }

        if (userNftStakeTireBalance['0'] > 0) {
            return 0;
        }

        if (userNftTireBalance['4'] > 0) {
            return 4;
        }

        if (userNftTireBalance['3'] > 0) {
            return 3;
        }

        if (userNftTireBalance['2'] > 0) {
            return 2;
        }

        if (userNftTireBalance['1'] > 0) {
            return 1;
        }

        if (userNftTireBalance['0'] > 0) {
            return 0;
        }

        return -1;
    };

    const initRoomLPPoolData = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);


        //Check if room is approved for nft stake contract
        const userRoomTokenAllowanceBalanceForNftStakeContract = await roomLPFarmingAPIs.getUserRoomTokenAllowanceBalanceForNftStakeContract(accountContext.account);
        if (userRoomTokenAllowanceBalanceForNftStakeContract > 0) {
            setIsRoomTokenApprovedForNftStakeContract(true);
        }

        const isNftTokenApprovedForNftStakeContract = await roomLPFarmingAPIs.isNftTokenApprovedForNftStakeContract(accountContext.account);
        setIsNftTokenApprovedForNftStakeContract(isNftTokenApprovedForNftStakeContract);

        const UserNftTireBalance = await loadUserNftTireBalance(roomLPFarmingAPIs);
        const UserNftStakeTireBalance = await loadUserNftStakeTireBalance(roomLPFarmingAPIs);
        console.log(UserNftTireBalance, UserNftStakeTireBalance);
        const userCurrentNftTire = findUserCurrentNftTire(UserNftTireBalance, UserNftStakeTireBalance);
        setUserCurrentNftTire(userCurrentNftTire);

        const stakedRoomTokensWithNftStakeContract = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(accountContext.account, userCurrentNftTire);
        setStackedRoomTokensWithNftStakeContract(stakedRoomTokensWithNftStakeContract);

        //Get room tokens balance of a user
        const userRoomBalance = await roomLPFarmingAPIs.getUserRoomTokenBalance(accountContext.account);
        setUserRoomTokenBalance(userRoomBalance);
    };

    const openUnstakeModal = () => {
        setIsUnstakeModalOpen(true);
    };

    const handleOnStake = async () => {
        initRoomLPPoolData();
    };

    const handleOnUnStake = async () => {
        /*        swal({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success",
                    button: "Aww yiss!",
                    timer: 3000,
                });*/

        initRoomLPPoolData();
    };

    const loadUserNftTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftTokenBalanceOfTire(accountContext.account, nftTire);
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const loadUserNftStakeTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftStakeBalanceOfTire(accountContext.account, nftTire);
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const handleApprovingRoomTokenForNftStakeContract = async () => {
        setIsApprovingRoomTokenForNftStakeContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.approveUserRoomTokenForNftStakeContract(accountContext.account);
            setIsApprovingRoomTokenForNftStakeContract(true);
            setIsRoomTokenApprovedForNftStakeContract(true);
        } catch (e) {

        } finally {
            setIsApprovingRoomTokenForNftStakeContract(false);
        }
    };

    const handleApprovingNftTokenForNftTokenContract = async () => {
        setIsApprovingNftTokenForNftStakeContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.approveUserNftTokenForNftStakeContract(accountContext.account);
            setIsApprovingNftTokenForNftStakeContract(true);
            setIsNftTokenApprovedForNftStakeContract(true);
        } catch (e) {

        } finally {
            setIsApprovingNftTokenForNftStakeContract(false);
        }
    };

    const handleHarvest = async () => {
        setIsHarvestInProgress(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.claimNftStakeContractRewardsForTire(accountContext.account, userCurrentNftTire);
            const resultFarmedRoomTokens = await roomLPFarmingAPIs.getUserNftStakeRewardsBalanceOfTire(accountContext.account, userCurrentNftTire);
            setFarmedRoomTokens(resultFarmedRoomTokens);
        } catch (e) {

        } finally {
            setIsHarvestInProgress(false);
        }
    };

    const handleShowDepositModal = async () => {
        if (userRoomTokenBalance === 0) {
            swal("Insufficient fund", `You must hold at least 1 $ROOM Tokens`, "error");
            return;
        }

        setIsDepositModalOpen(true);
    };

    useEffect(async () => {
        if (accountContext.account) {
            initRoomLPPoolData();
            setInterval(async () => {
                if (userCurrentNftTire !== -1) {
                    const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
                    const resultFarmedRoomTokens = await roomLPFarmingAPIs.getUserNftStakeRewardsBalanceOfTire(accountContext.account, userCurrentNftTire);
                    setFarmedRoomTokens(resultFarmedRoomTokens);
                }
            }, 1000);
        }

    }, [accountContext.account]);

    return (
        <div className={classes.RoomLpStake}>
            {
                userCurrentNftTire === -1 && (
                    'Buy some Nfts'
                )
            }
            {
                userCurrentNftTire !== -1 && (
                    <>
                        <div className={classes.NftImgWrap}>
                            <img src={nftImages[userCurrentNftTire]}/>
                        </div>
                        <div className={classes.StakeCards}>
                            <div className={classes.EarnCard}
                                 key={'$ROOM-Earned'}>
                                <div className={classes.EarnCard__Icon}></div>
                                <div className={classes.EarnCard__Title}>
                                    {convertAmountToTokens(farmedRoomTokens)}
                                </div>
                                <div className={classes.EarnCard__SubTitle}>$ROOM Earned</div>
                                <div className={classes.EarnCard__Action}>
                                    <Button classes={classes.EarnCard__Action__Btn}
                                            isDisabled={farmedRoomTokens == 0}
                                            isProcessing={isHarvestInProgress}
                                            size={'large'}
                                            fullWidth={true}
                                            color="primary"
                                            onClick={handleHarvest}>
                                        Claim
                                    </Button>
                                </div>
                            </div>
                            <div className={classes.EarnCard}
                                 key={'Staked-RoomLP'}>
                                <div className={classes.EarnCard__Icon}></div>
                                <div className={classes.EarnCard__Title}>
                                    {convertAmountToTokens(stackedRoomTokensWithNftStakeContract)}
                                </div>
                                <div className={classes.EarnCard__SubTitle}>Staked Tokens</div>
                                <div
                                    className={clsx(classes.EarnCard__Action, {
                                        [classes.EarnCard__Action_Two]: isRoomTokenApprovedForNftStakeContract && isNftTokenApprovedForNftStakeContract && stackedRoomTokensWithNftStakeContract > 0
                                    })}>
                                    {
                                        isRoomTokenApprovedForNftStakeContract && isNftTokenApprovedForNftStakeContract && (
                                            <>
                                                {
                                                    stackedRoomTokensWithNftStakeContract > 0 && (
                                                        <>
                                                            <Button className={classes.EarnCard__Action__Btn}
                                                                    size={'large'}
                                                                    color="primary"
                                                                    isDisabled={stackedRoomTokensWithNftStakeContract == 0}
                                                                    onClick={openUnstakeModal}>
                                                                Unstake
                                                            </Button>
                                                            <Button classes={classes.EarnCard__Action__Btn_Add}
                                                                    color={'black'}
                                                                    size={'large'}
                                                                    onClick={handleShowDepositModal}>
                                                                <AddIcon
                                                                    className={classes.EarnCard__Action__Btn_Add__Icon}></AddIcon>
                                                            </Button>
                                                        </>
                                                    )
                                                }
                                                {
                                                    stackedRoomTokensWithNftStakeContract == 0 && (
                                                        <Button size={'large'}
                                                                color="primary"
                                                                onClick={handleShowDepositModal}
                                                                className={classes.EarnCard__Action__Btn}
                                                                fullWidth={true}>
                                                            Stake
                                                        </Button>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        !isRoomTokenApprovedForNftStakeContract ? (
                                            <Button size={'large'}
                                                    color="primary"
                                                    onClick={handleApprovingRoomTokenForNftStakeContract}
                                                    className={classes.EarnCard__Action__Btn}
                                                    fullWidth={true}
                                                    isProcessing={isApprovingRoomTokenForNftStakeContract}>
                                                Approve $ROOM
                                            </Button>
                                        ) : (
                                            !isNftTokenApprovedForNftStakeContract ? (
                                                <Button size={'large'}
                                                        color="primary"
                                                        onClick={handleApprovingNftTokenForNftTokenContract}
                                                        className={classes.EarnCard__Action__Btn}
                                                        fullWidth={true}
                                                        isProcessing={isApprovingNftTokenForNftStakeContract}>
                                                    Approve NFT
                                                </Button>
                                            ) : (
                                                null
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            <DepositModal open={isDepositModalOpen}
                                          onClose={() => setIsDepositModalOpen(false)}
                                          onStake={handleOnStake}
                                          userRoomLPTokens={userRoomTokenBalance}
                                          nftTire={userCurrentNftTire}
                                          type={'nftStake'}/>
                            <UnstakeModal open={isUnstakeModalOpen}
                                          onClose={() => setIsUnstakeModalOpen(false)}
                                          onUnStake={handleOnUnStake}
                                          stakedTokensBalance={stackedRoomTokensWithNftStakeContract}
                                          nftTire={userCurrentNftTire}
                                          type={'nftStake'}/>
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default NftStake;
