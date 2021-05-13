import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {},
    ConnectWrap: {
        textAlign: "center",
        padding: "100px 0",
    },
    ComingSoon: {
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
