import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    ClaimPage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px'
    },
    ClaimCard: {
        padding: '40px',
        maxWidth: "600px",
        background: theme.isDark ? "#242D38" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px"
    },
    ClaimCard__TabPanel: {
        marginTop: '27px'
    },
    tableWrap: {
      marginBottom: '30px'
    },
    Total: {
        position: 'relative',
        marginBottom: '42px'
    },
    Total__Title: {
        top: "0",
        left: "50%",
        color: "#818B95",
        position: "absolute",
        fontSize: "15px",
        transform: "translate(-50%, -50%)",
        fontStyle: "normal",
        fontWeight: "normal",
        lineHeight: "19px",
        padding: "0 20px",
        background: theme.isDark ? "#242D38" : "#fff",
    },
    Total__Content: {
        background: theme.isDark ? "#242D38" : "#fff",
        border: "1px solid #BFD1E1",
        borderRadius: "15px",
        padding: '23px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40px",
        lineHeight: "26px",
        letterSpacing: "-0.05em",
        color: theme.isDark ? "#fff" : "#36414B",
        '& span': {
            marginLeft: '10px'
        }
    },
    UnlockProgress: {
        margin: "0 0 21px",
    },
    UnlockProgress__Title: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '18px',
        '&>div:first-child': {
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "20px",
            color: "#818B95",
            marginRight: 'auto'
        }
    },
    UnlockProgress__Value: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "17px",
        lineHeight: "22px",
        textAlign: "right",
        color: "#36414B"
    },
    UnlockProgress__ProgressBar: {
        marginBottom: "24px",
    },

    UnlockProgress__Warn: {
        background: "#F5F9FE",
        border: "1px dashed #BFD1E1",
        boxSizing: "border-box",
        borderRadius: "7px",
        padding: '17px 21px',
        textAlign: 'center',
        marginBottom: '23px'
    },
    ClaimDetails: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '23px',
        '&>div': {
            width: 'calc(50% - 8px)',
            '&:first-child': {
                marginRight: '16px',
            },
            '&>div:first-child': {
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "20px",
                color: "#818B95",
                marginBottom: '8px'
            },
            '&>div:last-child': {
                background: "rgba(237, 241, 245, 0.8)",
                //opacity: 0.8,
                borderRadius: "10px",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "15px",
                lineHeight: "19px",
                color: "#818B95",
                padding: '16px 21px'
            },
        }
    },
    RewardsPool: {
        display: 'flex',
        marginBottom: '5px',
        alignItems: 'center',
        paddingBottom: '5px',
        borderBottom: '1px solid #BFD1E1'
    },
    RewardsPoolTitle: {
        width: '150px',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#818B95",
        marginRight: '10px'
    },
    RewardsPoolAmount: {
        background: "rgba(237, 241, 245, 0.8)",
        //opacity: 0.8,
        borderRadius: "10px",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "15px",
        lineHeight: "19px",
        color: "#818B95",
        padding: '16px 21px',
        marginRight: '10px'
    },
    ClaimForm__ClaimBtnWrap: {
      textAlign: 'center'
    },
    ConnectWrap: {
        textAlign: "center",
        padding: "100px 0",
    },
}));
