import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    MarketsPage: {},
    Sidebar: {},
    Sidebar__Title: {
        color: '#3F4A57',
        fontsize: '14px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        marginBottom: '32px'
    },
    Sidebar__Content: {},
    Cat: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
    },
    Cat__Name: {
        color: '#8293A6',
        fontsize: '14px',
        fontWeight: 600,
        letterSpacing: 0,
        lineHeight: '24px',
        marginRight: 'auto'
    },
    Cat__Count: {
        height: '24px',
        width: '40px',
        color: '#8293A6',
        fontSize: '14px',
        lineHeight: '24px',
        borderRadius: '12px',
        backgroundColor: '#EDEFF4',
        textAlign: 'center'
    },
    MarketsWrap: {
        //maxWidth: '800px',
        margin: '0 auto',
        '& >div': {
            marginBottom: '16px'
        }
    },
    CreateMarketLinkWrap: {
        marginBottom: '16px'
    },
    CreateMarketLink: {
        display: 'block',
        textDecoration: 'none',

    }
}));
