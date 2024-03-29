import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    ClaimPage: {},
    ClaimCard: {
        maxWidth: '600px',
        margin: '0 auto',
        borderRadius: '16px',
        boxShadow: '0 0 20px 0 #E6EDFF'
    },
    ClaimCard__TabPanel: {
        padding: '32px 0'
    },
    Total: {
        margin: '0 24px 40px',
        borderRadius: '16px',
        backgroundColor: '#E9EAFF',
        padding: '24px',
    },
    Total__Title: {
        color: theme.colors.secondaryTxt,
        fontSize: '16px',
        letterSpacing: '0',
        lineHeight: '24px',
        marginBottom: '7px'
    },
    Total__Content: {
        color: '#004BFF',
        fontSize: '46px',
        fontWeight: 'bold',
        letterSpacing: 0,
        lineHeight: '24px'
    },
    UnlockProgress: {
        margin: '0 48px 32px',
    },
    UnlockProgress__Title: {
        fontSize: '20px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        color: theme.colors.secondaryTxt,
        marginBottom: '24px'
    },
    UnlockProgress__ProgressBar: {
        marginBottom: '24px'
    },
    UnlockProgress__Value: {
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center'
    },
    ClaimForm: {
        borderTop: '1px solid #EDEFF4',
        padding: '24px 24px 0'
    },
    ClaimForm__Input: {
        margin: '0 24px 16px'
    },
    ClaimForm__Input__Label: {
        fontSize:'14px',
        letterSpacing: 0,
        lineHeight: '24px',
        color: '#4E5D6D',
        marginBottom: '8px'
    },
    ClaimForm__Input__FieldWrap: {

    },
    ClaimForm__Input__Field: {
        border: '1px solid #D2D9E1',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        width: '100%',
        display: 'block',
        outline: 'none',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '14px',
        padding: '16px'
    },
    ClaimForm__ClaimBtn: {
        width: '100%',
        borderRadius: '12px',
        fontSize: '20px',
        lineHeight: '24px',
        height: '56px'
    }
}));
