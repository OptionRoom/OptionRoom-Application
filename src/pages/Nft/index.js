import React, {useContext, useEffect, useState, createRef} from 'react';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {BigNumber} from "@ethersproject/bignumber";

import Navbar from '../../components/Navbar';
import DepositModal from '../../components/DepositModal';
import UnstakeModal from '../../components/UnstakeModal';
import Button from '../../components/Button';

import {useStyles} from './styles';
import {AccountContext} from "../../shared/AccountContextProvider";
import RoomLPFarmingAPIs from "../../shared/contracts/RoomLPFarmingAPIs";
import {convertAmountToTokens} from "../../shared/helper";
import ConnectButton from "../../components/ConnectButton";
import {nftTires, nftImages} from '../../shared/constants';

function Nft() {
    const classes = useStyles();

    const [isIniting, setIsIniting] = useState(true);
    const [currentView, setCurrentView] = useState('UPGRADE');

    const [isRoomTokenApprovedForNftTokenContract, setIsRoomTokenApprovedForNftTokenContract] = useState(false);
    const [isApprovingRoomTokenForNftTokenContract, setIsApprovingRoomTokenForNftTokenContract] = useState(false);

    const [isNftTokenApprovedForNftTokenContract, setIsNftTokenApprovedForNftTokenContract] = useState(true);
    const [isApprovingNftTokenForNftTokenContract, setIsApprovingNftTokenForNftTokenContract] = useState(false);

    const [userNftTireBalance, setUserNftTireBalance] = useState({});
    const [availableNftTireBalance, setAvailableNftTireBalance] = useState({});
    const [userRoomTokenBalance, setUserRoomTokenBalance] = useState({});
    const [userCurrentNftTire, setUserCurrentNftTire] = useState(0);
    const [requiredRoomsForTire, setRequiredRoomsForTire] = useState(0);
    const [isUpgradingNftToken, setIsUpgradingNftToken] = useState(false);

    const accountContext = useContext(AccountContext);
    accountContext.changeTheme('black');


    const handleApprovingRoomTokenForNftTokenContract = async () => {
        setIsApprovingRoomTokenForNftTokenContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.approveUserRoomTokenForNftTokenContract(accountContext.account);
            setIsRoomTokenApprovedForNftTokenContract(true);
        } catch (e) {

        } finally {
            setIsApprovingRoomTokenForNftTokenContract(false);
        }
    };

    const handleApprovingNftTokenForNftTokenContract = async () => {
        setIsApprovingNftTokenForNftTokenContract(true);

        try {
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            await roomLPFarmingAPIs.approveUserNftTokenForNftTokenContract(accountContext.account);
            setIsNftTokenApprovedForNftTokenContract(true);
        } catch (e) {

        } finally {
            setIsApprovingNftTokenForNftTokenContract(false);
        }
    };

    const findUserCurrentNftTire = (userNftTireBalance) => {
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

    const loadUserNftTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getUserNftTokenBalanceOfTire(accountContext.account, nftTire);
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const loadAvailableNftTireBalance = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getAvailableNftTokenBalanceOfTire(accountContext.account, nftTire);
            data[nftTire] = parseInt(res);
        }

        return data;
    };


    const loadRequiredRoomsForTire = async (roomLPFarmingAPIs) => {
        const data = {};
        for (let nftTire of nftTires) {
            const res = await roomLPFarmingAPIs.getRequiredRoomsForTire(accountContext.account, nftTire);
            data[nftTire] = parseInt(res);
        }

        return data;
    };

    const initRoomLPPoolData = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
        const userNftTireBalance = await loadUserNftTireBalance(roomLPFarmingAPIs);
        const requiredRoomsForTire = await loadRequiredRoomsForTire(roomLPFarmingAPIs);
        setRequiredRoomsForTire(requiredRoomsForTire);
        setUserCurrentNftTire(findUserCurrentNftTire(userNftTireBalance));

        //Check if room is approved for nft token contract
        const userRoomTokenAllowanceBalanceForNftTokenContract = await roomLPFarmingAPIs.getUserRoomTokenAllowanceBalanceForNftTokenContract(accountContext.account);
        if (userRoomTokenAllowanceBalanceForNftTokenContract > 0) {
            setIsRoomTokenApprovedForNftTokenContract(true);
        }

        /*        const nftToken_Approved_NftTokenContract = await roomLPFarmingAPIs.isNftTokenApprovedForNftTokenContract(accountContext.account);
                setIsNftTokenApprovedForNftTokenContract(nftToken_Approved_NftTokenContract);*/
    };

    const findCurrentView = () => {
        if (userCurrentNftTire === -1) {
            return 'FIRST';
        }

        if (userCurrentNftTire === 4) {
            accountContext.changeTheme('black', 'golden');
            return 'LAST';
        }

        return 'UPGRADE';
    };

    const updateNftTireBalance = async () => {
        const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
        const availableNftTireBalance = await loadAvailableNftTireBalance(roomLPFarmingAPIs);
        setAvailableNftTireBalance(availableNftTireBalance);
    };

    const callInit = async () => {

        setIsIniting(true);
        await initRoomLPPoolData();
        setIsIniting(false);
    };

    const handleUpgrade = async () => {
        if (userCurrentNftTire === 4) {
            console.error("Can't upgrade any more");
            return;
        }

        setIsUpgradingNftToken(true);

        try {
            const nextNftTire = userCurrentNftTire + 1;
            const roomLPFarmingAPIs = new RoomLPFarmingAPIs(0, accountContext.web3Instance);
            const availableNftBalanceOfTheTire = await roomLPFarmingAPIs.getAvailableNftTokenBalanceOfTire(accountContext.account, nextNftTire);
            if (availableNftBalanceOfTheTire == 0) {
                setIsUpgradingNftToken(false);
                swal("Sorry!", `Can't upgrade, the maximum number of NFTs has been minted`, "error");
                return;
            }

            const requiredRoomForNftTire = await roomLPFarmingAPIs.getRequiredRoomsForTire(accountContext.account, nextNftTire);
            const userRoomTokenBalance = await roomLPFarmingAPIs.getUserRoomTokenBalance(accountContext.account);

            //console.log("requiredRoomForNftTire", requiredRoomForNftTire, userRoomTokenBalance);

            if (BigNumber.from(userRoomTokenBalance).lt(BigNumber.from(requiredRoomForNftTire))) {
                setIsUpgradingNftToken(false);
                swal("Insufficient funds", `You must hold at least ${convertAmountToTokens(requiredRoomForNftTire)} ROOM Tokens`, "error");
                return;
            }

            await roomLPFarmingAPIs.mintTireOfNftToken(accountContext.account, nextNftTire);

            const userNftTireBalance = await loadUserNftTireBalance(roomLPFarmingAPIs);
            setUserCurrentNftTire(findUserCurrentNftTire(userNftTireBalance));
        } catch (e) {
            console.log(e);
        } finally {
            setIsUpgradingNftToken(false);
        }
    };

    const getHeaderTxt = () => {
        if (findCurrentView() === "FIRST") {
            return "Convert ROOM tokens into limited amount of NFTs on this page.";
        }

        if (findCurrentView() === "UPGRADE") {
            return "Here you can upgrade your NFT to a higher Tier in case it’s still available."
        }

        return null;
    };

    useEffect(() => {
        let updateNftTireBalanceIntervalId = null;
        if (accountContext.account) {
            callInit();
            clearInterval(updateNftTireBalanceIntervalId);
            updateNftTireBalanceIntervalId = setInterval(updateNftTireBalance, 1000);
        }

        return (() => {
            clearInterval(updateNftTireBalanceIntervalId);
        })
    }, [accountContext.account]);

    return (
        <>
            <Navbar title={'NFT'}
                    details={getHeaderTxt()}/>

            <div className={classes.NftPage}>
                {
                    accountContext.account && (
                        <>
                            {
                                isIniting && (
                                    <div className={classes.IsInitingWrap}>
                                        <CircularProgress/>
                                    </div>
                                )
                            }
                            {
                                !isIniting && (
                                    <>
                                        {
                                            availableNftTireBalance && (
                                                <div className={classes.Stats}>
                                                    <div>Tier 1: {availableNftTireBalance['0']}/75</div>
                                                    <div>Tier 2: {availableNftTireBalance['1']}/60</div>
                                                    <div>Tier 3: {availableNftTireBalance['2']}/45</div>
                                                    <div>Tier 4: {availableNftTireBalance['3']}/30</div>
                                                    <div>Tier 5: {availableNftTireBalance['4']}/12</div>
                                                </div>
                                            )
                                        }
                                        {
                                            findCurrentView() === "FIRST" && (
                                                <div className={classes.FirstNft}>
                                                    <div className={classes.FirstNft__ImageWrap}>
                                                        <img className={classes.FirstNft__ImageWrap__Img}
                                                             src={nftImages[0]}/>
                                                    </div>
{/*                                                    <div className={classes.FirstNft__Remaining}>
                                                        {availableNftTireBalance && availableNftTireBalance['0']} Available
                                                    </div>*/}
                                                    {
                                                        isRoomTokenApprovedForNftTokenContract && isNftTokenApprovedForNftTokenContract && (
                                                            <Button className={classes.FirstNft__GetBtn}
                                                                    color="primary"
                                                                    onClick={handleUpgrade}
                                                                    size={'medium'}
                                                                    isProcessing={isUpgradingNftToken}>
                                                                Get NFT
                                                            </Button>
                                                        )
                                                    }
                                                    {
                                                        !isRoomTokenApprovedForNftTokenContract ? (
                                                            <Button className={classes.FirstNft__GetBtn}
                                                                    color="primary"
                                                                    size={'medium'}
                                                                    isProcessing={isApprovingRoomTokenForNftTokenContract}
                                                                    onClick={handleApprovingRoomTokenForNftTokenContract}>
                                                                Approve ROOM
                                                            </Button>
                                                        ) : (
                                                            !isNftTokenApprovedForNftTokenContract ? (
                                                                (
                                                                    <Button className={classes.FirstNft__GetBtn}
                                                                            color="primary"
                                                                            size={'medium'}
                                                                            isProcessing={isApprovingNftTokenForNftTokenContract}
                                                                            onClick={handleApprovingNftTokenForNftTokenContract}>
                                                                        Approve NFT
                                                                    </Button>
                                                                )
                                                            ) : null
                                                        )
                                                    }
                                                    <div className={classes.FirstNft__Note}>
                                                        This transaction will
                                                        consume {requiredRoomsForTire && convertAmountToTokens(requiredRoomsForTire['0'])} ROOM
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            findCurrentView() === "UPGRADE" && (
                                                <div className={classes.UpgradeNft}>
                                                    <div className={classes.UpgradeNft__Card}>
                                                        <div className={classes.UpgradeNft__ImageWrap}>
                                                            <div className={classes.UpgradeNft__ImageWrap__Note}>
                                                                Current NFT
                                                            </div>
                                                            <img className={classes.UpgradeNft__ImageWrap__Img}
                                                                 src={nftImages[userCurrentNftTire]}/>
                                                        </div>
                                                        <div className={classes.UpgradeNft__Card__Arrow__Wrap}>
                                                            <ArrowForwardIcon
                                                                className={classes.UpgradeNft__Card__Arrow}/>
                                                            <ArrowDownwardIcon
                                                                className={classes.UpgradeNft__Card__Arrow__Down}/>
                                                        </div>
                                                        <div className={classes.UpgradeNft__ImageWrap}>
                                                            <div className={classes.UpgradeNft__ImageWrap__Note}>
                                                                Next Tier NFT
                                                            </div>
                                                            <img className={classes.UpgradeNft__ImageWrap__Img}
                                                                 src={nftImages[userCurrentNftTire + 1]}/>
                                                        </div>
{/*                                                        <div className={classes.UpgradeNft__Remaining}>
                                                            {availableNftTireBalance && availableNftTireBalance[`${userCurrentNftTire + 1}`]} Available
                                                        </div>*/}
                                                    </div>
                                                    <Button className={classes.UpgradeNft__GetBtn}
                                                            size={'medium'}
                                                            color="primary"
                                                            onClick={handleUpgrade}
                                                            isProcessing={isUpgradingNftToken}>
                                                        Upgrade
                                                    </Button>
                                                    <div className={classes.UpgradeNft__Note}>
                                                        This transaction will
                                                        consume {requiredRoomsForTire && convertAmountToTokens(requiredRoomsForTire[`${userCurrentNftTire + 1}`])} ROOM
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {
                                            findCurrentView() === "LAST" && (
                                                <div className={classes.LastNft}>
                                                    <div className={classes.LastNft__Note}>
                                                        You are the proud owner of the ultra-rare Citadel NFT
                                                    </div>
                                                    <div className={classes.LastNft__ImageWrap}>
                                                        <img className={classes.LastNft__ImageWrap__Img}
                                                             src={nftImages['4']}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </>
                                )
                            }
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

export default Nft;
