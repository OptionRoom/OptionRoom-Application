import * as blockies from "blockies-ts";
import {formatFixed, parseFixed} from "@ethersproject/bignumber";

import {supportedChains} from './chains';

function toFixed(num, fixed) {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

export const convertAmountToTokens = (amount) => {
    return toFixed(formatFixed(`${amount}`, 18), 2);
};

export const convertTokensToAmount = (amount) => {
    return parseFixed(`${amount}`, 18);
};

export const ellipseAddress = (address, width = 10) => {
    return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export const getAddressImgUrl = (address) => {
    const seed = address.toLowerCase() || "";
    const imgUrl = blockies
        .create({
            seed,
        })
        .toDataURL();

    return imgUrl;
};

export function getChainData(chainId) {
    const chainData = supportedChains.filter(
        (chain) => chain.chain_id === chainId
    )[0];

    if (!chainData) {
        throw new Error("ChainId missing or not supported");
    }

    const API_KEY = process.env.REACT_APP_INFURA_ID;

    if (
        chainData.rpc_url.includes("infura.io") &&
        chainData.rpc_url.includes("%API_KEY%") &&
        API_KEY
    ) {
        const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

        return {
            ...chainData,
            rpc_url: rpcUrl
        };
    }

    return chainData;
};

export function getDaiContract(chainId, web3) {
    const DAI_CONTRACT = {
        1: {
            address: "0x1874F8bb03e932178A0B53FcBF5Ca04f93FdF01E",
            abi: [{
                "constant": true,
                "inputs": [],
                "name": "getLastSetNumCaller",
                "outputs": [{"internalType": "address", "name": "lastSetCaller", "type": "address"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "getNum",
                "outputs": [{"internalType": "uint256", "name": "num", "type": "uint256"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "getNum2",
                "outputs": [{"internalType": "uint256", "name": "num", "type": "uint256"}, {
                    "internalType": "address",
                    "name": "caller",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
                "name": "getNumForAccount",
                "outputs": [{"internalType": "uint256", "name": "num", "type": "uint256"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
                "name": "getNumForAccount2",
                "outputs": [{"internalType": "uint256", "name": "num", "type": "uint256"}, {
                    "internalType": "address",
                    "name": "iAcount",
                    "type": "address"
                }, {"internalType": "address", "name": "caller", "type": "address"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [],
                "name": "lastSetNumCaller",
                "outputs": [{"internalType": "address", "name": "", "type": "address"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }, {
                "constant": false,
                "inputs": [{"internalType": "uint256", "name": "num", "type": "uint256"}],
                "name": "setNum",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }, {
                "constant": true,
                "inputs": [{"internalType": "address", "name": "", "type": "address"}],
                "name": "store",
                "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }]

        }
    };

    const dai = new web3.eth.Contract(
        DAI_CONTRACT[chainId].abi,
        DAI_CONTRACT[chainId].address
    );

    return dai;
}
