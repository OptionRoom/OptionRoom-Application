import { useState, useContext, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "../../components/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useStyles } from "./styles";
import { OptionroomThemeContext } from "../../shared/OptionroomThemeContextProvider";
import { AccountContext } from "../../shared/AccountContextProvider";
import ConnectButton from "../../components/ConnectButton";
import Navbar from "../../components/Navbar";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { abi, address } from "./contract";
import { walletHelper } from "../../shared/wallet.helper";
import swal from "sweetalert";
import {
    ellipseAddress,
    getAddressImgUrl,
    toWei,
    fromWei,
} from "../../shared/helper";
const walletHelperInsatnce = walletHelper();

const getNumberFromBigNumber = (bigNumber) => {
    return fromWei(bigNumber, "ether", 2);
};

const getBigNumberFromNumber = (number) => {
    return toWei(number, "ether");
};

function MarketTest() {
    const optionroomThemeContext = useContext(OptionroomThemeContext);
    optionroomThemeContext.changeTheme("primary");
    const accountContext = useContext(AccountContext);

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [contractAddress, setContractAddress] = useState(address);
    const [mainAccount, setMainAccount] = useState(
        "0xcfdA687FeFB7425756FFe8cE9b33d61bf95d02E0"
    );

    //Market
    const [resolveIndex, setResolveIndex] = useState("0");
    const [isResolvingMarket, setIsResolvingMarket] = useState(false);
    const [questionId, setQuestionId] = useState(
        "0xf73350947c70bd9bc78a52ff8210bd83d4049c08"
    );
    const [allAccountsDollarBalance, setAllAccountsDollarBalance] = useState(
        []
    );
    const [isCreatingMarket, setIsCreatingMarket] = useState(false);
    const [marketYesNoBalanceList, setMarketYesNoBalanceList] = useState([]);
    const [marketShareBalanceList, setMarketShareBalanceList] = useState([]);
    const [marketYesNoBalancePool, setMarketYesNoBalancePool] = useState([]);
    const [
        isAdd__Market_Liquidity__InProgress,
        setIsAdd__Market_Liquidity__InProgress,
    ] = useState(false);
    const [
        add__Market_Liquidity__Input,
        setAdd__Market_Liquidity__Input,
    ] = useState(0);

    //Account general
    const [account__DollarBalance, setAccount__DollarBalance] = useState("0");
    const [
        account__DollarBalance__Input,
        setAccount__DollarBalance__Input,
    ] = useState("0");
    const [
        isAdding__Account__DollarBalance,
        setIsAdding__Account__DollarBalance,
    ] = useState(false);

    //Account market
    const [accountYesNoBalance, setAccountYesNoBalance] = useState();
    const [marketAccountShareBalance, setMarketAccountShareBalance] = useState(
        0
    );
    const [
        marketAccountShareBalanceInput,
        setMarketAccountShareBalanceInput,
    ] = useState(0);

    const [
        isRemovingMarketAccountShareBalance,
        setIsRemovingMarketAccountShareBalance,
    ] = useState(false);

    //Buy and sell
    const [isBuying, setIsBuying] = useState(false);
    const [isSelling, setIsSelling] = useState(false);
    const [buyTokens, setBuyTokens] = useState(0);
    const [buyAmount, setBuyAmount] = useState(0);
    const [buyIndex, setBuyIndex] = useState("0");
    const [sellAmount, setSellAmount] = useState(0);
    const [sellTotalPrice, setSellTotalPrice] = useState(0);
    const [sellIndex, setSellIndex] = useState("0");

    const [marketOptionsShare, setMarketOptionsShare] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getContract = () => {
        return new (walletHelperInsatnce.getWeb3().eth.Contract)(
            abi,
            contractAddress
        );
    };

    const buy = async () => {
        setIsBuying(true);
        //0xcfdA687FeFB7425756FFe8cE9b33d61bf95d02E1
        const result = await getContract()
            .methods.buy(
                questionId,
                parseInt(buyIndex),
                getBigNumberFromNumber(buyAmount),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });
        loadMarket();

        setIsBuying(false);
        return result;
    };

    const sell = async () => {
        setIsSelling(true);
        //0xcfdA687FeFB7425756FFe8cE9b33d61bf95d02E1
        const result = await getContract()
            .methods.sell(
                questionId,
                sellIndex,
                getBigNumberFromNumber(sellAmount),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });

        loadMarket();

        setIsSelling(false);
        return result;
    };

    const getAllAccountsDollarBalance = async () => {
        const result = await getContract().methods.dollar_balanceList().call({
            from: accountContext.account,
        });

        setAllAccountsDollarBalance(result);
    };

    const getQuestionMarket = async () => {
        const result = await getContract().methods.getMarket(questionId).call({
            from: accountContext.account,
        });

    };

    const getQuestion_YesNo_BalanceList = async () => {
        const result = await getContract()
            .methods.yesno_balanceList(questionId)
            .call({
                from: accountContext.account,
            });
        setMarketYesNoBalanceList(result);
    };

    const getQuestion_YesNo_Percentage = async () => {
        const result = await getContract()
            .methods.yesno_percentage(questionId)
            .call({
                from: accountContext.account,
            });

        setMarketOptionsShare(result);
    };

    const getQuestion_YesNo_BalancePool = async () => {
        const result = await getContract()
            .methods.yesno_balancePool(questionId)
            .call({
                from: accountContext.account,
            });

        setMarketYesNoBalancePool(result);

    };

    const getQuestion__Account_Share_Balance = async () => {
        const result = await getContract()
            .methods.share_balance(questionId, mainAccount)
            .call({
                from: accountContext.account,
            });

        setMarketAccountShareBalance(result);

    };

    const getQuestion_Share_BalanceList = async () => {
        const result = await getContract()
            .methods.share_balanceList(questionId)
            .call({
                from: accountContext.account,
            });

        setMarketShareBalanceList(result);
    };

    const getAccount__Question_YesNo_Balance = async () => {
        const result = await getContract()
            .methods.yesno_balance(questionId, mainAccount)
            .call({
                from: accountContext.account,
            });

        setAccountYesNoBalance(result);
    };

    const getYesNoBalanceList = async () => {
        const result = await getContract().methods.yesno_balanceList().call({
            from: accountContext.account,
        });

    };

    const add__Market_Liquidity = async () => {
        setIsAdd__Market_Liquidity__InProgress(true);
        const result = await getContract()
            .methods.addLiquidity(
                questionId,
                getBigNumberFromNumber(add__Market_Liquidity__Input),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });
        loadMarket();

        setIsAdd__Market_Liquidity__InProgress(false);
    };

    const remove__Market_Liquidity = async () => {
        setIsRemovingMarketAccountShareBalance(true);
        const result = await getContract()
            .methods.removeLiquidity(
                questionId,
                getBigNumberFromNumber(marketAccountShareBalanceInput),
                mainAccount
            )
            .send({
                from: accountContext.account,
            });
        loadMarket();
        setIsRemovingMarketAccountShareBalance(false);
    };

    const add__Account_DollarBalance = async () => {
        setIsAdding__Account__DollarBalance(true);
        const result = await getContract()
            .methods.dollar_mint(mainAccount, getBigNumberFromNumber(1000))
            .send({
                from: accountContext.account,
            });
        loadMarket();
        setIsAdding__Account__DollarBalance(false);
    };

    const get__Account_DollarBalance = async () => {
        const result = await getContract()
            .methods.dollar_balance(mainAccount)
            .call({
                from: accountContext.account,
            });

        setAccount__DollarBalance(result);
    };

    const getNumberOfTokensByAmount = async () => {
        const result = await getContract()
            .methods.calcBuyAmount(
                questionId,
                getBigNumberFromNumber(buyAmount),
                buyIndex
            )
            .call({
                from: accountContext.account,
            });

        setBuyTokens(result);

    };

    const getAmountByNumberOfTokens = async () => {
        const result = await getContract()
            .methods.calcSellReturnInv(
                questionId,
                sellIndex,
                getBigNumberFromNumber(sellAmount)
            )
            .call({
                from: accountContext.account,
            });

        setSellTotalPrice(result);

    };

    const resolveMarket = async () => {
        setIsResolvingMarket(true);
        const result = await getContract()
            .methods.resolve(questionId, resolveIndex)
            .send({
                from: accountContext.account,
            });
        loadMarket();
        setIsResolvingMarket(false);
    };

    const createMarket = async () => {
        if (!questionId) {
            swal("Error", `Question id is empty`, "error");
            return;
        }
        setIsCreatingMarket(true);
        //0xcfdA687FeFB7425756FFe8cE9b33d61bf95d02E1
        const result = await getContract()
            .methods.marketCreate(questionId)
            .send({
                from: accountContext.account,
            });

        setIsCreatingMarket(false);

        return result;
    };

    const loadMarket = async () => {
        //getYesNoBalanceList();
        get__Account_DollarBalance();
        getQuestion__Account_Share_Balance();
        getAccount__Question_YesNo_Balance();
        getQuestion_YesNo_BalancePool();
        getQuestion_YesNo_BalanceList();
        getQuestion_Share_BalanceList();
        getQuestion_YesNo_Percentage();
        getQuestion_Share_BalanceList();
        getAllAccountsDollarBalance();
        getQuestionMarket();
    };

    useEffect(() => {
        if (accountContext.account) {
            getNumberOfTokensByAmount();
        }
    }, [accountContext.account, buyAmount, buyIndex]);

    useEffect(() => {
        if (accountContext.account) {
            getAmountByNumberOfTokens();
        }
    }, [accountContext.account, sellIndex, sellAmount]);

    useEffect(() => {
        if (accountContext.account) {
            loadMarket();
        }
    }, [accountContext.account, mainAccount]);

    useEffect(() => {
        if (accountContext.account) {
            loadMarket();
        }
    }, [accountContext.account]);

    return (
        <>
            <Navbar
                title={"Claim"}
                details={
                    "Earn COURT tokens by providing liquidity to one of the pools on this page."
                }
            />
            <div className={classes.ClaimPage}>
                {accountContext.account && (
                    <div>
                        <div className={classes.Section}>
                            <div className={classes.Section__Name}>Config</div>
                            <div className={classes.Section__Content}>
                                <TextField
                                    value={contractAddress}
                                    fullWidth={true}
                                    label="Contract Address"
                                    onChange={(event) => {
                                        setContractAddress(event.target.value);
                                    }}
                                />
                                <TextField
                                    value={mainAccount}
                                    fullWidth={true}
                                    label="Account"
                                    onChange={(event) => {
                                        setMainAccount(event.target.value);
                                    }}
                                />
                                <br />
                                <br />
                                <div>
                                    Available dollar balance of the account:{" "}
                                    <strong>
                                        {getNumberFromBigNumber(
                                            account__DollarBalance
                                        )}
                                        $
                                    </strong>{" "}
                                    <Button
                                        size={"small"}
                                        color="primary"
                                        onClick={add__Account_DollarBalance}
                                        isProcessing={
                                            isAdding__Account__DollarBalance
                                        }
                                    >
                                        add 1000$ to account
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Section}>
                            <div className={classes.Section__Name}>
                                Question
                            </div>
                            <div className={classes.Section__Content}>
                                <TextField
                                    value={questionId}
                                    fullWidth={true}
                                    label="Question Id"
                                    onChange={(event) => {
                                        setQuestionId(event.target.value);
                                    }}
                                />
                                <br />
                                <br />
                                <Button
                                    size={"small"}
                                    isProcessing={isCreatingMarket}
                                    color="primary"
                                    onClick={createMarket}
                                >
                                    Create Market
                                </Button>
                                &nbsp;
                                <Button
                                    size={"small"}
                                    color="primary"
                                    onClick={loadMarket}
                                >
                                    Load Market
                                </Button>
                                <br />
                                <br />
                                <div className={classes.Section}>
                                    <div className={classes.Section__Name}>
                                        Resolve market
                                    </div>
                                    <div className={classes.Section__Content}>
                                        <RadioGroup
                                            row
                                            aria-label="position"
                                            name="resolve"
                                            value={resolveIndex}
                                            onChange={(event) => {
                                                setResolveIndex(
                                                    event.target.value
                                                );
                                            }}
                                        >
                                            <FormControlLabel
                                                value="0"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="Yes"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={
                                                    <Radio color="primary" />
                                                }
                                                label="No"
                                                labelPlacement="end"
                                            />
                                            <Button
                                                size={"small"}
                                                color="primary"
                                                onClick={resolveMarket}
                                                isProcessing={isResolvingMarket}
                                            >
                                                Resolve
                                            </Button>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.Section}>
                            <div className={classes.Section__Name}>
                                Liquidty
                            </div>
                            <div className={classes.Section__Content}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <div className={classes.Section}>
                                            <div
                                                className={
                                                    classes.Section__Name
                                                }
                                            >
                                                Dollar
                                            </div>
                                            <div
                                                className={
                                                    classes.Section__Content
                                                }
                                            >
                                                <p>
                                                    Avilable Dollar Balance:{" "}
                                                    <strong>
                                                        {getNumberFromBigNumber(
                                                            account__DollarBalance
                                                        )}
                                                        $
                                                    </strong>
                                                </p>
                                                <hr />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        "align-items": "center",
                                                    }}
                                                >
                                                    <TextField
                                                        label="Dollar Amount"
                                                        value={
                                                            add__Market_Liquidity__Input
                                                        }
                                                        onChange={(event) => {
                                                            setAdd__Market_Liquidity__Input(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                    />
                                                    <Button
                                                        size={"small"}
                                                        color="primary"
                                                        onClick={
                                                            add__Market_Liquidity
                                                        }
                                                        isProcessing={
                                                            isAdd__Market_Liquidity__InProgress
                                                        }
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.Section}>
                                            <div
                                                className={
                                                    classes.Section__Name
                                                }
                                            >
                                                Share
                                            </div>
                                            <div
                                                className={
                                                    classes.Section__Content
                                                }
                                            >
                                                <p>
                                                    Avilable Share Balance:{" "}
                                                    <strong>
                                                        {getNumberFromBigNumber(
                                                            marketAccountShareBalance
                                                        )}
                                                    </strong>
                                                </p>
                                                <hr />
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <TextField
                                                        label="Dollar Amount"
                                                        value={
                                                            marketAccountShareBalanceInput
                                                        }
                                                        onChange={(event) => {
                                                            setMarketAccountShareBalanceInput(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                    />
                                                    <Button
                                                        size={"small"}
                                                        color="primary"
                                                        isProcessing={
                                                            isRemovingMarketAccountShareBalance
                                                        }
                                                        onClick={
                                                            remove__Market_Liquidity
                                                        }
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.Section}>
                            <div className={classes.Section__Name}>
                                Buy & Sell
                            </div>
                            <div className={classes.Section__Content}>
                                <div
                                    style={{
                                        width: " 300px",
                                        margin: "0 auto 20px",
                                    }}
                                >
                                    <PieChart
                                        data={marketOptionsShare.map(
                                            (entry, index) => {
                                                return {
                                                    title:
                                                        index === 0
                                                            ? "Yes"
                                                            : "No",
                                                    value: parseFloat(entry),
                                                    color:
                                                        index === 0
                                                            ? "green"
                                                            : "red",
                                                };
                                            }
                                        )}
                                        label={({ dataEntry, index }) => {
                                            if(marketYesNoBalancePool) {
                                                return `${dataEntry.title} ${Math.round(dataEntry.percentage)}% | ${getNumberFromBigNumber(marketYesNoBalancePool[(dataEntry.title === 'Yes' ? 0 : 1)])}`;
                                            }

                                            return `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`;
                                        }}
                                        labelStyle={{
                                            fill: "#fff",
                                            opacity: 0.75,
                                            pointerEvents: "none",
                                            fontSize: "5px",
                                        }}
                                    />
                                </div>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <div className={classes.Section}>
                                            <div
                                                className={
                                                    classes.Section__Name
                                                }
                                            >
                                                Buy
                                            </div>
                                            <div
                                                className={
                                                    classes.Section__Content
                                                }
                                            >
                                                <p>
                                                    You have a total of{" "}
                                                    <strong>
                                                        $
                                                        {getNumberFromBigNumber(
                                                            account__DollarBalance
                                                        )}
                                                    </strong>
                                                </p>
                                                <TextField
                                                    fullWidth={true}
                                                    label="Dollar Amount"
                                                    value={buyAmount}
                                                    onChange={(event) => {
                                                        setBuyAmount(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                                <br />
                                                <br />
                                                <RadioGroup
                                                    row
                                                    aria-label="position"
                                                    name="buy"
                                                    value={buyIndex}
                                                    onChange={(event) => {
                                                        setBuyIndex(
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="0"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="Yes"
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="1"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="No"
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                <div>
                                                    Number of{" "}
                                                    {buyIndex === "0"
                                                        ? "Yes"
                                                        : "No"}
                                                    :{" "}
                                                    <strong>
                                                        {getNumberFromBigNumber(
                                                            buyTokens
                                                        )}
                                                    </strong>
                                                </div>
                                                <div>
                                                    Avg price of{" "}
                                                    {buyIndex === "0"
                                                        ? "Yes"
                                                        : "No"}
                                                    : :{" "}
                                                    <strong>
                                                        {buyTokens && buyAmount
                                                            ? buyAmount /
                                                              getNumberFromBigNumber(
                                                                  buyTokens
                                                              )
                                                            : "0"}
                                                        $
                                                    </strong>
                                                </div>
                                                <br />
                                                <Button
                                                    isProcessing={isBuying}
                                                    size={"small"}
                                                    onClick={buy}
                                                    color="primary"
                                                >
                                                    Buy
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className={classes.Section}>
                                            <div
                                                className={
                                                    classes.Section__Name
                                                }
                                            >
                                                Sell
                                            </div>
                                            <div
                                                className={
                                                    classes.Section__Content
                                                }
                                            >
                                                <p>
                                                    You have{" "}
                                                    <strong>
                                                        Yes (
                                                        {accountYesNoBalance &&
                                                            getNumberFromBigNumber(
                                                                accountYesNoBalance[0]
                                                            )}
                                                        )
                                                    </strong>
                                                    <strong>
                                                        No (
                                                        {accountYesNoBalance &&
                                                            getNumberFromBigNumber(
                                                                accountYesNoBalance[1]
                                                            )}
                                                        )
                                                    </strong>
                                                </p>
                                                <TextField
                                                    fullWidth={true}
                                                    label="Number of tokens"
                                                    value={sellAmount}
                                                    onChange={(event) => {
                                                        setSellAmount(
                                                            event.target.value
                                                        );
                                                    }}
                                                />
                                                <br />
                                                <br />
                                                <RadioGroup
                                                    row
                                                    aria-label="position"
                                                    name="sell"
                                                    value={sellIndex}
                                                    onChange={(event) => {
                                                        setSellIndex(
                                                            event.target.value
                                                        );
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        value="0"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="Yes"
                                                        labelPlacement="end"
                                                    />
                                                    <FormControlLabel
                                                        value="1"
                                                        control={
                                                            <Radio color="primary" />
                                                        }
                                                        label="No"
                                                        labelPlacement="end"
                                                    />
                                                </RadioGroup>
                                                <div>
                                                    Dollar amount:{" "}
                                                    <strong>
                                                        {getNumberFromBigNumber(
                                                            sellTotalPrice
                                                        )}
                                                    </strong>
                                                </div>
                                                <div>
                                                    Avg sell price:{" "}
                                                    <strong>
                                                        {sellTotalPrice &&
                                                        sellAmount
                                                            ? sellAmount /
                                                              getNumberFromBigNumber(
                                                                  sellTotalPrice
                                                              )
                                                            : "0"}
                                                        $
                                                    </strong>
                                                </div>
                                                <br />
                                                <Button
                                                    isProcessing={isSelling}
                                                    onClick={sell}
                                                    size={"small"}
                                                    color="primary"
                                                >
                                                    Sell
                                                </Button>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className={classes.Section}>
                            <div className={classes.Section__Name}>
                                Information
                            </div>
                            <div className={classes.Section__Content}>
                                <Grid container spacing={3}>
                                    <Grid item xs={4}>
                                        <h1>Dollar Balance</h1>
                                        <TableContainer component={Paper}>
                                            <Table
                                                className={classes.table}
                                                aria-label="simple table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Account
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            $
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {allAccountsDollarBalance.map(
                                                        (entry, index) => (
                                                            <TableRow
                                                                key={`dollarbalance-${entry.account}`}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {ellipseAddress(
                                                                        entry.account
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {getNumberFromBigNumber(
                                                                        entry.balance
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <h1>Yes/No Balance</h1>
                                        <TableContainer component={Paper}>
                                            <Table
                                                className={classes.table}
                                                aria-label="simple table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Account
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Yes
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            No
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {marketYesNoBalanceList.map(
                                                        (entry, index) => (
                                                            <TableRow
                                                                key={`yesnobaalance2-${entry.holder}`}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {ellipseAddress(
                                                                        entry.holder
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {entry.yesBalnce
                                                                        ? getNumberFromBigNumber(
                                                                              entry.yesBalnce
                                                                          )
                                                                        : "0"}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {entry.noBalance
                                                                        ? getNumberFromBigNumber(
                                                                              entry.noBalance
                                                                          )
                                                                        : "0"}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <h1>Pool share</h1>
                                        <TableContainer component={Paper}>
                                            <Table
                                                className={classes.table}
                                                aria-label="simple table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            Account
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            Yes
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {marketShareBalanceList.map(
                                                        (entry, index) => (
                                                            <TableRow
                                                                key={`dollarbalance-${entry.account}`}
                                                            >
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row"
                                                                >
                                                                    {ellipseAddress(
                                                                        entry.account
                                                                    )}
                                                                </TableCell>
                                                                <TableCell align="right">
                                                                    {getNumberFromBigNumber(
                                                                        entry.balance
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                )}
                {!accountContext.account && (
                    <div className={classes.ConnectWrap}>
                        <ConnectButton />
                    </div>
                )}
            </div>
        </>
    );
}

export default MarketTest;
