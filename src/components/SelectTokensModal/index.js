import React, {useContext, useEffect, useState} from "react";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from '@material-ui/core/Slide';
import {CircularProgress} from "@material-ui/core";
import { useStyles } from "./styles";
import { AccountContext } from "../../shared/AccountContextProvider";
import {
    getWalletBalanceOfContractWithAddress
} from "../../methods/shared.methods";

import {fromWei} from "../../shared/helper";
import {getTokensList} from "../../shared/contracts/contracts.helper";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});


export const useGetTokens = (name) => {

    const tokensList = getTokensList();

    const [filteredTokens, setFilteredTokens] = useState(tokensList.slice(0, 10));

    useEffect(() => {
        if(name && name != "") {
            setFilteredTokens(tokensList.filter((entry) => {
                return entry.name.indexOf(name) > -1 || entry.symbol.indexOf(name) > -1;
            }).slice(0, 20));
        } else {
            setFilteredTokens(tokensList.slice(0, 10));
        }
    }, [name]);

    return filteredTokens;
}

function TokenEntity(props) {
    const accountContext = useContext(AccountContext);
    const classes = useStyles();
    const {entry} = props;
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [balance, setBalance] = useState(0);

    useEffect(() => {

        const init = async () => {
            try {
                const balance = await getWalletBalanceOfContractWithAddress(accountContext.account, props.entry.address);
                setBalance(balance);
            } catch (e) {

            } finally {
                setIsLoadingBalance(false);
            }
        }

        if(props.entry.address && accountContext.account) {
            init();
        }
    }, [props.entry.address, accountContext.account]);

    const balanceOfToken = parseFloat(fromWei(balance || 0)).toFixed(2);

    return (
        <div className={classes.Token}
             onClick={() => {
                 if(isLoadingBalance) {
                     return;
                 }

                 props.onSelectToken({
                     ...entry,
                     balance: balance
                 })
             }}>
            <div className={classes.Token__Img}>
                <img src={entry.logoURI}/>
            </div>
            <div className={classes.Token__NameSymbol}>
                <div className={classes.Token__Symbol}>{entry.symbol}</div>
                <div className={classes.Token__Name}>{entry.name}</div>
            </div>
            <div className={classes.UserVal}>
                {
                    isLoadingBalance ? (
                        <div className={classes.LoadingWrap}>
                            <CircularProgress size={14}/>
                        </div>
                    ) : (
                        balanceOfToken
                    )
                }
            </div>
        </div>
    );
}

function SelectTokensModal(props) {
    const [searchInput, setSearchInput] = useState('');
    const tokens = useGetTokens(searchInput);
    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            keepMounted
            classes={{
                paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
            }}
            onClose={handleClose}
            aria-labelledby="DepositModal-dialog-title"
            open={props.open}
            disableBackdropClick={true}
        >
            <MuiDialogTitle
                id="DepositModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    Search your token
                </Typography>
                {handleClose && (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.SearchWrapper}>
                    <input type={'text'}
                           value={searchInput}
                           onChange={(e) => setSearchInput(e.target.value)}
                           placeholder={'Search your token'}/>
                </div>
                <div className={classes.TokensList}>
                    {
                        tokens.map((entry) => {
                            return (
                                <TokenEntity
                                    onSelectToken={(entry) => {
                                        props.onSelectToken && props.onSelectToken(entry);
                                        handleClose();
                                    }}
                                    key={`Token-${entry.symbol}`}
                                    entry={entry}/>
                            )
                        })
                    }
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default SelectTokensModal;
