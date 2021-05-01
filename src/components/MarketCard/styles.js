import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    MarketCard: {
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #e6edff',
        textDecoration: 'none',
        display: 'block'
    },
    Header: {
      display: 'flex'
    },
    HeaderSub: {
      textAlign: 'right'
    },
    Avatar: {
        borderRadius: '50%',
        height: "48px",
        width: "48px",
        //marginTop: '26px',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: 'center',
        boxShadow: '0 0 20px 0 #e6edff',
        border: '1px solid #e6edff',
        marginRight: 'auto'
    },
    Title: {
        color: "#212529",
        fontSize: "18px",
        fontWeight: 400,
        letterSpacing: "0",
        lineHeight: "25px",
        marginBottom: '24px',
        textDecoration: 'none',
        wordBreak: 'break-all',
        minHeight: '56px'
    },
    Cat: {
        color: "#8293A6",
        fontSize: "12px",
        letterSpacing: "0",
        lineHeight: "16px",
        marginBottom: '2px'
    },
    MarketState: {
        color: "#FFFFFF",
        fontSize: "10px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "12px",
        textAlign: "center",
        borderRadius: "5px",
        backgroundColor: "#8293A6",
        padding: '2px 8px'
    },
    Details: {
        display: 'flex'
    },
    Volume: {
        marginRight: 'auto',
    },
    Volume__Title: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px"
    },
    Volume__Value: {
        color: "#4E5D6D",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginLeft: '8px'
    },
    Options: {
        display: 'flex'
    },
    Option: {
        marginRight: '24px',
        '&:last-child': {
            marginRight: '0'
        }
    },
    Option__Title: {
        color: "#8293A6",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px"
    },
    Option__Value: {
        borderRadius: "12px",
        backgroundColor: "#EDEFF4",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        marginLeft: '8px',
        padding: '0 8px',
    },
    Option__ValueYes: {
        background: '#86DC8B'
    },
    Option__ValueNo: {
        background: '#7084FF'
    }
}));
