import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    RoomLpStake: {},
    Info: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        lineHeight: "23px",
        color: "#3D4043",
        marginBottom: "29px",
        "& span": {
            color: "#004BFF"
        },
        "&>div": {
            marginBottom: '5px'
        }
    },
    RoomLpStake__Cards: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            /*            alignItems: 'center',
                        justifyContent: 'center',*/
        },
    },
    ///
    EarnCard: {
        borderRadius: '16px',
        backgroundColor: '#fff',
        filter: "drop-shadow(3px 3px 0px #2E6AFA)",
        boxShadow: "0px 2px 20px rgba(95, 140, 182, 0.05)",
        padding: '40px 16px 24px',
        marginBottom: '20px',
        [theme.breakpoints.up('md')]: {
            width: '288px',
            marginBottom: '0',
            marginRight: '20px',
            '&:last-child': {
                marginRight: '0',
            },
        },
        minHeight: "326px"
    },
    EarnCard__Icon: {
        width: '64px',
        height: '64px',
        //borderRadius: '50%',
        //background: '#004BFF',
        margin: '0 auto 40px'
    },
    EarnCard__Title: {
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "30px",
        lineHeight: "38px",
        letterSpacing: "0.01em",
        color: "#141516",
        textAlign: 'center',
        marginBottom: '10px',
    },
    EarnCard__SubTitle: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.01em",
        color: "#36414B",
        textAlign: 'center',
        marginBottom: '40px',
    },
    EarnCard__SubTitleIncv: {
        fontSize: '12px',
    },
    EarnCard__Action: {
        textAlign: 'center'
    },
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
    },

    //IncvEarnCard
    IncvEarnCard: {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: theme.colors.boxBoxShadow,
        padding: '40px 16px 24px',
        marginBottom: '20px',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            width: '400px',
            marginBottom: '0',
            marginRight: '48px',
            '&:last-child': {
                marginRight: '0',
            },
        },
    },
    IncvEarnCard__Blocks: {
        //display:'flex',
        //alignItems:'center'
    },
    IncvEarnCard__Block: {
        padding: '20px 10px',
        // borderRadius: '5px',
        '&>button': {
            width: '100%',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            '&>div:first-child': {
                width: 'calc(60% - 10px)',
                marginRight: '10px'
            },
            '&>button': {
                width: '40%',
            }
        },
    },
    IncvEarnCard__Block__Tokens: {
        color: '#000000',
        fontWeight: 600,
        fontSize: '36px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '8px',
    },
    IncvEarnCard__Block__Desc: {
        color: theme.colors.secondaryTxt,
        fontSize: '12px',
        letterSpacing: 0,
        textAlign: 'center',
        marginBottom: '10px',
    },
    IncvEarnCard__Icon: {
        width: '64px',
        height: '64px',
        //borderRadius: '50%',
        //background: '#004BFF',
        margin: '0 auto 20px'
    },
    EarnCard__PayNote: {
        color: 'rgb(230 0 122)',
        fontSize: '12px',
        letterSpacing: 0,
        textAlign: 'center',
        fontWeight: 700,
        margin: '15px 0 0 0',
    }
}));
