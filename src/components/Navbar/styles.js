import {makeStyles, useTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '55px'
    },
    Title: {
        marginRight: 'auto',
        maxWidth: '500px'
    },
    Title__Head: {
        fontSize: '28px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '32px',
        marginBottom: '8px'
    },
    Title__Head___Black: {
        color: '#fff'
    },
    Title__Details: {
        color: '#6D8096',
        fontSize: '18px',
        letterSpacing: 0,
        lineHeight: '24px',
    },
    AccountHolder: {
        display: 'flex'
    },
    AccountHolder__Image: {
        marginRight: '5px',
    },
    AccountHolder__Image_Image: {
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'block'
    },
    AccountHolder__Details: {
        fontSize: '14px'
    },
    AccountHolder__Details__Disconnect: {
        fontSize: '12px',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    AccountHolder__Details__Disconnect__Black: {
        color: "#fff"
    },
    AccountHolder__Details__Address___Black: {
        color: "#fff"
    }
}));
