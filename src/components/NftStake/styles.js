import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    },
    Pools: {
        background: theme.isDark ? "#242D38" : "#fff",
        borderRadius: '10px',
        filter: "drop-shadow(3px 3px 0px #2E6AFA)",
        boxShadow: "0px 2px 20px rgba(95, 140, 182, 0.05)",
    },
    PoolsTitle: {
        textDecoration: "none",
        display: "flex",
        '& > div': {
            borderBottom: '2px solid rgba(133, 133, 133, 0.1)',
            width: '33.3%',
            display: 'block',
            padding: '15px 15px'
        }
    },
    PoolWrap: {
        textDecoration: "none",
        display: "flex",
        '& > div': {
            width: '33.3%',
            display: 'block',
            padding: '15px 15px',
            '&>span': {
                marginRight: '10px'
            }
        }
    }
}));
