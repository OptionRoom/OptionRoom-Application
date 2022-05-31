import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketStateWidget: {
        padding: "29px 0",
    },
    MarketStateWidget__Header: {
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        //textTransform: "uppercase",
       // marginBottom: '27px',
        display: 'flex',
        alignItems: 'center',
    },
    CounterWrapper: {
        display: 'flex',
        marginLeft: '5px',
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
