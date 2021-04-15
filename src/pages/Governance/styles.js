import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketsPage: {},
    Sidebar: {},
    MarketDetails: {},
    Cat: {
        color: "#6D8096",
        fontFamily: "Poppins",
        fontSize: "18px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
    },
    Title: {
        color: "#171D28",
        fontFamily: "Poppins",
        fontSize: "26px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "32px",

        marginBottom: "24px",
    },
    Info: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        display: "flex",
        marginBottom: "24px",
        justifyContent: "space-between",
    },
    Info__Block: {},
    Info__BlockTitle: {
        color: "#8293A6",
        fontFamily: "Poppins",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "4px",
    },
    Info__BlockValue: {
        color: "#4E5D6D",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
    },
    Graph: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        marginBottom: "24px",
    },
    Graph__Header: {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
    },
    Graph__HeaderTitle: {
        marginRight: "auto",
        color: "#3F4A57",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
    },
    Graph__HeaderNav: {
        display: "flex",
        alignItems: "center",
    },
    Graph__HeaderNavOption: {
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "32px",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "#EDEFF4",
        padding: "0 12px",
        marginLeft: "8px",
        color: "#8293A6",
        transition: "0.2s all",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#004BFF",
            color: "#FFFFFF",
        },
    },
    Graph__HeaderNavOption__Selected: {
        backgroundColor: "#004BFF",
        color: "#FFFFFF",
    },
    Graph__Deatils: {},

    Outcome: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        marginBottom: "24px",
    },
    Outcome__Header: {
        color: "#3F4A57",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    Outcome__Details: {
        display: "flex",
    },
    OutcomeOption: {
        width: "calc(100% - 24px)",
        "&:first-child": {
            marginRight: "48px",
        },
    },
    OutcomeOption__Header: {
        display: "flex",
        alignItems: "center",
        marginBottom: "16px",
        span: {
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
        },
        "& span:first-child": {
            marginRight: "auto",
            color: "#8293A6",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
        },
        "& span:last-child": {
            color: "#4E5D6D",
            fontWeight: 600,
        },
    },
    OutcomeOption__Value: {
        height: "16px",
        borderRadius: "8px",
        position: "relative",
        backgroundColor: "#EDEFF4",
        "& div": {
            position: "absolute",
            top: "0",
            left: "0",
            height: "16px",
            borderRadius: "8px",
        },
    },

    MarketPositions: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        marginBottom: "24px",
    },
    MarketPositions__Header: {
        color: "#3F4A57",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    MarketPositions__Details: {},
    MarketPosition__Block: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EDEFF4",
        padding: "16px 0",
        "& span:first-child": {
            marginRight: "auto",
            color: "#8293A6",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px",
        },
        "& span:last-child": {
            color: "#4E5D6D",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "24px",
            textAlign: "right",
        },
        "&:first-child": {
            paddingTop: "0",
        },
        "&:last-child": {
            borderBottom: "none",
        },
    },

    About: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        marginBottom: "24px",
    },
    About__Header: {
        color: "#3F4A57",
        fontFamily: "Poppins",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "16px",
    },
    About__Details: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
    },

    Resolution: {
        padding: "24px",
        borderRadius: "16px",
        backgroundColor: "#E9EAFF",
        marginBottom: "24px",
    },
    Resolution__Header: {
        color: "#6D8096",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: "8px",
    },
    Resolution__Details: {},
    ResolutionLink: {
        color: "#0042FF",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "24px",
    },

    VoteWidget: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "24px",
    },
    VoteWidget__Header: {
        color: "#3F4A57",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '16px'
    },
    VoteWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4',
        '& >div': {
            display: 'flex',
            '&>div' :{
                 width: '50%'
            }
        }
    },
    VoteWidget__Progress: {
        marginBottom: '23px',
        '&>div' : {
            marginBottom: '16px',
            '&:last-child': {
                marginBottom: 0
            }
        }
    }
}));