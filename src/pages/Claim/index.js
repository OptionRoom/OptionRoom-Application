import { useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";

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

const StyledTabs = withStyles({
    root: {
        padding: "27px 27px 0",
        minHeight: "auto",
    },
    indicator: {
        display: "none",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > span": {
            display: "none",
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        background: "#EDEFF4",
        color: "#8293A6",
        textTransform: "none",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: "14px",
        lineHeight: "24px",
        marginRight: "8px",
        height: "40px",
        padding: "0 16px",
        opacity: 1,
        borderRadius: "8px",
        "&.Mui-selected, &:focus": {
            background: "#004BFF",
            color: "#fff",
        },
    },
}))((props) => <Tab disableRipple {...props} />);

function Claim() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Navbar
                title={"Claim"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />
            <div className={classes.ClaimPage}>
                {accountContext.account && (
                    <div className={classes.ClaimCard}>
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example"
                        >
                            <StyledTab label="Seed"></StyledTab>
                            <StyledTab label="Private"></StyledTab>
                        </StyledTabs>
                        <div className={classes.ClaimCard__TabPanel}>
                            <div className={classes.ClaimInfo}>
                                <div className={classes.Total}>
                                    <div className={classes.Total__Title}>
                                        Total
                                    </div>
                                    <div className={classes.Total__Content}>
                                        0.00000000
                                    </div>
                                </div>
                                <div className={classes.UnlockProgress}>
                                    <div
                                        className={
                                            classes.UnlockProgress__Title
                                        }
                                    >
                                        Unlock in progress
                                    </div>
                                    <div
                                        className={
                                            classes.UnlockProgress__ProgressBar
                                        }
                                    >
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={50}
                                        />
                                    </div>
                                    <div
                                        className={
                                            classes.UnlockProgress__Value
                                        }
                                    >
                                        18.9123512515%
                                    </div>
                                    <div
                                        className={classes.UnlockProgress__Warn}
                                    >
                                        Your locked $ROOM is worth $508,415.66
                                        <br />
                                        <br />
                                        When this unlocks it will earn you
                                        $464.29 per day for 3 years. The
                                        equivalent of $169,464.10 per year
                                    </div>
                                </div>
                                <div className={classes.ClaimForm}>
                                    <div className={classes.ClaimForm__Input}>
                                        <div
                                            className={
                                                classes.ClaimForm__Input__Label
                                            }
                                        >
                                            Already claimed
                                        </div>
                                        <div
                                            className={
                                                classes.ClaimForm__Input__FieldWrap
                                            }
                                        >
                                            <input
                                                className={
                                                    classes.ClaimForm__Input__Field
                                                }
                                                type={"text"}
                                            />
                                        </div>
                                    </div>
                                    <div className={classes.ClaimForm__Input}>
                                        <div
                                            className={
                                                classes.ClaimForm__Input__Label
                                            }
                                        >
                                            Claimable
                                        </div>
                                        <div
                                            className={
                                                classes.ClaimForm__Input__FieldWrap
                                            }
                                        >
                                            <input
                                                className={
                                                    classes.ClaimForm__Input__Field
                                                }
                                                type={"text"}
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        className={classes.ClaimForm__ClaimBtn}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Claim
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton />
                    </div>
                )}
            </div>
        </>
    );
}

export default Claim;
