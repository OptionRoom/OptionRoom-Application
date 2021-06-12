import {makeStyles} from '@material-ui/core/styles';
import RedeemMarketRewardsWidget from "./index";

export const useStyles = makeStyles((theme) => ({
    MarketPositions: {
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        marginBottom: "22px",
    },
    MarketPositionsHeader: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        padding: "29px 35px 0",
    },
    MarketPositionBlock: {
        padding: "0 35px 0",
        borderBottom: "5px solid #EDEFF4",
        marginBottom: '15px',
        '&:last-child': {
            borderBottom: "none",
            marginBottom: 0,
        }
    },
    MarketPosition__Block: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EDEFF4",
        padding: "16px 0",
        "& span:first-child": {
            marginRight: "auto",
            color: theme.isDark ? "#fff" : "#8293A6",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
        },
        "& span:last-child": {
            color: theme.isDark ? "#fff" : "#4E5D6D",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "24px",
            textAlign: "right",
        },
        "&:first-child": {
            paddingTop: "0",
        },
        "&:last-child": {
            borderBottom: "none",
        },
    },
}));
