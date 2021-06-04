import {useState, useContext} from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";

import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import {useStyles} from "./styles";
import {OptionroomThemeContext} from "../../shared/OptionroomThemeContextProvider";
import {AccountContext} from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";

import {
    MoneyIcon
} from '../../shared/icons';

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
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            <div className={classes.ClaimCard}>

                <div className={classes.ClaimCard__TabPanel}>
                    <div className={classes.ClaimInfo}>
                        <div className={classes.Total}>
                            <div className={classes.Total__Title}>
                                Total
                            </div>
                            <div className={classes.Total__Content}>
                                <MoneyIcon/><span>0.00000000</span>
                            </div>
                        </div>
                        <div className={classes.UnlockProgress}>
                            <div className={classes.UnlockProgress__Title}>
                                <div>Unlock in progress</div>
                                <div className={classes.UnlockProgress__Value}>
                                    18.9123512515%
                                </div>
                            </div>
                            <div className={classes.UnlockProgress__ProgressBar}>
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={50}
                                />
                            </div>
                        </div>
                        <div
                            className={classes.UnlockProgress__Warn}
                        >
                            Your locked $ROOM is worth $508,415.66
                            <br/>
                            <br/>
                            When this unlocks it will earn you
                            $464.29 per day for 3 years. The
                            equivalent of $169,464.10 per year
                        </div>
                        <div className={classes.ClaimDetails}>
                            <div>
                                <div>Already Claimed</div>
                                <div>3</div>
                            </div>
                            <div>
                                <div>Claimable</div>
                                <div>3</div>
                            </div>
                        </div>
                        <Button
                            className={classes.ClaimForm__ClaimBtn}
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                        >
                            Claim
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Claim;
