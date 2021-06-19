import {makeStyles} from '@material-ui/core/styles';
import RedeemMarketRewardsWidget from "./index";

export const useStyles = makeStyles((theme) => ({
    MarketOutcome: {
        padding: "29px 35px",
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        marginBottom: "22px",
    },
    MarketOutcomeHeader: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center'
    },
    MarketOutcomeHeader__Val: {
        marginRight: 'auto'
    },
    MarketOutcomeHeader__Progress: {
        display: 'flex'
    },
    OutcomeBlock: {
        marginLeft: '10px',
        display: 'flex',
        [theme.breakpoints.up("md")]: {
            marginLeft: '47px',
        },
    },
    OutcomeBlock__Chart: {
        marginRight: '9px'
    },
    OutcomeBlock__Val: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "32px",
        color: theme.isDark ? "#fff" : "#36414B",
        [theme.breakpoints.up("md")]: {
            fontSize: "25px",
        },
    }
}));
