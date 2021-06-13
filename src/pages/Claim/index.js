import React, {useState, useContext, useEffect} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {
    sum
} from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "../../components/Button";

import {useStyles} from "./styles";
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import OrTab from "../../components/OrTab";

import {
    MoneyIcon
} from '../../shared/icons';
import {fromWei} from "../../shared/helper";
import ClaimAPIs from './../../shared/contracts/ClaimAPIs';
import Alert from "@material-ui/lab/Alert";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: "16px",
        borderRadius: "8px",
    },
    colorPrimary: {
        backgroundColor: "#EDEFF4",
    },
    bar: {
        borderRadius: "8px",
        backgroundColor: "#004BFF",
    },
}))(LinearProgress);


function Claim() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const [selectedPool, setSelectedPool] = useState('rewards');
    const [isClaimProcessing, setIsClaimProcessing] = useState(false);

    const [claimInfo, setClaimInfo] = useState({
        totalLocked: 0,
        withdrawn: 0,
        releasableAmount: 0,
        totalUnlocked: 0,
        totalUnlockedPercent: 0
    });

    //Rewards
    const [isClaimResolveProcessing, setIsClaimResolveProcessing] = useState(false);
    const [isClaimValidationProcessing, setIsClaimValidationProcessing] = useState(false);
    const [isClaimTradeProcessing, setIsClaimTradeProcessing] = useState(false);

    const [resolveRewards, setResolveRewards] = useState({
        claimedRewards: 0,
        rewardsCanClaim: 0,
        todayExpectedReward: 0
    });

    const [validationRewards, setValidationRewards] = useState({
        claimedRewards: 0,
        rewardsCanClaim: 0,
        todayExpectedReward: 0
    });

    const [tradeRewards, setTradeRewards] = useState({
        claimedRewards: 0,
        rewardsCanClaim: 0,
        todayExpectedReward: 0
    });

    const handleChange = (newValue) => {
        setSelectedPool(newValue);
    };

    const handleClaimRewards = async (pool) => {
        if(pool === 'all' || pool === 'validation') {
            setIsClaimValidationProcessing(true);
        }

        if(pool === 'all' || pool === 'resolve') {
            setIsClaimResolveProcessing(true);
        }

        if(pool === 'all' || pool === 'trade') {
            setIsClaimTradeProcessing(true);
        }

        try {
            const claimAPIs = new ClaimAPIs();
            await claimAPIs.claimRewards(accountContext.account, pool);
            loadRewardsData();
        } catch (e) {

        } finally {
            if(pool === 'all' || pool === 'validation') {
                setIsClaimValidationProcessing(false);
            }

            if(pool === 'all' || pool === 'resolve') {
                setIsClaimResolveProcessing(false);
            }

            if(pool === 'all' || pool === 'trade') {
                setIsClaimTradeProcessing(false);
            }
        }
    };

    const claim = async () => {
        setIsClaimProcessing(true);

        try {
            const claimAPIs = new ClaimAPIs();
            await claimAPIs.claim(accountContext.account, claimInfo.poolId, claimInfo.releasableAmount);
            loadClaimData();
        } catch (e) {

        } finally {
            setIsClaimProcessing(false);
        }
    };

    const loadClaimData = async () => {
        const claimAPIs = new ClaimAPIs();
        const pools = selectedPool === 'seed' ? [0, 2] : [1, 3];
        let foundPool = false;
        for (let poolId of pools) {
            const result = await claimAPIs.getBeneficiaryInfo(accountContext.account, poolId, accountContext.account);
            if (result.totalLocked > 0) {
                setClaimInfo({
                    totalUnlockedPercent: (parseFloat(result.releasableAmount) + parseFloat(result.withdrawn)) / parseFloat(result.totalLocked),
                    poolId: poolId,
                    ...result
                });
                foundPool = true;
                break;
            }
        }

        if (!foundPool) {
            setClaimInfo({
                totalLocked: 0,
                withdrawn: 0,
                releasableAmount: 0,
                totalUnlocked: 0,
                totalUnlockedPercent: 0
            });
        }
    };


    const loadRewardsData = async () => {
        const claimAPIs = new ClaimAPIs();

        const resolveRewards = await claimAPIs.getRewards(accountContext.account, 'resolve');
        setResolveRewards(resolveRewards);
        const validationRewards = await claimAPIs.getRewards(accountContext.account, 'validation');
        setValidationRewards(validationRewards);
        const tradeRewards = await claimAPIs.getRewards(accountContext.account, 'trade');
        setTradeRewards(tradeRewards);
    };


    useEffect(() => {
        if (accountContext.account) {
            if(isRoomTokensShown() && accountContext.isChain('main')) {
                loadClaimData();
            }

            if(isRewardsShown() && (accountContext.isChain('1337') || accountContext.isChain('ropsten'))) {
                loadRewardsData();
            }
        }
    }, [accountContext.account, selectedPool, accountContext.chainId]);

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    const isRewardsShown = () => {
        return ['rewards'].indexOf(selectedPool) > -1;
    };

    const isRoomTokensShown = () => {
        return ['seed', 'private'].indexOf(selectedPool) > -1;
    };


    return (
        <div className={classes.ClaimPage}>
            <Navbar
                title={"Claim"}
                details={
                    "Claim your tokens on this page"
                }
            />
            {
                (!accountContext.isChain('main') && isRoomTokensShown()) && (
                    <Alert
                        elevation={6}
                        variant="filled"
                        style={{
                            maxWidth: '500px',
                            margin: '0 auto 15px'
                        }}
                        severity="error">Unsupported chain, supported chains are: 56 (BSC)</Alert>
                )
            }
            <div className={classes.ClaimCard}>
                <OrTab tabs={[
                    {
                        id: 'rewards',
                        label: 'Rewards'
                    },
                    {
                        id: 'seed',
                        label: 'Seed'
                    },
                    {
                        id: 'private',
                        label: 'Private'
                    }
                ]}
                       value={selectedPool}
                       handleChange={handleChange}/>
                <div className={classes.ClaimCard__TabPanel}>
                    <div className={classes.ClaimInfo}>
                        {
                            isRoomTokensShown() && (
                                <>
                                    <div className={classes.Total}>
                                        <div className={classes.Total__Title}>
                                            Total
                                        </div>
                                        <div className={classes.Total__Content}>
                                            <MoneyIcon/><span>{fromWei(claimInfo.totalLocked)}</span>
                                        </div>
                                    </div>
                                    <div className={classes.UnlockProgress}>
                                        <div className={classes.UnlockProgress__Title}>
                                            <div>Unlock in progress</div>
                                            <div className={classes.UnlockProgress__Value}>
                                                {(claimInfo.totalUnlockedPercent * 100)}%
                                            </div>
                                        </div>
                                        <div className={classes.UnlockProgress__ProgressBar}>
                                            <BorderLinearProgress
                                                variant="determinate"
                                                value={(claimInfo.totalUnlockedPercent) * 100}
                                            />
                                        </div>
                                    </div>
                                    {/*                        <div
                            className={classes.UnlockProgress__Warn}
                        >
                            Your locked $ROOM is worth $508,415.66
                            <br/>
                            <br/>
                            When this unlocks it will earn you
                            $464.29 per day for 3 years. The
                            equivalent of $169,464.10 per year
                        </div>*/}
                                    <div className={classes.ClaimDetails}>
                                        <div>
                                            <div>Already Claimed</div>
                                            <div>{fromWei(claimInfo.withdrawn)}</div>
                                        </div>
                                        <div>
                                            <div>Claimable</div>
                                            <div>{fromWei(claimInfo.releasableAmount)}</div>
                                        </div>
                                    </div>
                                    <div className={classes.ClaimForm__ClaimBtnWrap}>
                                        <Button
                                            onClick={claim}
                                            className={classes.ClaimForm__ClaimBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'large'}
                                            isDisabled={claimInfo.releasableAmount == 0}
                                            isProcessing={isClaimProcessing}
                                        >
                                            Claim
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                        {
                            isRewardsShown() && (
                                <>
                                    <div className={classes.Total}>
                                        <div className={classes.Total__Title}>
                                            Total
                                        </div>
                                        <div className={classes.Total__Content}>
                                            <MoneyIcon/><span>{
                                            sum([
                                                parseFloat(fromWei(validationRewards.rewardsCanClaim)),
                                                parseFloat(fromWei(resolveRewards.rewardsCanClaim)),
                                                parseFloat(fromWei(tradeRewards.rewardsCanClaim))
                                            ])
                                        }</span>
                                        </div>
                                    </div>
                                    <div className={classes.tableWrap}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Pool</TableCell>
                                                    <TableCell align="right">Claimed</TableCell>
                                                    <TableCell align="right">Expected Today</TableCell>
                                                    <TableCell align="right">Claimable</TableCell>
                                                    <TableCell align="right"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow key={'pool1'}>
                                                    <TableCell component="th" scope="row">Validation</TableCell>
                                                    <TableCell align="right">{fromWei(validationRewards.claimedRewards)}</TableCell>
                                                    <TableCell align="right">{fromWei(validationRewards.todayExpectedReward)}</TableCell>
                                                    <TableCell align="right">{fromWei(validationRewards.rewardsCanClaim)}</TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            onClick={()=> handleClaimRewards('validation')}
                                                            className={classes.ClaimForm__ClaimBtn}
                                                            variant="contained"
                                                            color="primary"
                                                            size={'small'}
                                                            isDisabled={validationRewards.rewardsCanClaim == 0}
                                                            isProcessing={isClaimValidationProcessing}
                                                        >
                                                            Claim
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={'pool2'}>
                                                    <TableCell component="th" scope="row">Resolve</TableCell>
                                                    <TableCell align="right">{fromWei(resolveRewards.claimedRewards)}</TableCell>
                                                    <TableCell align="right">{fromWei(resolveRewards.todayExpectedReward)}</TableCell>
                                                    <TableCell align="right">{fromWei(resolveRewards.rewardsCanClaim)}</TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            onClick={()=> handleClaimRewards('resolve')}
                                                            className={classes.ClaimForm__ClaimBtn}
                                                            variant="contained"
                                                            color="primary"
                                                            size={'small'}
                                                            isDisabled={resolveRewards.rewardsCanClaim == 0}
                                                            isProcessing={isClaimResolveProcessing}
                                                        >
                                                            Claim
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={'pool3'}>
                                                    <TableCell component="th" scope="row">Trade</TableCell>
                                                    <TableCell align="right">{fromWei(tradeRewards.claimedRewards)}</TableCell>
                                                    <TableCell align="right">{fromWei(tradeRewards.todayExpectedReward)}</TableCell>
                                                    <TableCell align="right">{fromWei(tradeRewards.rewardsCanClaim)}</TableCell>
                                                    <TableCell align="right">
                                                        <Button
                                                            onClick={()=> handleClaimRewards('trade')}
                                                            className={classes.ClaimForm__ClaimBtn}
                                                            variant="contained"
                                                            color="primary"
                                                            size={'small'}
                                                            isDisabled={tradeRewards.rewardsCanClaim == 0}
                                                            isProcessing={isClaimTradeProcessing}
                                                        >
                                                            Claim
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className={classes.ClaimForm__ClaimBtnWrap}>
                                        <Button
                                            onClick={()=> handleClaimRewards('all')}
                                            className={classes.ClaimForm__ClaimBtn}
                                            variant="contained"
                                            color="primary"
                                            size={'large'}
                                            isDisabled={                                            sum([
                                                parseFloat(fromWei(validationRewards.rewardsCanClaim)),
                                                parseFloat(fromWei(resolveRewards.rewardsCanClaim)),
                                                parseFloat(fromWei(tradeRewards.rewardsCanClaim))
                                            ]) == 0}
                                            isProcessing={isClaimResolveProcessing || isClaimTradeProcessing || isClaimValidationProcessing}
                                        >
                                            Claim All
                                        </Button>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Claim;
