import {makeStyles} from "@material-ui/core/styles";

const numberOfColumns = 3;
const marginBetweenEntries = 15;


export const useStyles = makeStyles((theme) => ({
    ConnectWrap: {
        padding: '100px',
        textAlign: 'center'
    },
    MarketsContainer: {
        maxWidth: '1000px',
        margin: '0 auto',
    },
    MarketsHeader: {
        padding: '10px',
        margin: '0 0 15px',
        [theme.breakpoints.up('md')]: {
            padding: '50px 0',
            margin: '0 0 30px',
        },
        '& $MarketsContainer': {
            [theme.breakpoints.up('md')]: {
                display: 'flex',
                alignItems: 'center',
                '&>div': {
                    marginRight: 'auto'
                },
            },
        },
        background: 'radial-gradient( circle 993px at 0.5% 50.5%,  rgba(137,171,245,0.37) 0%, rgba(245,247,252,1) 100.2% )',
        '& h1': {
            lineHeight: '1',
            fontSize: '32px',
            margin: '0 0 15px',
            [theme.breakpoints.up('md')]: {
                lineHeight: '1',
                fontSize: '64px',
                margin: '0 0 15px',
            },
        },
        '& p': {
            lineHeight: '1',
            fontSize: '16px',
            margin: '0 0 15px',
            [theme.breakpoints.up('md')]: {
                fontSize: '24px',
                margin: '0',
            },
        }
    },
    CreateMarketLinkWrap: {
        marginBottom: '16px'
    },
    CreateMarketLink: {
        textDecoration: 'none',
    },
    LoadingWrapper: {
        padding: '100px',
        textAlign: 'center'
    },
    MarketsFiltrationWrap: {
      marginBottom: '20px'
    },
    MarketsList: {
        padding: '0 10px',
        '&>div': {
            marginBottom: `${marginBetweenEntries}px`
        },
        [theme.breakpoints.up('md')]: {
            padding: '0',
            display: 'flex',
            flexWrap: 'wrap',
            '&>div': {
                width: `calc(${100/numberOfColumns}% - ${(marginBetweenEntries*(numberOfColumns - 1))/3}px)`,
                marginRight: `${marginBetweenEntries}px`,
                marginBottom: `${marginBetweenEntries}px`,
                '&:nth-child(3n)': {
                    marginRight: 0,
                }
            },
            '&>div>a': {
                height: '100%'
            },
        },
    }
}));
