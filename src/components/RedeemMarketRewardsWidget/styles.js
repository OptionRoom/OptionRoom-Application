import {makeStyles} from '@material-ui/core/styles';
import RedeemMarketRewardsWidget from "./index";

export const useStyles = makeStyles((theme) => ({
    RedeemMarketRewardsWidget: {
        borderRadius: "16px",
        backgroundColor: theme.colors.boxBg,
        boxShadow: theme.colors.boxBoxShadow,
        padding: "24px",
    },
    RedeemMarketRewardsWidget__Header: {
        color: theme.isDark ? "#fff" : "#3F4A57",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '16px',
        fontSize: "15px",
        fontWeight: 600,
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
