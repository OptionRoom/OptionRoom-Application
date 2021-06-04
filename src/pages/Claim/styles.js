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
        maxWidth: "500px",
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px"
    },
    ClaimCard__TabPanel: {
        marginTop: '27px'
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
        background: "#fff"
    },
    Total__Content: {
        background: "#FFFFFF",
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
        color: "#36414B",
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
                background: "#EDF1F5",
                opacity: 0.8,
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
    ConnectWrap: {
        textAlign: "center",
        padding: "100px 0",
    },
}));
