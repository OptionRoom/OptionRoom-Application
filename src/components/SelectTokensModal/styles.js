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
    SearchWrapper: {
        '&>input': {
            border: `1px solid ${theme.colors.inputBorder}`,
            borderRadius: "8px",
            backgroundColor: theme.isDark ? "#353F4D": "#EDF1F5",
            display: 'block',
            width: '100%',
            color: theme.isDark ? "#fff" : "#000",
            fontSize: "14px",
            letterSpacing: "0",
            //lineHeight: "14px",
            padding: '16.5px',
            outline: 'none',
            maxWidth: '100%',
        }
    },
    TokensList:{
        height: '390px',
        overflow: 'auto'
    },
    Token: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '10px 10px 10px 10px',
        cursor: 'pointer',
        transition: '0.2s all',
        '&:hover': {
            background: '#f4f4f4'
        }
    },
    Token__Img:{
        width: '24px',
        height: '24px',
        marginRight: '10px',
        '&>img':{
            width: '100%',
            borderRadius: '50%'
        }
    },
    Token__NameSymbol:{
        marginRight: 'auto',
    },
    Token__Symbol:{
        fontSize: '16px',
        fontWeight: '700'
    },
    Token__Name:{
        fontSize: '12px'
    },
    UserVal:{
        fontSize: '16px',
    },
    LoadingWrap: {
        fontSize: '10px'
    }
}));
