import {useState} from 'react';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import {useStyles} from './styles';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: '16px',
        borderRadius: '8px',
    },
    colorPrimary: {
        backgroundColor: '#EDEFF4',
    },
    bar: {
        borderRadius: '8px',
        backgroundColor: '#004BFF',
    },
}))(LinearProgress);



const StyledTabs = withStyles({
    root:{
        padding: '27px 27px 0',
        minHeight: 'auto',
    },
    indicator: {
        display: 'none',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            display: 'none'
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

const StyledTab = withStyles((theme) => ({
    root: {
        background: '#EDEFF4',
        color: '#8293A6',
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: '14px',
        lineHeight: '24px',
        marginRight: '8px',
        height: '40px',
        padding: '0 16px',
        opacity: 1,
        borderRadius: '8px',
        '&.Mui-selected, &:focus': {
            background: '#004BFF',
            color: '#fff',
        },
    },
}))((props) => <Tab disableRipple {...props} />);

function Claim() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.ClaimPage}>
            <div className={classes.ClaimCard}>
                <StyledTabs value={value}
                            onChange={handleChange}
                            aria-label="styled tabs example">
                    <StyledTab label="Workflows"></StyledTab>
                    <StyledTab label="Datasets"></StyledTab>
                    <StyledTab label="Connections"/>
                </StyledTabs>
                {
                    value === 0 && (
                        <div className={classes.ClaimCard__TabPanel}>
                            <div className={classes.ClaimInfo}>
                                <div className={classes.Total}>
                                    <div className={classes.Total__Title}>
                                        Total
                                    </div>
                                    <div className={classes.Total__Content}>
                                        0.00000000
                                    </div>
                                </div>
                                <div className={classes.UnlockProgress}>
                                    <div className={classes.UnlockProgress__Title}>
                                        Unlock in progress
                                    </div>
                                    <div className={classes.UnlockProgress__ProgressBar}>
                                        <BorderLinearProgress variant="determinate" value={50}/>
                                    </div>
                                    <div className={classes.UnlockProgress__Value}>
                                        18.9123512515%
                                    </div>
                                </div>
                                <div className={classes.ClaimForm}>
                                    <div className={classes.ClaimForm__Input}>
                                        <div className={classes.ClaimForm__Input__Label}>
                                            Already claimed
                                        </div>
                                        <div className={classes.ClaimForm__Input__FieldWrap}>
                                            <input className={classes.ClaimForm__Input__Field}
                                                   type={'text'}/>
                                        </div>
                                    </div>
                                    <div className={classes.ClaimForm__Input}>
                                        <div className={classes.ClaimForm__Input__Label}>
                                            Claimable
                                        </div>
                                        <div className={classes.ClaimForm__Input__FieldWrap}>
                                            <input className={classes.ClaimForm__Input__Field}
                                                   type={'text'}/>
                                        </div>
                                    </div>
                                    <Button className={classes.ClaimForm__ClaimBtn}
                                            variant="contained"
                                            color="primary">
                                        Claim
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    value === 1 && (
                        <div className={classes.ClaimCard__TabPanel}>
                            ddd22
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Claim;
