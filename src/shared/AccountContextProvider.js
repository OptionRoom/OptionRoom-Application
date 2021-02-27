import React, { useState, useEffect } from "react";

import { walletHelper } from "./wallet.helper";

const walletHelperInsatnce = walletHelper();

export const AccountContext = React.createContext({
    account: null,
    chainId: null,
    networkId: null,
    connect: () => {
    },
    disconnect: () => {
    },
});

// Defining a simple HOC component
const AccountContextProvider = (props) => {
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [networkId, setNetworkId] = useState(null);


    const handleDisconnect = async () => {
        setChainId(null);
        setNetworkId(null);
        setAccount(null);
        walletHelperInsatnce.disconnect();
    };

    const handleConnect = async () => {
        return walletHelperInsatnce.connect();
    };

    useEffect(() => {
        walletHelperInsatnce.on("change", (data) => {
            console.log("change", data);
            setChainId(data.chainId);
            setNetworkId(data.networkId);
            setAccount(data.account);
        })

        walletHelperInsatnce.checkConnected();
    }, []);

    return (
        <AccountContext.Provider
            value={{
                account: account,
                chainId: chainId,
                networkId: networkId,
                connect: handleConnect,
                disconnect: handleDisconnect,
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
