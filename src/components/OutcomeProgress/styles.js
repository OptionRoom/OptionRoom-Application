import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    OutcomeOption: {
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
    },
    OutcomeOption__HeaderCount: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
    },
    OutcomeOption__HeaderPercent: {
        color: "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginLeft: '5px'
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
}));
