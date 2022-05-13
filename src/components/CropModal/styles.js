import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '12px'
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
        color: theme.isDark ? "#fff" : '#06293D',
        fontSize: '18px',
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: '24px',
    },
    MuiDialogActions: {
        padding: '24px 24px',
        display: 'flex'
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
    Actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& button': {
            marginLeft: '10px'
        }
    }
}));
