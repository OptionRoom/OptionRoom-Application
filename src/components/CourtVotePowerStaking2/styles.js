import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    CourtVotePowerStaking: {
        display: "flex",
        padding: "20px 40px",
        background: "#fff",
        boxShadow: "0 0 20px 0 #e6edff",
        alignItems: "center",
        margin: "-40px -40px 30px"
    },
    InfoWrap: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 'auto'
    },
    InfoBlock: {
        '& span:first-child': {
            color: '#a3a8ac',
            display: 'block',
            marginBottom: '10px'
        },
        '& span:last-child': {
            color: '#555c66',
            display: 'block',
            fontWeight: 700
        },
        '&:first-child': {
            marginRight: '15px'
        }
    },
    ActionBtn: {
        fontSize: '30px',
        '&:first-child': {
          marginRight: '15px'
        },
        width: "40px", height: "40px", padding: "0", minWidth: "0"
    }
}));
