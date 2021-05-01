import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    NftPage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px',
        position: 'relative'
    },
    Stats: {
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            top: '100px',
            left: '0',
        },
        maxWidth: '200px',
        padding: '20px 0',
        background: '#000',
        borderRadius: '5px',
        margin: "0 auto 30px",
        color: "#5c636d",
        '& div': {
            padding: '5px 10px',
            '&>span:first-child': {
                width: '100px',
                display: 'inline-block'
            },
            '&>span>span': {
                display: 'inline-block',
                fontWeight: 700,
                marginLeft: '5px'
            },
            '&:nth-child(2n+1)': {
                background: '#111216'
            },
            '&>span:last-child span': {
                color: '#fff'
            },
        }
    },
    IsInitingWrap: {
        display: 'flex',
        justifyContent: 'center',
        padding: '100px 0'
    },
    //First
    FirstNft: {
        width: '300px',
        margin: '0 auto'
    },
    FirstNft__ImageWrap: {
        marginBottom: '20px',
        textAlign: 'center'
    },
    FirstNft__ImageWrap__Img: {
        width: '207px'
    },
    FirstNft__Remaining: {
        color: '#FFF',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '20px',
        fontWeight: 900,
    },
    FirstNft__GetBtn: {
        width: '160px',
        margin: '0 auto 16px',
        display: 'block'
    },
    FirstNft__Note: {
        color: '#6D8096',
        fontSize: '14px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center'
    },
    //Upgrade
    UpgradeNft: {
        [theme.breakpoints.up('md')]: {
            width: '800px',
            margin: '0 auto',
        },
    },
    UpgradeNft__Card: {
        borderRadius: '16px',
        backgroundColor: '#000',
        boxShadow: '0 0 30px 0 rgba(0,75,255,0.35)',
        padding: '15px',
        marginBottom: '32px',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 64px',
        },
    },
    UpgradeNft__Card__Arrow__Wrap: {
        height: '64px',
        width: '64px',
        backgroundColor: '#000080',
        borderRadius: '50%',
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.up('md')]: {
            margin: '0',
            '& $UpgradeNft__Card__Arrow': {
                display: 'block'
            },
            '& $UpgradeNft__Card__Arrow__Down': {
                display: 'none'
            },
        },
    },
    UpgradeNft__Card__Arrow: {
        fill: '#fff',
        fontSize: '50px',
        display: 'none'
    },
    UpgradeNft__Card__Arrow__Down: {
        fill: '#fff',
        fontSize: '50px'
    },
    UpgradeNft__ImageWrap: {
        textAlign: 'center'
    },
    UpgradeNft__ImageWrap__Note: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '24px'
    },
    UpgradeNft__ImageWrap__Img: {
        width: '207px',
        transition: '0.5s all',
        '&:hover': {
            boxShadow: '0 0 2px 0px #fff, 0 0 0px 0px #eff, 0 0 130px 14px #004bff'
        }
    },
    UpgradeNft__Remaining: {
        color: '#FFF',
        textAlign: 'center',
        margin: '20px 0 0',
        fontSize: '20px',
        fontWeight: 900,
        flex: '100%'
    },
    UpgradeNft__GetBtn: {
        width: '160px',
        margin: '0 auto 16px',
        display: 'block'
    },
    UpgradeNft__Note: {
        color: '#6D8096',
        fontSize: '14px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center'
    },
    //Last
    LastNft: {
        [theme.breakpoints.up('md')]: {
            width: '400px',
            margin: '0 auto',
        },
    },
    LastNft__ImageWrap: {
        width: '282px',
        borderRadius: '19.26px',
        background: 'linear-gradient(154.44deg, #FFFFFF 0%, #FF9300 47.71%, #020101 100%)',
        textAlign: 'center',
        padding: '5px',
        overflow: 'hidden',
        margin: '0 auto',
        boxShadow: '0 0 36px 0px #fff, 0 0 0px 0px #ffffff, 0 0 167px 37px #ff9300'

    },
    LastNft__ImageWrap__Img: {
        width: '100%',
        borderRadius: '19.26px',
        overflow: 'hidden',
        display: 'block',
    },
    LastNft__Note: {
        color: '#fff',
        fontSize: '20px',
        letterSpacing: 0,
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: '20px',
        [theme.breakpoints.up('md')]: {
            marginBottom: '40px',
            fontSize: '28px',
            letterSpacing: 0,
            lineHeight: '40px',
        },
    },
    ///
    StakeWrap: {
        margin: '45px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    EarnCard: {
        borderRadius: '16px',
        backgroundColor: '#000',
        padding: '40px 16px 24px',
        marginRight: '48px',
        width: '288px',
        boxShadow: '0 0 30px 0 rgba(0,75,255,0.35)',
        '&:last-child': {
            marginRight: '0',
        }
    },
    EarnCard__Icon: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#004BFF',
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
        textAlign: 'center',
        marginBottom: '16px',
    },
    EarnCard__Action: {},
    EarnCard__Action_Two: {
        display: 'flex',
        '&>button:first-child': {
            width: 'calc(100% - 64px)',
            marginRight: '8px'
        }
    },
    EarnCard__Action__Btn: {},
    EarnCard__Action__Btn_Add__Icon: {
        width: '29px',
        height: '29px'
    },
    EarnCard__Action__Btn_Add: {},

    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    }

}));
