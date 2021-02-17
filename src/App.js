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
    }
}));

function App() {
    const classes = useStyles();

    return (
        <div>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Router>
                    <div className={classes.Main}>
                        <Sidebar></Sidebar>
                        <div className={classes.Main__Content}>
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
