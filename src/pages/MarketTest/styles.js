import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    ClaimPage: {},
    Section: {
        border: "1px solid gray",
        borderRadius: '15px',
        overflow: 'hidden',
        marginBottom: '15px'
    },
    Section__Name: {
        padding: "15px",
        color: "#fff",
        background: "blue",
    },
    Section__Content: {
        padding: '15px'
    }
}));
