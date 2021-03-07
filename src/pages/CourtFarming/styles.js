import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {},
    Pools: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
    },
    Pool: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "40px 16px 24px",
        width: "288px",
        marginBottom: "30px",
    },
    Pool__IconWrap: {
        height: "128px",
        marginBottom: "40px",
        "& $Pool__IconWrap": {
            width: "128px",
            height: "128px",
            borderRadius: "50%",
            background: "#E9EAFF",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& img": {
                width: "96px",
            },
        },
    },
    Pool__IconWrap__Two: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& $Pool__IconWrap": {
            width: "96px",
            height: "96px",
            "& img": {
                width: "72px",
            },
        },
    },
    Pool__Title: {
        color: "#212529",
        fontSize: "20px",
        letterSpacing: 0,
        lineHeight: "24px",
        textAlign: "center",
        marginBottom: "40px",
    },
    Pool__Action: {},
    Pool__Action__Link: {
        textDecoration: "none",
    },

    ConnectWrap: {
        textAlign: "center",
        padding: "100px 0",
    },
}));
