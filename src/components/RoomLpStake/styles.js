import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    RoomLpStake: {

    },
    Info: {
      textAlign: 'center',
      fontSize: "20px",
      color: theme.colors.txtColor,
      marginBottom: "20px",
        "& span": {
          color: "#004BFF"
        }
    },
    RoomLpStake__Cards: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    ///
    EarnCard: {
        borderRadius: '16px',
        backgroundColor: theme.colors.boxBg,
        boxShadow: theme.colors.boxBoxShadow,
        padding: '40px 16px 24px',
        marginBottom: '20px',
        [theme.breakpoints.up('md')]: {
            width: '288px',
            marginBottom: '0',
            marginRight: '48px',
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
        color: theme.colors.txtColor,
        fontWeight: 600,
        fontSize: '36px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '15px',
    },
    EarnCard__SubTitle: {
        color: '#6D8096',
        fontSize: '16px',
        letterSpacing: 0,
        textAlign: 'center',
        marginBottom: '40px',
    },
    EarnCard__SubTitleIncv: {
        fontSize: '12px',
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
        color: '#6D8096',
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
}));
