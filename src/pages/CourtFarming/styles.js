import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    LiquidityMiningPage: {},
    Pools: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    Pool: {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        padding: '40px 16px 24px',
        //marginRight: '48px',
        width: '288px',
        marginBottom: '30px',
        '&:last-child': {
            marginRight: '0',
        }
    },
    Pool__Icon: {
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        background: '#004BFF',
        marginBottom: '40px',
        margin: '0 auto'
    },
    Pool__Title: {
        color: '#212529',
        fontSize: '20px',
        letterSpacing: 0,
        lineHeight: '24px',
        textAlign: 'center',
        marginBottom: '40px',
    },
    Pool__Action: {},
    Pool__Action__Link: {
        textDecoration: 'none'
    },

    ConnectWrap: {
        textAlign: 'center',
        padding: '100px 0'
    }
}));
