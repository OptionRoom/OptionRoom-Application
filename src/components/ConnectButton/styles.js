import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    ConnectBtn: {
        height: '32px',
        padding: '0 20px',
        borderRadius: '16px',
        //backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: '15px',
        backgroundColor: theme.colors.primary,
        //backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
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
    },
    ConnectBtn___Black: {
        backgroundColor: '#004BFF',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#004BFF',
            color: '#FFFFFF',
        }
    }
}));
