import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    NftPage: {
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
        marginBottom: '44px',
        textAlign: 'center'
    },
    FirstNft__ImageWrap__Img: {
        width: '207px'
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
        width: '800px',
        margin: '0 auto'
    },
    UpgradeNft__Card: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        backgroundColor: '#000',
        boxShadow: '0 0 30px 0 rgba(0,75,255,0.35)',
        padding: '24px 64px',
        marginBottom: '32px',
        justifyContent: 'space-between'
    },
    UpgradeNft__Card__Arrow__Wrap: {
        height: '64px',
        width: '64px',
        backgroundColor: '#000080',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    UpgradeNft__Card__Arrow: {
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
        width: '400px',
        margin: '0 auto'
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
        fontSize: '28px',
        letterSpacing: 0,
        lineHeight: '40px',
        textAlign: 'center',
        fontWeight: 600,
        borderRadius: '12px',
        marginBottom: '40px'
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
    EarnCard__Action__Btn: {
    },
    EarnCard__Action__Btn_Add__Icon: {
        width: '29px',
        height: '29px'
    },
    EarnCard__Action__Btn_Add: {

    },

    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    }

}));
