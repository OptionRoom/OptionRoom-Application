import {makeStyles, useTheme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    RoomLpStake: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
        //borderRadius: '50%',
        //background: '#004BFF',
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
    EarnCard__Action__Btn_Add__Icon: {
        width: '29px',
        height: '29px'
    },
    EarnCard__Action__Btn_Add: {
        width: '56px',
    },
}));
