import Web3Modal from "web3modal";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import ConfigHelper from "./config.helper";

class WalletHelper {
    constructor() {
        this._events = {};
        this.web3 = null;
        this.web3Modal = null;
        this.provider = null;
        this.chainId = null;
        this.account = null;
        this.networkId = null;
        this.mainnetWeb3 = new Web3(
            new Web3.providers.HttpProvider(
                `https://mainnet.infura.io/v3/${ConfigHelper.getInfuraAppId()}`
            )
        );

        const init = async () => {
            this.web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions: {
                    walletconnect: {
                        package: WalletConnectProvider,
                        options: {
                            infuraId: ConfigHelper.getInfuraAppId() // required
                        }
                    }
                },
                disableInjectedProvider: false,
            });
        }

        init();
    }

    async fetchAccountData() {
        this.web3 = new Web3(this.provider);
        const chainId = await this.web3.eth.getChainId();
        const accounts = await this.web3.eth.getAccounts();
        const networkId = await this.web3.eth.net.getId();
        const account = accounts[0];

        if (this.chainId != chainId || this.networkId != networkId || account != this.account) {
            this.chainId = chainId;
            this.networkId = networkId;
            this.account = account;
            this.emit("change", {
                chainId,
                networkId,
                account
            })
        }
    }

    checkConnected() {
        if (this.web3Modal.cachedProvider) {
            this.connect();
        }
    }

    async connect() {
        try {
            this.provider = await this.web3Modal.connect();
            // Subscribe to accounts change
            this.provider.on("accountsChanged", (accounts) => {
                this.fetchAccountData();
            });

            // Subscribe to chainId change
            this.provider.on("chainChanged", (chainId) => {
                this.fetchAccountData();
            });

            // Subscribe to networkId change
            this.provider.on("networkChanged", (networkId) => {
                this.fetchAccountData();
            });

            await this.fetchAccountData();

        } catch (e) {
            console.log("Could not get a wallet connection", e);
            return;
        }
    }

    async disconnect() {
        if (this.provider.close) {
            await this.provider.close();
        }

        await this.web3Modal.clearCachedProvider();
        this.provider = null;
        this.chainId = null;
        this.networkId = null;
        this.account = null;
        this.web3 = null;
    }

    getChainId() {
        return this.chainId;
    }

    getWeb3(forceMainnet) {
        if (forceMainnet){
            return this.mainnetWeb3;
        }

        if (!this.web3) {
            this.web3 = new Web3(this.provider);
        }

        return this.web3;
    }

    async signWallet(message) {
        const web3 = this.getWeb3();
        return web3.eth.personal.sign(message, this.account, ConfigHelper.getAuthSignMessage());
    }

    on(name, listener) {
        if (!this._events[name]) {
            this._events[name] = [];
        }

        this._events[name].push(listener);
    }

    removeListener(name, listenerToRemove) {
        if (!this._events[name]) {
            throw new Error(`Can't remove a listener. Event "${name}" doesn't exits.`);
        }

        const filterListeners = (listener) => listener !== listenerToRemove;

        this._events[name] = this._events[name].filter(filterListeners);
    }

    emit(name, data) {
        if (!this._events[name]) {
            throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
        }

        const fireCallbacks = (callback) => {
            callback(data);
        };

        this._events[name].forEach(fireCallbacks);
    }
}

const newWallet = new WalletHelper();
export const walletHelper = () => newWallet;
