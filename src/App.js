import React, {useContext, useEffect, useState} from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from "clsx";

import './App.css';
import MainSidebar from "./components/MainSidebar";
import MainNavbar from "./components/MainNavbar";
import CourtFarming from "./pages/CourtFarming";
import Nft from "./pages/Nft";
import NftStakePage from "./pages/NftStakePage";
import CreateMarket from "./pages/CreateMarket";
import FarminPoolPage from "./pages/FarminPoolPage";
import Claim from "./pages/Claim";
import MarketTest from "./pages/MarketTest";
import Markets from "./pages/Markets";
import Market from "./pages/Market";
import Governance from "./pages/Governance";
import GovernanceList from "./pages/GovernanceList";
import NftBlue from "./assets/nftbgs/blue.svg";
import GoldSvg from "./assets/nftbgs/gold.svg";
import { OptionroomThemeContext } from "./shared/OptionroomThemeContextProvider";
import { watchUserSignIn } from "./shared/firestore.service";
import ConfigWallet from "./pages/ConfigWallet";

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
            'Kanit',
            'sans-serif',
        ].join(','),
    },
});


const useStyles = makeStyles((theme) => ({
    Main: {
        paddingTop: '64px',
        transition: '0.2s all',
        [theme.breakpoints.up('md')]: {
            marginLeft: '240px',
        },
    },
    Main__isSidebarExpand: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '50px'
        },
    },
    Main__Content: {
        //'padding': '24px',
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
    const [isMinHeader, setIsMinHeader] = useState(false);
    const [isSidebarExpand, setIsSidebarExpand] = useState(true);

    useEffect(() => {
        watchUserSignIn();

        const handleScroll = () => {
            if(window.scrollY > 30) {
                setIsMinHeader(true);
            } else {
                setIsMinHeader(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleToggleSidebar = () => {
        setIsSidebarExpand(!isSidebarExpand);
    }

    return (
        <ThemeProvider theme={theme}>
            <div>
                <CssBaseline />
                <Router>
                    <div>
                        <MainNavbar isSidebarExpand={isSidebarExpand}
                                    onToggleSidebar={handleToggleSidebar}
                                    isMinHeader={isMinHeader}/>
                        <div className={clsx(classes.Main, {
                            [classes.Main__isSidebarExpand]: !isSidebarExpand,
                        })}>
                            <MainSidebar isSidebarExpand={isSidebarExpand}
                                         isMinHeader={isMinHeader}></MainSidebar>
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
                                    <Route path="/liquidity-mining">
                                        <FarminPoolPage
                                            pool={"RoomFarming_RoomEthLpStake"}
                                            source={"room_eth_lp"}
                                        />
                                    </Route>
                                    <Route path="/court-farming" exact={true}>
                                        <CourtFarming />
                                    </Route>
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
                                    <Route path="/claim">
                                        <Claim />
                                    </Route>
                                    <Route path="/market-test">
                                        <MarketTest />
                                    </Route>
                                    <Route path="/markets" exact={true}>
                                        <Markets />
                                    </Route>
                                    <Route path="/markets/create" exact={true}>
                                        <CreateMarket />
                                    </Route>
                                    <Route path="/markets/:marketId">
                                        <Market />
                                    </Route>
                                    <Route path="/governance" exact={true}>
                                        <GovernanceList />
                                    </Route>
                                    <Route path="/governance/:governanceId">
                                        <Governance />
                                    </Route>
                                    <Route path="/config-wallet">
                                        <ConfigWallet />
                                    </Route>
                                    <Route exact path="/">
                                        <Redirect to="/court-farming" />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
