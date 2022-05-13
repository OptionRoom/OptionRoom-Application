import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    ProposalPage: {
        margin: "0 auto", padding: "50px 15px", maxWidth: "1200px"
    },
    Sidebar: {},
    MarketDetails: {},
    Cat: {
        color: theme.colors.secondaryTxt,
        fontSize: "18px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
    },
    Title: {
        color: "#171D28",
        fontSize: "26px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "32px",
        marginBottom: "24px",
    },
    About: {
        padding: "29px 35px",
        background: theme.isDark ? "#252E39" : "#fff",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        marginBottom: "22px",
    },
    About__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '18px'
    },
    About__Details: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "18px",
        lineHeight: "23px",
        color: theme.isDark ? "#BFD1E1" : "#36414B"
    },
    LoadingWrapper: {
        padding: "100px 0",
        textAlign: "center",
    },
    ConnectWrap: {
        padding: "100px",
        textAlign: "center",
    },
}));
