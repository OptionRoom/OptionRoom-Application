import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    DisputeWidget: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "24px",
    },
    DisputeWidget__Header: {
        color: "#3F4A57",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '16px',
        '&>div:first-child': {
            fontSize: "15px",
            fontWeight: 600,
        },
        '&>div:last-child': {
            fontSize: "13px"
        },
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
        boxShadow: '0 0 20px 0 #e6edff'
    }
}));
