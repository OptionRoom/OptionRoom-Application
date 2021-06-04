import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    ButtonSteps: {
        display: 'flex',
        alignItems: 'center'
    },
    Step: {
        flexGrow: 1,
        flexBasis: 0,
        '&:first-child': {
            '& $StepWrap': {
                '&::before': {
                    display: 'none'
                }
            }
        },
        '&:last-child': {
            '& $StepWrap': {
                '&::after': {
                    display: 'none'
                }
            }
        }
    },
    StepWrap: {
        position: 'relative',
        marginBottom: '10px',
        '&::after': {
            top: "calc(50% - 1px)",
            left: "50%",
            width: "50%",
            height: "2px",
            content: "''",
            display: "block",
            position: "absolute",
            background: "#d6d6d6"
        },
        '&::before': {
            top: "calc(50% - 1px)",
            left: "0",
            width: "50%",
            height: "2px",
            content: "''",
            display: "block",
            position: "absolute",
            background: "#d6d6d6"
        }
    },
    StepTxt: {
        fontWeight: 700,
        color: "#5b5151",
        width: "25px",
        height: "25px",
        background: "#d6d6d6",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "25px",
        margin: '0 auto',
        position: 'relative',
        zIndex: 99
    },
    ButtonWrap: {
        padding: '0 10px'
    }
}));
