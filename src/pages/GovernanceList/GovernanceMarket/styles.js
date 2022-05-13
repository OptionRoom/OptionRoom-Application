import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    notFoundResults: {
        textAlign: 'center',
        padding: '15px',
        '& svg': {
            fontSize: '60px',
            marginBottom: '15px'
        },
        '& div': {
            fontSize: '16px'
        }
    },
    MarketsList: {
        "&>div": {
            marginBottom: "20px",
            '&>a': {
                textDecoration: 'none'
            }
        },
        [theme.breakpoints.up('md')]: {
            display: "flex",
            flexWrap: "wrap",
            "&>div": {
                width: "calc(50% - 10px)",
                marginRight: "20px",
                marginBottom: "20px",
                "&:nth-child(2n)": {
                    marginRight: 0,
                },
            },
        },
    },
    MarketsList__ListView: {
        display: 'block',
        '&>div': {
            margin: '0 0 15px',
            width: '100%',

        },
    },
}));
