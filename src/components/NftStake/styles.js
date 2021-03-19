import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Stats: {
        textAlign: "center",
        color: "#fff",
        marginBottom: "20px",
        fontSize: "25px"
    },
    IsInitingWrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: '100px 0'
    },
    StakeCards: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    ///
    EarnCard: {
        borderRadius: '16px',
        backgroundColor: '#000',
        boxShadow: '0 0 20px 0 #E6EDFF',
        padding: '40px 16px 24px',
        marginBottom: '35px',
        [theme.breakpoints.up('md')]: {
            marginBottom: '0',
            marginRight: '48px',
            width: '288px',
            '&:last-child': {
                marginRight: '0',
            }
        },
    },
    EarnCard__Icon: {
        width: '64px',
        height: '64px',
        margin: '0 auto 40px'
    },
    EarnCard__Title: {
        color: '#fff',
        fontWeight: 600,
        fontSize: '36px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '8px',
    },
    EarnCard__SubTitle: {
        color: '#6D8096',
        fontSize: '16px',
        letterSpacing: 0,
        lineHeight: '56px',
        textAlign: 'center',
    },
    EarnCard__Action: {},
    EarnCard__Action_Two: {
        display: 'flex',
        '&>button:first-child': {
            width: 'calc(100% - 64px)',
            marginRight: '8px'
        }
    },
    EarnCard__Action__Btn_Add__Icon: {
        width: '29px',
        height: '29px'
    },
    EarnCard__Action__Btn_Add: {
        width: '56px',
        backgroundColor: '#fff !important',
        color: "#000"
    },
    NftImgWrap: {
        marginBottom: '45px',
        textAlign: 'center',
        '& img' :{
            boxShadow: '0 0 30px 0 rgba(0,75,255,0.35)',
            width: '230px',
            borderRadius: '16px',
            display: 'block',
            overflow: 'hidden',
            margin: '0 auto'
        }
    },
    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    },
    buyNftWrap: {
        textAlign: 'center',
        padding: '50px 0'
    },
    buyNft: {
        textDecoration: 'none',
        padding: '20px 30px',
        display: 'inline-block',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        textTransform: 'none',
        backgroundColor: '#004BFF',
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: '#004BFF',
            color: '#FFFFFF',
        }
    }
}));
