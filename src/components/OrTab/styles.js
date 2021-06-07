import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    Tabs: {
      display: 'flex',
        background: "#EDF1F5", borderRadius: "10px",
        padding: '4px',
        marginBottom: '15px'
    },
    Tab: {
        padding: '8px 16px',
        borderRadius: "7px",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "#818B95",
        cursor: 'pointer'
    },
    TabSelected:{
        background: "#FFFFFF",
        color: '#2E6AFA'
    }
}));
