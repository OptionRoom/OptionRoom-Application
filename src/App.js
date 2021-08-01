import React, {useMemo, useContext, useEffect, useState} from "react";
import ABCWhyteMediumWoff from './assets/fonts/ABCWhyte-Medium.woff';
import ABCWhyteMediumWoff2 from './assets/fonts/ABCWhyte-Medium.woff2';
import ABCWhyteRegularWoff from './assets/fonts/ABCWhyte-Regular.woff';
import ABCWhyteRegularWoff2 from './assets/fonts/ABCWhyte-Regular.woff2';

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
import CourtStaking from "./pages/CourtStaking";
import Nft from "./pages/Nft";
import NftStakePage from "./pages/NftStakePage";
import CreateMarket from "./pages/CreateMarket";
import FarminPoolPage from "./pages/FarminPoolPage";
import Claim from "./pages/Claim";
import MarketTest from "./pages/MarketTest";
import Markets from "./pages/Markets";
import MarketsV1 from "./pages/MarketsV1";
import Status from "./pages/Status";
import Market from "./pages/Market";
import Governance from "./pages/Governance";
import GovernanceList from "./pages/GovernanceList";
import NftBlue from "./assets/nftbgs/blue.svg";
import GoldSvg from "./assets/nftbgs/gold.svg";
import { OptionroomThemeContext } from "./shared/OptionroomThemeContextProvider";
import { watchUserSignIn } from "./shared/firestore.service";
import ConfigWallet from "./pages/ConfigWallet";

/**
 import ABCWhyteMediumWoff from './assets/fonts/ABCWhyte-Medium.woff';
 import ABCWhyteMediumWoff2 from './assets/fonts/ABCWhyte-Medium.woff2';
 import ABCWhyteRegularWoff from './assets/fonts/ABCWhyte-Regular.woff';
 import ABCWhyteRegularWoff2 from './assets/fonts/ABCWhyte-Regular.woff2';
 * @type {{fontFamily: string, src: string, fontDisplay: string, fontStyle: string, fontWeight: number}}
 */
const ABCWhyte = {
    fontFamily: 'Whyte',
/*    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,*/
    src: `
    url(${ABCWhyteMediumWoff}) format('woff'),
    url(${ABCWhyteMediumWoff2}) format('woff2'),
    url(${ABCWhyteRegularWoff}) format('woff'),
    url(${ABCWhyteRegularWoff2}) format('woff2'),
  `
};

const prefersDarkMode = false;

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
        minHeight: 'calc(100vh - 64px)',
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
    const [themeType, setThemeType] = useState(localStorage.getItem('optionroom_theme') || 'light');

    const lightColors = {
        primary: '#004BFF',
        boxBg: '#fff',
        boxBoxShadow: "0 0 20px 0 #E6EDFF",
        inputBg: '#FFF',
        inputBorder: '#D2D9E1',
        txtColor: "#000",
        secondaryTxt: '#6D8096'
    };

    const darkColors = {
        primary: '#004BFF',
        boxBg: `rgb(39, 38, 44)`,
        boxBoxShadow: 'none',
        inputBg: 'rgb(72, 63, 90)',
        inputBorder: 'rgb(72, 63, 90)',
        txtColor: "#fff",
        secondaryTxt: '#fff'
    };

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    background: {
                        default: themeType === 'dark' ? "#141A22" : "#F7FAFF"
                    },
                    text: {
                        primary: themeType === 'dark' ? "#818B95" : "#36414B"
                    },
                    type: themeType,
                    primary: {
                        main: '#004BFF',
                    },
                    secondary: {
                        main: '#ccc',
                    },
                },
                typography: {
                    fontFamily: [
                        'Open Sans',
                        //'Kanit',
                        'sans-serif',
                    ].join(','),
                },
                overrides: {
                    MuiCssBaseline: {
                        '@global': {
                            '@font-face': [ABCWhyte],
                        },
                    },
                },
                colors: themeType === 'dark' ? darkColors : lightColors,
                isDark: themeType === 'dark'
            }),
        [themeType],
    );

    const handleThemeTypeToggle = (theme) => {
        localStorage.setItem('optionroom_theme', theme);
        setThemeType(theme);
    }

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
                                         onToggleSidebar={handleToggleSidebar}
                                         activeTheme={themeType}
                                         onChangeTheme={handleThemeTypeToggle}
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
                                            isDepositEnabled={true}
                                            pool={"RoomFarming_RoomEthLpStake"}
                                            source={"room_eth_lp"}
                                        />
                                    </Route>
                                    <Route path="/court-farming" exact={true}>
                                        <CourtFarming />
                                    </Route>
                                    <Route path="/governance" exact={true}>
                                        <CourtStaking />
                                    </Route>
                                    <Route path="/nft">
                                        <Nft />
                                    </Route>
                                    <Route path="/nft-stake">
                                        <NftStakePage />
                                    </Route>
                                    <Route path="/court-farming/court-room">
                                        <FarminPoolPage
                                            isDepositEnabled={false}
                                            pool={"CourtFarming_RoomStake"}
                                            source={"room"}
                                        />
                                    </Route>
                                    <Route path="/court-farming/court-roomethlp">
                                        <FarminPoolPage
                                            isDepositEnabled={false}
                                            pool={"CourtFarming_RoomEthLpStake"}
                                            source={"room_eth_lp"}
                                        />
                                    </Route>
                                    <Route path="/court-farming/court-ht">
                                        <FarminPoolPage
                                            isDepositEnabled={false}
                                            pool={"CourtFarming_HtStake"}
                                            source={"ht"}
                                        />
                                    </Route>
                                    <Route path="/court-farming/court-matter">
                                        <FarminPoolPage
                                            isDepositEnabled={false}
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
                                    <Route path="/status" exact={true}>
                                        <Status />
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
                                    <Route path="/markets-v1">
                                        <MarketsV1 />
                                    </Route>
{/*                                    <Route path="/governance" exact={true}>
                                        <GovernanceList />
                                    </Route>
                                    <Route path="/governance/:governanceId">
                                        <Governance />
                                    </Route>
                                    <Route path="/config-wallet">
                                        <ConfigWallet />
                                    </Route>*/}
                                    <Route exact path="/">
                                        <Redirect to="/governance" />
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
