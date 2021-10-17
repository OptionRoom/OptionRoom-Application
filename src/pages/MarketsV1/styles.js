import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LoadingWrapper: {
        //padding: "100px",
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
    },
    VersionSelector: {
        padding: 0,
        margin: '0 0 20px',
        listStyle: 'none',
        display: 'flex',
        '&>li': {
            background: '#fff',
            padding: '5px 20px',
            cursor: 'pointer',
            transition: '0.2s all',
            '&:first-child': {
                borderRadius: '5px 0 0 5px',
            },
            '&:last-child': {
                borderRadius: '0 5px 5px 0',
            },
            '&:hover': {
                color: '#fff',
                background: theme.colors.primary
            },
        }
    },
    ActiveVersion: {
        color: '#fff !important',
        background: `${theme.colors.primary} !important`
    },
    ComingSoonWrap: {
        marginTop: '30px',
        padding: '20px',
        textAlign: 'center',
        '& h1': {
            fontSize: '30px',
            margin: '0 0 15px',
            textTransform: 'uppercase'
        },
        '& p': {
            fontSize: '20px',
            margin: '0 0 15px',
            '& a': {
                color: '#0058FF',
                marginRight: '5px',
            }
        }
    }
}));
