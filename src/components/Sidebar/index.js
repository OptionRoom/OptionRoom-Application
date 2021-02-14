import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {
    NavLink,
} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',

    },
    drawerPaper: {
        background: '#EDEFF4',
        borderRight: 'none'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    NavLinks: {
        padding: '16px'
    },
    NavLink: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: '#8293A6',
        fontSize: '14px',
        marginBottom: '8px',
        padding: '8px',
        '&.Active': {
            borderRadius: '8px',
            background: '#004BFF',
            color: '#fff'
        }
    },
    NavLink__Icon: {
        marginRight: '16px'
    },
    NavLink__Title: {
        opacity: 0,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    NavLink__Title__Open: {

        opacity: 1,
        transition: theme.transitions.create('opacity', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }
}));

function Sidebar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx(classes.drawerPaper, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                </IconButton>
            </div>
            <div className={classes.NavLinks}>
                {
                    [
                        {
                            title: 'Markets',
                            link: '/markets',
                        },
                        {
                            title: 'Governance',
                            link: '/governance',
                        },
                        {
                            title: 'Liquidity Pool',
                            link: '/liquidity-mining',
                        },
                        {
                            title: 'Claim',
                            link: '/claim',
                        },
                        {
                            title: 'Oracle',
                            link: '/oracle',
                        },
                        {
                            title: 'Docs',
                            link: '/docs',
                        },
                    ].map((item, index) => (
                        <NavLink to={item.link}
                                 activeClassName={'Active'}
                                 className={classes.NavLink}>
                            <InboxIcon className={classes.NavLink__Icon}/>
                            <span className={
                                clsx(classes.NavLink__Title, {
                                    [classes.NavLink__Title__Open]: open,
                                })
                            }>
                               {item.title}
                            </span>
                        </NavLink>
                    ))}
            </div>
        </Drawer>
    );
}

export default Sidebar;
