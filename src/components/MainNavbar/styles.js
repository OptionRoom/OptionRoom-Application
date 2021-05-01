import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MainNavbar__MenuBtn: {
        marginRight: '15px',
        cursor: 'pointer',
        fill: `${theme.palette.primary.main}`,
        userSelect: 'none',
    },
    MainNavbar: {
        zIndex: '999',
        height: '64px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        borderBottom: '2px solid rgba(133, 133, 133, 0.1)',
        position: 'fixed',
        width: '100%',
        top: 0,
        transition: '0.2s all',
    },
    MainNavbar__IsMin: {
        top: '-64px'
    },
    Logo:{
        marginRight: 'auto',
        userSelect: 'none',

    },
    LogoImg: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        },
    },
    LogoImgMin: {
        display: 'block',
        [theme.breakpoints.up('md')]: {
            display: 'none'
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
        display: 'flex',
        alignItems: 'center',
    },
    AccountHolder: {
        display: 'flex',
    },
    AccountHolder__Image: {
        marginRight: '5px',
    },
    AccountHolder__Image_Image: {
        borderRadius: '50%',
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
    AccountHolderMin: {
        display: 'flex',
        alignItems: 'center',
        '& img': {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            marginRight: '10px'
        },
        '& div': {
            height: '32px',
            padding: '0 20px',
            borderRadius: '16px',
            //backgroundColor: '#000000',
            color: '#FFFFFF',
            fontSize: '16px',
            backgroundColor: '#0093E9',
            backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
            fontWeight: 600,
            letterSpacing: 0,
            lineHeight: '32px',
            border: 'none',
            outline: 'none',
        }
    }
}));
