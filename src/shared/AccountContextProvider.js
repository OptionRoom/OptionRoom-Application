import React, {useState, useEffect} from "react";
import Web3Modal from "web3modal";
import Web3 from "web3";


function initWeb3(provider) {
    const web3 = new Web3(provider);

    web3.eth.extend({
        methods: [
            {
                name: "chainId",
                call: "eth_chainId",
                outputFormatter: web3.utils.hexToNumber
            }
        ]
    });

    return web3;
}

export const AccountContext = React.createContext({
    web3Instance: null,
    web3Modal: null,
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
    const [web3Instance, setWeb3Instance] = useState(null);
    const [web3Modal, setWeb3Modal] = useState(null);
    const [account, setAccount] = useState(null);
    const [chainId, setChainId] = useState(null);
    const [networkId, setNetworkId] = useState(null);

    const handleDisconnect = async () => {

        if (web3Instance && web3Instance.currentProvider && web3Instance.currentProvider.close) {
            await web3Instance.currentProvider.close();
        }

        await web3Modal.clearCachedProvider();

        setChainId(null);
        setNetworkId(null);
        setAccount(null);
    };

    const handleConnect = async (web3Modal2) => {
        const web3ModalInstance = web3Modal ? web3Modal : web3Modal2;

        const provider = await web3ModalInstance.connect();
        provider.on("close", handleDisconnect);

        provider.on("accountsChanged", async (accounts) => {
            setAccount(accounts[0]);
        });

        provider.on("chainChanged", async (chainId) => {
            const networkId = await web3Instance.eth.net.getId();
            setChainId(chainId);
            setNetworkId(networkId);
        });

        provider.on("networkChanged", async (networkId) => {
            const chainId = await web3Instance.eth.chainId();
            setChainId(chainId);
            setNetworkId(networkId);
        });

        const newWeb3 = initWeb3(provider);
        setWeb3Instance(newWeb3);

        const accounts = await newWeb3.eth.getAccounts();
        const networkId = await newWeb3.eth.net.getId();
        const chainId = await newWeb3.eth.chainId();
        setChainId(chainId);
        setNetworkId(networkId);
        setAccount(accounts[0]);
    };


    useEffect(async () => {
        const web3Modal = new Web3Modal({
            /*        network: getNetwork(),
                    cacheProvider: true,
                    providerOptions: this.getProviderOptions()*/
            network: "ropsten", // optional
            cacheProvider: true, // optional
            providerOptions: {}
        });

        setWeb3Modal(web3Modal);

        if (web3Modal.cachedProvider) {
            handleConnect(web3Modal);
        }

    }, []);

    return (
        <AccountContext.Provider
            value={{
                web3Instance: web3Instance,
                web3Modal: web3Modal,
                account: account,
                chainId: chainId,
                networkId: networkId,
                connect: handleConnect,
                disconnect: handleDisconnect
            }}
        >
            {props.children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
