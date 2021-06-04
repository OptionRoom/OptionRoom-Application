import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    CourtVotePowerStaking: {
        borderRadius: '16px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 0 20px 0 #E6EDFF',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    CourtVotePowerStaking_Txt: {
        textAlign: 'center',
        '& svg': {
            fontSize: '50px',
            color: '#000',
            marginBottom: '10px'
        },
        '& div':{
            color: '#000',
            fontSize: '20px',
        },
        marginBottom: '20px'
    },
    CourtVotePowerStaking_Txt2: {
        textAlign: 'center',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
        },
        '&>div': {
            color: '#6D8096',
            fontSize: '16px',
            marginBottom: '15px',
            [theme.breakpoints.up('md')]: {
                marginRight: 'auto',
                marginBottom: '0',
            },
        },
        '&>button': {
            marginLeft: '5px'
        }
    }
}));
