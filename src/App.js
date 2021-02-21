import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css';
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Claim from "./pages/Claim";
import LiquidityMining from "./pages/LiquidityMining";
import ConnectionTest from "./pages/ConnectionTest";
import Nft from "./pages/Nft";
import NftStakePage from "./pages/NftStakePage";
import NftBlue from "./assets/nftbgs/blue.svg";
import React, {useContext} from "react";
import {AccountContext} from "./shared/AccountContextProvider";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#004BFF',
        },
        secondary: {
            main: '#ccc',
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',
        ].join(','),
    },
});

const useStyles = makeStyles((theme) => ({
    Main: {
        display: 'flex'
    },
    Main__Content: {
        'padding': '24px',
        flexGrow: 1,
        minHeight: '100vh'
    },
    Main__Content___Black: {
        backgroundImage: `url(${NftBlue})`,
    }
}));

function App() {
    const classes = useStyles();
    const accountContext = useContext(AccountContext);

    return (
        <div>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Router>
                    <div className={classes.Main}>
                        <Sidebar></Sidebar>
                        <div className={clsx(classes.Main__Content, {
                            [classes.Main__Content___Black]: accountContext.theme === 'black',
                        })}>
                            <Switch>
                                <Route path="/claim">
                                    <Claim/>
                                </Route>
                                <Route path="/liquidity-mining">
                                    <LiquidityMining/>
                                </Route>
                                <Route path="/connection-test">
                                    <ConnectionTest/>
                                </Route>
                                <Route path="/nft">
                                    <Nft/>
                                </Route>
                                <Route path="/nft-stake">
                                    <NftStakePage/>
                                </Route>
                                <Route path="/">
                                    <Home></Home>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </ThemeProvider>
        </div>

    );
}

export default App;
