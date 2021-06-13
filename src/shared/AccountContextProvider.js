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

    const isChain = (chain) => {
        if(chain === 'main') {
            return chainId == 1;
        }

        if(chain === 'bsc') {
            return chainId == 56;
        }

        if(chain === 'ropsten') {
            return chainId == 3;
        }

        return chain == chainId;
    };

    const handleConnect = async () => {
        return walletHelperInsatnce.connect();
    };

    useEffect(() => {
        walletHelperInsatnce.on("change", (data) => {
            console.log("data", data);
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
                isChain: isChain,
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
