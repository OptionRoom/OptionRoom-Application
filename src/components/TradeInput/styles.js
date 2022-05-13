import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    TradeInput: {
        position: "relative",
        marginBottom: '10px',
    },
    Input: {
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
    InputWrapper: {
        position: "relative",
    },
    BuySellWidgetAmount__InputFieldError: {
        border: "1px solid red !important",
    },
    SelectedToken: {
        top: "50%",
        right: "12px",
        display: "flex",
        position: "absolute",
        alignItems: "center",
        transform: "translateY(-50%)",
        padding: "5px 7px",
        background: "#ddd",
        borderRadius: "10px",
        cursor: 'pointer'
    },
    SelectedToken__TokenImg: {
        width: '20px',
        height: '20px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '50%',
        marginRight: '5px'
    },
    SelectedToken__TokenSymbol: {
        fontSize: '14px',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginRight: '5px'
    }
}));
