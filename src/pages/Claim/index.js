import React, {useState, useContext, useEffect} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";

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
    const [selectedPool, setSelectedPool] = useState('seed');
    const [isClaimProcessing, setIsClaimProcessing] = useState(false);

    const [claimInfo, setClaimInfo] = useState({
        totalLocked: 0,
        withdrawn: 0,
        releasableAmount: 0,
        totalUnlocked: 0,
        totalUnlockedPercent: 0
    });

    const handleChange = (newValue) => {
        setSelectedPool(newValue);
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
        for(let poolId of pools) {
            const result = await claimAPIs.getBeneficiaryInfo(accountContext.account, poolId, accountContext.account);
            if(result.totalLocked > 0) {
                setClaimInfo({
                    totalUnlockedPercent: (parseFloat(result.releasableAmount) + parseFloat(result.withdrawn)) / parseFloat(result.totalLocked),
                    poolId: poolId,
                    ...result
                });
                foundPool = true;
                break;
            }
        }

        if(!foundPool) {
            setClaimInfo({
                totalLocked: 0,
                withdrawn: 0,
                releasableAmount: 0,
                totalUnlocked: 0,
                totalUnlockedPercent: 0
            });
        }
    };

    useEffect(() => {
        if(accountContext.account && accountContext.isChain('main')) {
            loadClaimData();
        }
    }, [accountContext.account, selectedPool, accountContext.chainId]);

    if (!accountContext.account) {
        return (
            <div className={classes.ConnectWrap}>
                <ConnectButton/>
            </div>
        )
    }

    return (
        <div className={classes.ClaimPage}>
            <Navbar
                title={"Claim"}
                details={
                    "Claim your tokens on this page"
                }
            />
            {
                !accountContext.isChain('main') && (
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Claim;
