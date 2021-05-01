import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px'
    },
    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    }
}));
