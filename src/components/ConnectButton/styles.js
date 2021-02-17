import {makeStyles, useTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    ConnectBtn: {
        height: '48px',
        //width: '160px',
        borderRadius: '12px',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#000000',
            color: '#FFFFFF',
        }
    }
}));
