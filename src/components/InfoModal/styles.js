import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: "12px",
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    MuiDialogTitle: {
        borderBottom: "1px solid #EDEFF4",
        padding: "24px 24px",
    },
    DialogTitle: {
        color: "#06293D",
        fontSize: "18px",
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: "24px",
    },
    MuiDialogActions: {
        padding: "24px 24px",
        display: "flex",
    },
    MuiDialogActions__CancelBtn: {
        marginRight: "auto",
    },
    MuiDialogActions__ConfirmBtn: {},
    MuiDialogActions__ConfirmBtn__Inner: {
        display: "flex",
        alignItems: "center",
    },
    MuiDialogActions__ConfirmBtn__CircularProgress: {
        marginRight: "5px",
        color: "rgba(0, 0, 0, 0.26)",
    },
    Modal__Text: {
        color: "#6D8096",
        fontSize: "16px",
        letterSpacing: 0,
        lineHeight: "24px",
        marginBottom: "24px",
    },
    Modal__TokensLabel: {
        color: "#4E5D6D",
        fontSize: "14px",
        letterSpacing: 0,
        lineHeight: "24px",
        marginBottom: "8px",
    },
    Modal__TokensLabel_Balance: {
        fontWeight: 700,
        float: "right",
        color: "#000",
    },
    Modal__TokensInputWrap: {
        position: "relative",
    },
    Modal__TokensInputMaxBtn: {
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
        color: "#004BFF",
        cursor: "pointer",
        textDecoration: "underline",
        fontWeight: 700,
        letterSpacing: "1px",
    },
    Modal__TokensInput: {
        border: "1px solid #D2D9E1",
        borderRadius: "8px",
        fontSize: "14px",
        letterSpacing: 0,
        lineHeight: "14px",
        padding: "16.5px 50px 16.5px 16.5px",
        display: "block",
        width: "100%",
        outline: "none",
    },
    Modal__TokensInput__HasError: {
        border: "1px solid red",
    },
    Modal__TokensErrorHelp: {
        color: "red",
        margin: "10px 0",
    },
    MuiDialogContent: {
        padding: "32px 24px",
    },
    GetTokenWrap: {
        textAlign: 'center'
    }
}));
