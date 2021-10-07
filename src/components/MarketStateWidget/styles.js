import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketStateWidget: {
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    MarketStateWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginBottom: '27px',
    },
    CounterWrapper: {
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        '&>div': {
            marginRight: '10px'
        },
        '&>div>span:first-child': {
            fontSize: '20px',
            marginRight: '2px'
        }
    }
}));
