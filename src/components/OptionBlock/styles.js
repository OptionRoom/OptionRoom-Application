import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Options__OptionBlock: {
        cursor: 'pointer',
        border: "2px solid #D2D9E1",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        padding: "8px 16.5px",
        marginBottom: '7.5px',
        transition: '0.2s all',
        '&:hover, &[data-selected="true"]': {
            backgroundColor: 'rgba(129, 139, 149, 0.1)',

            border: "2px solid #004BFF",
            '& $OptionBlock__Indicator': {
                backgroundColor: '#004BFF',
            }
        }
    },
    OptionBlock__Indicator: {
        height: "24px",
        width: "24px",
        marginRight: "8px",
        border: "1px solid #D2D9E1",
        borderRadius: "50%",
        transition: '0.2s all',
        position: 'relative',
        '& div': {
            position: 'absolute',
            top: '7px',
            left: '7px',
            backgroundColor: '#fff',
            height: "8px",
            width: "8px",
            borderRadius: '50%'
        }
    },
    OptionBlock__Title: {
        color: "#5F7184",
        fontSize: "16px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "16px",
        marginRight: 'auto'
    },
    OptionBlock__Value: {
        color: "#5F7184",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "16px",
        textAlign: "right"
    }
}));
