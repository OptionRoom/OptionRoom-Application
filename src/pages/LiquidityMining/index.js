import React, {useContext, useEffect, useState, createRef} from 'react';
import AddIcon from '@material-ui/icons/Add';
import swal from 'sweetalert';

import Navbar from '../../components/Navbar';
import DepositModal from '../../components/DepositModal';
import UnstakeModal from '../../components/UnstakeModal';
import Button from '../../components/Button';
import ConnectButton from '../../components/ConnectButton';

import {useStyles} from './styles';
import {AccountContext} from "../../shared/AccountContextProvider";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import {convertAmountToTokens} from "../../shared/helper";
import MuiDialogActions from "@material-ui/core/DialogActions";
import clsx from "clsx";

function LiquidityMining() {
    const classes = useStyles();

    const [currentView, setCurrentView] = useState('ROOM_ETH_LP');
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
    const [isHarvestInProgress, setIsHarvestInProgress] = useState(false);
    const [isApproveProcessing, setIsApproveProcessing] = useState(false);


    const [userRoomLPTokensAllowance, setUserRoomLPTokensAllowance] = useState(0);
    const [userRoomLPTokens, setUserRoomLPTokens] = useState(0);
    const [farmedRoomTokens, setFarmedRoomTokens] = useState(0);
    const [stackedRoomLPTokens, setStackedRoomLPTokens] = useState(0);
    const [blockNumber, setBlockNumber] = useState(0);

    const accountContext = useContext(AccountContext);

    const initRoomLPPoolData = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);

        const result = await roomLPFarmingAPIs.getRoomLPTokensBalanceForAddress(accountContext.account);
        setUserRoomLPTokens(result);

        const resultFarmedRoomTokens = await roomLPFarmingAPIs.getFarmedRoomTokens(accountContext.account);
        setFarmedRoomTokens(resultFarmedRoomTokens);

        const resultStackedRoomLPTokens = await roomLPFarmingAPIs.getStackedRoomLPTokens(accountContext.account);
        setStackedRoomLPTokens(resultStackedRoomLPTokens);

        const roomLPTokensAllowance = await roomLPFarmingAPIs.getRoomLPTokensAllowanceBalanceForAddress(accountContext.account);
        setUserRoomLPTokensAllowance(roomLPTokensAllowance);
    };

    const openUnstakeModal = () => {
        setIsUnstakeModalOpen(true);
    };

    const handleOnStake = async () => {
        initRoomLPPoolData();
    };

    const handleOnUnStake = async () => {
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
            timer: 1000,
        });
        initRoomLPPoolData();
    };

    const handleApproveUserRoomLPTokens = async () => {
        setIsApproveProcessing(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.approveUserRoomLPTokens(accountContext.account);
            const roomLPTokensAllowance = await roomLPFarmingAPIs.getRoomLPTokensAllowanceBalanceForAddress(accountContext.account);
            setUserRoomLPTokensAllowance(roomLPTokensAllowance);
        } catch (e) {

        } finally {
            setIsApproveProcessing(false);
        }

    };

    const handleHarvest = async () => {
        setIsHarvestInProgress(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.claimFarmedRoomTokens(accountContext.account);
            const resultFarmedRoomTokens = await roomLPFarmingAPIs.getFarmedRoomTokens(accountContext.account);
            setFarmedRoomTokens(resultFarmedRoomTokens);
        } catch (e) {

        } finally {
            setIsHarvestInProgress(false);
        }
    };

    useEffect(async () => {
        if(accountContext.account) {
            initRoomLPPoolData();
            setInterval(async () => {
                const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
                const res = await roomLPFarmingAPIs.getBlockNumber(accountContext.account);
                const resultFarmedRoomTokens = await roomLPFarmingAPIs.getFarmedRoomTokens(accountContext.account);
                setFarmedRoomTokens(resultFarmedRoomTokens);
                setBlockNumber(res);
            }, 1000);
        }

    }, [accountContext.account]);

    const pools = [
        {
            id: "ROOM_ETH_LP",
            title: 'Deposit ROOM-ETH LP',
            decs: 'Earn $ROOM'
        }
    ];

    return (
        <>
            <Navbar title={'Liquidity Mining Page'}
                    details={'Earn ROOM tokens by providing liquidity to the ROOM/ETH pair on Uniswap and staking your LP tokens on this page.'}/>

            <div className={classes.LiquidityMiningPage}>
                {
                    accountContext.account && (
                        <>

                            <div className={classes.Pools}>
                                {
                                    currentView === 'POOLS' && (
                                        pools.map((pool) => (
                                            <div className={classes.Pool}
                                                 key={`Pool-${pool.id}`}>
                                                <div className={classes.Pool__Icon}></div>
                                                <div className={classes.Pool__Title}>
                                                    {pool.title}
                                                </div>
                                                <div className={classes.Pool__Action}>
                                                    <Button className={classes.Pool__Action__Btn}
                                                            color="primary"
                                                            size={'large'}
                                                            fullWidth={true}
                                                            onClick={() => {
                                                                initRoomLPPoolData();
                                                                setCurrentView(pool.id);
                                                            }}>
                                                        {pool.decs}
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                                {
                                    currentView === 'ROOM_ETH_LP' && (
                                        <>
                                            <div className={classes.EarnCard}
                                                 key={'$ROOM-Earned'}>
                                                <div className={classes.EarnCard__Icon}></div>
                                                <div className={classes.EarnCard__Title}>
                                                    {convertAmountToTokens(farmedRoomTokens)}-{blockNumber}
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
                                                    {convertAmountToTokens(stackedRoomLPTokens)}
                                                </div>
                                                <div className={classes.EarnCard__SubTitle}>Staked RoomLP</div>
                                                <div
                                                    className={clsx(classes.EarnCard__Action, {
                                                        [classes.EarnCard__Action_Two]: userRoomLPTokensAllowance > 0 && stackedRoomLPTokens> 0
                                                    })}>
                                                    {
                                                        userRoomLPTokensAllowance <= 0 && (
                                                            <Button size={'large'}
                                                                    color="primary"
                                                                    onClick={handleApproveUserRoomLPTokens}
                                                                    className={classes.EarnCard__Action__Btn}
                                                                    fullWidth={true}
                                                                    isProcessing={isApproveProcessing}>
                                                                Approve
                                                            </Button>
                                                        )
                                                    }
                                                    {
                                                        userRoomLPTokensAllowance > 0 && stackedRoomLPTokens> 0 && (
                                                            <>
                                                                <Button className={classes.EarnCard__Action__Btn}
                                                                        size={'large'}
                                                                        color="primary"
                                                                        isDisabled={stackedRoomLPTokens == 0}
                                                                        onClick={openUnstakeModal}>
                                                                    Unstake
                                                                </Button>
                                                                <Button classes={classes.EarnCard__Action__Btn_Add}
                                                                        color={'black'}
                                                                        size={'large'}
                                                                        onClick={() => setIsDepositModalOpen(true)}>
                                                                    <AddIcon
                                                                        className={classes.EarnCard__Action__Btn_Add__Icon}></AddIcon>
                                                                </Button>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        userRoomLPTokensAllowance > 0 && stackedRoomLPTokens == 0 && (
                                                            <Button size={'large'}
                                                                    color="primary"
                                                                    onClick={() => setIsDepositModalOpen(true)}
                                                                    className={classes.EarnCard__Action__Btn}
                                                                    fullWidth={true}>
                                                                Stake
                                                            </Button>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                            <DepositModal open={isDepositModalOpen}
                                          onClose={() => setIsDepositModalOpen(false)}
                                          onStake={handleOnStake}
                                          userRoomLPTokens={userRoomLPTokens}/>
                            <UnstakeModal open={isUnstakeModalOpen}
                                          onClose={() => setIsUnstakeModalOpen(false)}
                                          onUnStake={handleOnUnStake}
                                          stakedTokensBalance={stackedRoomLPTokens}/>

                        </>
                    )
                }
                {
                    !accountContext.account && (
                        <div className={classes.ConnectWrap}>
                            <ConnectButton/>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default LiquidityMining;
