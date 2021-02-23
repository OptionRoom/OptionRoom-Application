import {makeStyles, useTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        [theme.breakpoints.up('md')]: {
            marginBottom: '55px'
        },
        marginBottom: '20px'
    },
    Title: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            marginRight: 'auto',
            maxWidth: '500px',
            width: 'auto',
        },
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
    Actions: {
        width: '100%',
        order: -1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            order: 1,
            width: 'auto',
        },
    },
    MenuBtn: {
        background: '#000',
        color: "#fff",
        borderRadius: '5px',
        width: '36px',
        height: '36px',
        marginRight: 'auto',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
    },
    MenuBtn___Black: {
        color: "#004BFF",
        background: '#fff',
    },
    AccountHolder: {
        display: 'flex',
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
