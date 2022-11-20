import {MaxUint256} from "../shared/constants";
import {getContract, getContractAddress, getTokenContract} from "../shared/contracts/contracts.helper";

export const getWalletAllowanceOfContractWithAddress = (wallet, source, spender) => {
    const contract = getTokenContract(source);

    return contract
        .methods
        .allowance(wallet, spender)
        .call({
            from: wallet,
        });
};

export const getWalletBalanceOfContractWithAddress = (wallet, contractAddress) => {
    const contract = getTokenContract(contractAddress);

    return contract
        .methods
        .balanceOf(wallet)
        .call({
            from: wallet,
        });
};

export const getWalletBalanceOfContract = (wallet, contractName) => {
    const contract = getContract(contractName);

    return contract
        .methods
        .balanceOf(wallet)
        .call({
            from: wallet,
        });
};

export const getWalletAllowanceOfContractToSpenderByAddress = (wallet, source, spender) => {
    const sourceContract = getContract(source);
    const spenderContractAddress = getContractAddress(spender);

    return sourceContract
        .methods
        .allowance(wallet, spenderContractAddress)
        .call({
            from: wallet,
        });
};

export const getWalletAllowanceOfContractToSpender = (wallet, source, spender) => {
    const sourceContract = getContract(source);
    const spenderContractAddress = getContractAddress(spender);

    return sourceContract
        .methods
        .allowance(wallet, spenderContractAddress)
        .call({
            from: wallet,
        });
};

export const approveContractForSpender = (wallet, source, spender, amount) => {
    const sourceContract = getContract(source);
    const spenderContractAddress = getContractAddress(spender);

    return sourceContract
        .methods
        .approve(spenderContractAddress, amount ? amount : MaxUint256)
        .send({
            from: wallet,
        });
};

export const approveTokenForSpenderWithAddress = (wallet, source, spender, amount) => {
    const contract = getTokenContract(source);

    return contract
        .methods
        .approve(spender, amount ? amount : MaxUint256)
        .send({
            from: wallet,
        });
};
