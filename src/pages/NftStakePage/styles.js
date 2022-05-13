import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    NftStakePage: {
        [theme.breakpoints.up('md')]: {
            padding: '50px'
        },
        padding: '10px',
    },
}));
