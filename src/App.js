import React, { useContext } from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from "clsx";

import './App.css';
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Claim from "./pages/Claim";
import LiquidityMining from "./pages/LiquidityMining";
import CourtFarming from "./pages/CourtFarming";
import ConnectionTest from "./pages/ConnectionTest";
import Nft from "./pages/Nft";
import NftStakePage from "./pages/NftStakePage";
import FarminPoolPage from "./pages/FarminPoolPage";
import NftBlue from "./assets/nftbgs/blue.svg";
import GoldSvg from "./assets/nftbgs/gold.svg";
import { OptionroomThemeContext } from "./shared/OptionroomThemeContextProvider";

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
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        },
    },
    Main__Content: {
        'padding': '24px',
        minHeight: '100vh',
        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
        },
    },
    Main__Content___Black: {
        backgroundImage: `url(${NftBlue})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    Main__Content___Golden: {
        backgroundImage: `url(${GoldSvg})`
    }
}));

function App() {
    const classes = useStyles();
    const optionroomThemeContext = useContext(OptionroomThemeContext);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CssBaseline />

                <Router>
                    <div className={classes.Main}>
                        <Sidebar className={classes.DesktopSidebar}></Sidebar>
                        <div
                            className={clsx(classes.Main__Content, {
                                [classes.Main__Content___Black]:
                                    optionroomThemeContext.theme === "black",
                                [classes.Main__Content___Golden]:
                                    optionroomThemeContext.background ===
                                    "golden",
                            })}
                        >
                            <Switch>
                                {/*                                <Route path="/claim">
                                    <Claim/>
                                </Route>*/}
                                <Route path="/liquidity-mining">
                                    <FarminPoolPage
                                        pool={"RoomFarming_RoomEthLpStake"}
                                        source={"room_eth_lp"}
                                    />
                                </Route>
                                <Route path="/court-farming" exact={true}>
                                    <CourtFarming />
                                </Route>
                                {/*                                <Route path="/connection-test">
                                    <ConnectionTest/>
                                </Route>*/}
                                <Route path="/nft">
                                    <Nft />
                                </Route>
                                <Route path="/nft-stake">
                                    <NftStakePage />
                                </Route>
                                <Route path="/court-farming/court-room">
                                    <FarminPoolPage
                                        pool={"CourtFarming_RoomStake"}
                                        source={"room"}
                                    />
                                </Route>
                                <Route path="/court-farming/court-roomethlp">
                                    <FarminPoolPage
                                        pool={"CourtFarming_RoomEthLpStake"}
                                        source={"room_eth_lp"}
                                    />
                                </Route>
                                <Route path="/court-farming/court-ht">
                                    <FarminPoolPage
                                        pool={"CourtFarming_HtStake"}
                                        source={"ht"}
                                    />
                                </Route>
                                <Route path="/court-farming/court-matter">
                                    <FarminPoolPage
                                        pool={"CourtFarming_MatterStake"}
                                        source={"matter"}
                                    />
                                </Route>
                                {/*                                 <Route path="/court-farming/court-courtethlp">
                                    <FarminPoolPage
                                        pool={"CourtFarming_CourtEthLpStake"}
                                        source={"court_eth_lp"}
                                    />
                                </Route> */}
                                <Route exact path="/">
                                    <Redirect to="/liquidity-mining" />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
