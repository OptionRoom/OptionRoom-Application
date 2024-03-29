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
        alignItems: 'center'
    },
    OutcomeBlock__Square: {
        width: '10px',
        height: '10px',
        backgroundColor: '#000',
        marginRight: '5px'
    }
}));
