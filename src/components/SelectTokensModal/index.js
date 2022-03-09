import React, {useContext, useEffect, useState} from "react";

import tokensList from '../../shared/pancakeswap-extended.json';
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
import {useQuery} from "react-query";
import {getWalletBalanceOfContract, getWalletBalanceOfContractWithAddress} from "../../methods/shared.methods";
import {fromWei} from "../../shared/helper";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export const useGetTokens = (name) => {
    const [filteredTokens, setFilteredTokens] = useState(tokensList.tokens.slice(0, 10));

    useEffect(() => {

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

    return (
        <div className={classes.Token}>
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
                        fromWei(balance || 0)
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

    console.log({tokens});

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
