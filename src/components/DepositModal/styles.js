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
        color: '#06293D',
        fontSize: '18px',
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    MuiDialogActions: {
        padding: '24px 24px',
        display: 'flex',
        background: 'rgb(245, 248, 250)'
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
    Modal__Text: {
        color: '#6D8096',
        fontSize: '16px',
        letterSpacing: 0,
        lineHeight: '24px',
        marginBottom: '24px'
    },
    Modal__TokensLabel: {
        color: '#4E5D6D',
        fontSize: '14px',
        letterSpacing: 0,
        lineHeight: '24px',
        marginBottom: '8px'
    },
    Modal__TokensLabel_Balance: {
        fontWeight: 700,
        float: 'right',
        color: '#000'
    },
    MuiDialogContent: {
        padding: '32px 24px',
    }
}));
