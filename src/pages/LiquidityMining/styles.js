import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {},
    Pools: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Pool: {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        padding: '40px 16px 24px',
        marginRight: '48px',
        width: '288px',
        '&:last-child': {
            marginRight: '0',
        }
    },
    Pool__Icon: {
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        background: '#004BFF',
        marginBottom: '40px',
        margin: '0 auto'
    },
    Pool__Title: {
        color: '#212529',
        fontSize: '20px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '40px',
    },
    Pool__Action: {},
    Pool__Action__Btn: {
        width: '100%',
        borderRadius: '12px',
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        height: '56px'
    },
    ///
    EarnCard: {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        padding: '40px 16px 24px',
        marginRight: '48px',
        width: '288px',
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
        color: '#000000',
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
        marginBottom: '40px',
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
        width: '100%',
        borderRadius: '12px',
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        height: '56px',
    },
    EarnCard__Action__Btn__Disabled: {
        backgroundColor: '#D2D9E1 !important',
        color: '#FFFFFF !important'
    },
    EarnCard__Action__Btn_Add__Icon: {
        width: '29px',
        height: '29px'
    },
    EarnCard__Action__Btn_Add: {
        borderRadius: '12px',
        fontSize: '20px',
        height: '56px',
        backgroundColor: '#000',
        color: '#FFFFFF !important',
        boxShadow: 'none',
        width: '56px',
        '&:hover': {
            backgroundColor: '#000',
            color: '#FFFFFF !important',
        }
    }
}));
