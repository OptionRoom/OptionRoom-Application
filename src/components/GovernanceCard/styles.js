import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    GovernanceCard: {
       // display: 'flex',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: theme.colors.boxBoxShadow,
    },
/*    AvatarWrap: {
        width: '64px'
    },
    Avatar: {
        borderRadius: '50%',
        height: "48px",
        width: "48px",
        marginTop: '26px',
        background: '#000'
    },
    Details: {
        width: 'calc(100% - 64px)'
    },*/
    Details__Header: {
        display: 'flex',
        marginBottom: '8px'
    },
    Cat: {
        marginRight: 'auto',
        color: "#8293A6",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "16px"
    },
    State: {
        borderRadius: "12px",
        backgroundColor: "#EDEFF4",
        color: "#4E5D6D",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0",
        padding: '2px 8px'
    },
    State__IsActive: {
        backgroundColor: "#2ecc71",
        color: "#fff",
    },
    State__Ended: {
        backgroundColor: "#bdc3c7",
        color: "#fff",
    },
    Resolve: {
        color: "#FFFFFF",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "12px",
        textAlign: "center",
        borderRadius: "16px",
        backgroundColor: "#00B306",
        padding: '0 8px'
    },
    Title: {
        color: "#212529",
        fontSize: "18px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "28px",
        marginBottom: '8px'
    },
    Description: {
        color: theme.colors.secondaryTxt,
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",

        marginBottom: '24px'
    },
    Details__Footer: {
/*        display: 'flex',
        alignItems: 'center'*/
    },
    Dates: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    PostedDate: {
        marginRight: 'auto',
        color: "#8293A6",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "16px"
    },
    EndDate: {
        color: "#8293A6",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "16px"
    },
    PostedDate__Title: {

    },
    PostedDate__Value: {

    },
    Options: {
        display: 'flex'
    },
    Option: {
        marginRight: '24px',
        '&:last-child': {
            marginRight: '0'
        }
    },
    Option__Title: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px"
    },
    Option__Value: {
        borderRadius: "12px",
        backgroundColor: "#EDEFF4",
        color: "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginLeft: '8px',
        padding: '0 8px'
    },
    Option__ValueYes: {
        backgroundColor: "#89da8e",
        color: "#fff",
    },
    Option__ValueNo: {
        backgroundColor: "#7284ff",
        color: "#fff",
    },
}));
