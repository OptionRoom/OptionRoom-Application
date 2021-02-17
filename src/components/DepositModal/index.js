import React, {useContext} from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {useStyles} from './styles'
import {AccountContext} from "../../shared/AccountContextProvider";
import Drawer from "@material-ui/core/Drawer";

function DepositModal(props) {
    const accountContext = useContext(AccountContext);
    const classes = useStyles();

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog classes={{
            paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
        }}
                onClose={handleClose}
                aria-labelledby="DepositModal-dialog-title"
                open={props.open}>
            <MuiDialogTitle id="DepositModal-dialog-title"
                            disableTypography
                            className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle}
                            variant="h6">
                    Deposit Tokens
                </Typography>
                {
                    handleClose && (
                        <IconButton aria-label="close"
                                    className={classes.closeButton}
                                    onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    )
                }
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div className={classes.Modal__Text}>
                    When unreachable, forward calls to a specific number.
                </div>
                <div className={classes.Modal__TokensLabel}>
                    Tokens Available
                </div>
                <input className={clsx(classes.Modal__TokensInput, {
                    [classes.Modal__TokensInput__HasError]: true
                })}
                       type={'number'}/>
                <div className={classes.Modal__TokensErrorHelp}>
                    Invalid amount, you can't exceed it.
                </div>
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button variant="contained"
                        className={classes.MuiDialogActions__CancelBtn}>
                    Cancel
                </Button>
                <Button autoFocus
                        variant={'contained'}
                        onClick={handleClose}
                        color="primary"
                        className={classes.MuiDialogActions__ConfirmBtn}>
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default DepositModal;
