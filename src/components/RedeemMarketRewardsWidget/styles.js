import {makeStyles} from '@material-ui/core/styles';
import RedeemMarketRewardsWidget from "./index";

export const useStyles = makeStyles((theme) => ({
    RedeemMarketRewardsWidget: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "24px",
    },
    RedeemMarketRewardsWidget__Header: {
        color: "#3F4A57",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '16px',
        fontSize: "15px",
        fontWeight: 600,
    },
    RedeemMarketRewardsWidget__Content: {
        marginBottom: '16px',
    }
}));
