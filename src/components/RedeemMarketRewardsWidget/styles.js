import {makeStyles} from '@material-ui/core/styles';
import RedeemMarketRewardsWidget from "./index";

export const useStyles = makeStyles((theme) => ({
    RedeemMarketRewardsWidget: {
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    RedeemMarketRewardsWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    RedeemMarketRewardsWidget__Content: {
        marginBottom: '16px',
    },
    Yes: {
        display: 'inline-block',
        borderRadius: "12px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        padding: '0 8px',
        background: '#86DC8B'
    },
    No: {
        display: 'inline-block',
        borderRadius: "12px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        padding: '0 8px',
        background: '#7084FF'
    },
}));
