import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    TradeInput: {
        position: "relative",
        marginBottom: '10px',
        "& input": {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            display: "block",
            width: "100%",
            color: "#99A6B7",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "14px",
            padding: "16.5px",
            outline: "none",
            boxShadow: "none",
        },
    },
    BuySellWidgetAmount__InputFieldError: {
        border: "1px solid red !important",
    },
}));
