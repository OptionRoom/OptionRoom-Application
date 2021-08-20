import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LoadingWrapper: {
        padding: "100px",
        textAlign: "center",
    },
    ConnectWrap: {
        padding: "100px",
        textAlign: "center",
    },
    ChainWrap: {
        padding: '50px'
    },
    MarketsPage: {
        padding: '20px'
    },
    MarketsPage__Title: {
        margin: '0 0 50px'
    },
    MarketsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    MarketCard: {
        filter: "drop-shadow(3px 3px 0px #2E6AFA)",
        boxShadow: "0px 2px 20px rgba(95, 140, 182, 0.05)",
        borderRadius: "10px",
        background: theme.isDark ? "#242D38" : "#fff",
        textDecoration: "none",
        display: "flex",
        alignItems: 'center',
        padding: '10px',
        marginBottom: '30px'
    },
    AvatarTitle: {
        display: "flex",
        alignItems: 'center',
        marginRight: 'auto'
    },
    Avatar: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        marginRight: '10px'
    },
    Title: {
        maxWidth: '200px',
    },
    Block: {
        marginLeft: '15px',
        textAlign: 'center'
    },
    BlockTitle: {
      marginBottom: '5px'
    },
    BlockValActions: {
        display: "flex",
        alignItems: 'center',
        '& button': {
            marginLeft: '5px'
        }
    }
}));
