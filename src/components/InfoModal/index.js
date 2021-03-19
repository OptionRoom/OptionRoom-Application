import React from "react";

import Button from "../Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useStyles } from "./styles";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles2 = makeStyles({
    table: {
        minWidth: 480,
    },
});

const rows = ["1d", "7d", "30d", "365d"];

function InfoModal(props) {
    const { pool, info } = props;
    const classes = useStyles();
    const classes2 = useStyles2();

    const handleClose = () => {
        props.onClose();
    };

    const getPurchaseBtnConfig = () => {
        if (!pool) {
            return {
                title: "",
                link: "",
            };
        }

        if (pool === "ROOM_COURT") {
            return {
                title: "Get ROOM Tokens",
                link:
                    "https://app.uniswap.org/#/swap?inputCurrency=0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64",
            };
        }

        if (pool === "ROOM_ETH_LP_EARN_COURT") {
            return {
                title: "Get ROOM/ETH LP Tokens",
                link:
                    "https://app.uniswap.org/#/add/0xad4f86a25bbc20ffb751f2fac312a0b4d8f88c64/ETH",
            };
        }

        if (pool === "HT_COURT") {
            return {
                title: "Get HT Tokens",
                link:
                    "https://app.uniswap.org/#/swap?inputCurrency=0x6f259637dcD74C767781E37Bc6133cd6A68aa161",
            };
        }

        if (pool === "MATTER_COURT") {
            return {
                title: "Get MATTER Tokens",
                link:
                    "https://app.uniswap.org/#/swap?inputCurrency=0x1c9491865a1de77c5b6e19d2e6a5f1d7a6f2b25f",
            };
        }
    };

    const getModalTitle = () => {
        if (!pool) {
            return "ROI";
        }

        if (pool === "ROOM_COURT") {
            return "ROI for ROOM farm";
        }

        if (pool === "ROOM_ETH_LP_EARN_COURT") {
            return "ROI for ROOM/ETH LP farm";
        }

        if (pool === "HT_COURT") {
            return "ROI for HT farm";
        }

        if (pool === "MATTER_COURT") {
            return "ROI for MATTER farm";
        }
    };

    const getValue = (row) => {
        if (!pool || !info) {
            return;
        }

        let tokensPerDay = 0;
        if (pool === "ROOM_COURT") {
            tokensPerDay = info["room"].tokensPerDay;
        }

        if (pool === "ROOM_ETH_LP_EARN_COURT") {
            tokensPerDay = info["room_eth_lp"].tokensPerDay;
        }

        if (pool === "HT_COURT") {
            tokensPerDay = info["ht"].tokensPerDay;
        }

        if (pool === "MATTER_COURT") {
            tokensPerDay = info["matter"].tokensPerDay;
        }

        if (row === "1d") {
            return Number.parseFloat(tokensPerDay).toFixed(2);
        }

        if (row === "7d") {
            return Number.parseFloat(tokensPerDay * 7).toFixed(2);
        }

        if (row === "30d") {
            return Number.parseFloat(tokensPerDay * 30).toFixed(2);
        }

        if (row === "365d") {
            return Number.parseFloat(tokensPerDay * 365).toFixed(2);
        }
    };

    return (
        <Dialog
            classes={{
                paper: classes.paper,
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
                <Typography className={classes.DialogTitle} variant="h6">
                    {getModalTitle()}
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
                <TableContainer component={Paper}>
                    <Table className={classes2.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>TIMEFRAME</TableCell>
                                <TableCell>COURT PER $1000</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row}>
                                    <TableCell component="th" scope="row">
                                        {row}
                                    </TableCell>
                                    <TableCell>{getValue(row)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <p>
                    Calculated based on current rates. Rates are estimates provided for your convenience only, and
                    by no means represent guaranteed returns.
                </p>
                <div className={classes.GetTokenWrap}>
                    <Button
                        color="primary"
                        target="_blank"
                        href={getPurchaseBtnConfig().link}
                        endIcon={<OpenInNewIcon>send</OpenInNewIcon>}
                    >
                        {getPurchaseBtnConfig().title}
                    </Button>
                </div>
            </MuiDialogContent>
        </Dialog>
    );
}

export default InfoModal;
