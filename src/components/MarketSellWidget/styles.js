import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '12px',
        minWidth: "400px"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    MuiDialogTitle: {
        borderBottom: '1px solid #EDEFF4',
        padding: '24px 24px'
    },
    DialogTitle: {
        color: theme.isDark ? '#fff' : "#06293D",
        fontSize: '18px',
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    MuiDialogActions: {
        padding: '24px 24px',
        display: 'flex',
        background: theme.isDark ? '#000' : 'rgb(245, 248, 250)'
    },
    MuiDialogActions__CancelBtn: {
        marginRight: 'auto',
    },
    MuiDialogActions__ConfirmBtn: {
    },
    MuiDialogActions__ConfirmBtn__Inner: {
        display: 'flex',
        alignItems: 'center'
    },
    MuiDialogActions__ConfirmBtn__CircularProgress: {
        marginRight: '5px',
        color: 'rgba(0, 0, 0, 0.26)'
    },
    MuiDialogContent: {
        padding: '32px 24px',
    },
    BuySellWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4'
    },
    BuySellWidgetAmount: {
        marginBottom: "16px",
    },
    BuySellWidgetAmount__Header: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
        display: 'flex',
        alignItems: 'center',
        '&>span:first-child': {
            marginRight: 'auto'
        }
    },
    BuySellWidgetAmount__InputWrap: {
        position: "relative",
        marginBottom: '10px',

    },
    BuySellWidgetInfo: {},
    BuySellWidgetInfo__Row: {
        display: "flex",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid #EDEFF4",
        "&:last-child": {
            borderBottom: 'none'
        }
    },
    BuySellWidgetInfo__RowTitle: {
        color: theme.isDark ? "#fff" : "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginRight: "auto",
    },
    BuySellWidgetInfo__RowValue: {
        color: theme.isDark ? "#fff" : "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        textAlign: "right",
    },
}));
