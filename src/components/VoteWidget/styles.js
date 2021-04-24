import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    VoteWidget: {
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        padding: "24px",
    },
    VoteWidget__Header: {
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
    VoteWidget__Options: {
        marginBottom: '16.5px',
        paddingBottom: '16.5px',
        borderBottom: '1px solid #EDEFF4',
        '& >div': {
            display: 'flex',
            '&>div': {
                width: '50%'
            }
        }
    },
    VoteWidget__Progress: {
        marginBottom: '23px',
        '&>div': {
            marginBottom: '16px',
            '&:last-child': {
                marginBottom: 0
            }
        }
    }
}));
