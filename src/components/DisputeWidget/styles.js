import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    DisputeWidget: {
        background: "#FFFFFF",
        boxShadow: "0px 8px 80px rgba(95, 140, 182, 0.08)",
        borderRadius: "15px",
        padding: "29px 35px",
    },
    DisputeWidget__Header: {
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "18px",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: "#818B95",
        marginBottom: '27px',
    },
    DisputeWidget__Body: {
        color: "#3F4A57",
        marginBottom: '16px',
        '& .MuiAlert-root': {
            marginTop: '5px'
        }
    },
    DisputeWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4',
        '& >div': {
            display: 'flex',
            '&>div': {
                marginRight: '4px',
                width: 'calc(50% - 4px)',
                '&:last-child':{
                    marginRight: 0
                }
            }
        }
    },
    DisputeWidget__Progress: {
        marginBottom: '23px',
        '&>div': {
            marginBottom: '16px',
            '&:last-child': {
                marginBottom: 0
            }
        }
    },
    Yes: {
        display: 'inline-block',
        borderRadius: "12px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        padding: '0 8px',
        background: '#86DC8B'
    },
    No: {
        display: 'inline-block',
        borderRadius: "12px",
        color: "#fff",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0",
        lineHeight: "24px",
        padding: '0 8px',
        background: '#7084FF'
    },
    DisputeWidget__DidDisputeTxt: {
        textAlign: 'center',
        padding: '10px 5px',
        background: '#e4f1ff',
        color: "#000",
        borderRadius: '5px',
        marginTop: '10px',
        boxShadow: theme.colors.boxBoxShadow
    }
}));
