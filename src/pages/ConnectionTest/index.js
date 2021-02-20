import {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';

import {useStyles} from './styles';
import {getDaiContract} from '../../shared/helper';

import {AccountContext} from '../../shared/AccountContextProvider';

function ConnectionTest() {
    const classes = useStyles();

    const accountContext = useContext(AccountContext);

    const [myNum, setMyNum] = useState('N/A');
    const [newMyNum, setNewMyNum] = useState('N/A');
    const [accountAddress, setAccountAddress] = useState('N/A');
    const [accountAddressNum, setAccountAddressNum] = useState('N/A');

    const handleOnConnect = async () => {
        accountContext.connect();
    };

    const handleGetMyNum = async () => {
        try {
            const dai = getDaiContract(1, accountContext.web3Instance);

            const result = await dai.methods
                .getNum()
                .call({
                    from: accountContext.account
                });

        } catch (e) {
            console.log("error", e);
        }
    };

    const handleSetMyNum = async (address, chainId, web3, newNum) => {
        try {
            const dai = getDaiContract(1, accountContext.web3Instance);
            const result = await dai.methods
                .setNum(newMyNum)
                .send({
                    from: accountContext.account
                });
        } catch (e) {
            console.log("error", e);
        }
    };

    const handleGetAccountNum = async () => {
        try {
            const dai = getDaiContract(1, accountContext.web3Instance);
            const result = await dai.methods
                .getNumForAccount(accountAddress)
                .call({
                    from: accountContext.account
                });
        } catch (e) {
            console.log("error", e);
        }
    };

    return (
        <div className={classes.ConnectionTest}>
            {
                !accountContext.account && (
                    <Button variant="contained"
                            onClick={handleOnConnect}
                            color="primary">
                        Connect wallet dd
                    </Button>
                )
            }
            {
                accountContext.account && (
                    <div>

                        <div className={'SetAndGet'}>
                            <input type={'text'}
                                   value={myNum}
                                   disabled={true}
                            />
                            <Button variant="contained"
                                    onClick={handleGetMyNum}
                                    color="primary">
                                Get Num
                            </Button>
                        </div>
                        <br/>
                        <br/>
                        <div className={'SetAndGet'}>
                            <input type={'text'}
                                   value={newMyNum}
                                   onChange={(e) => setNewMyNum(e.target.value)}
                            />
                            <Button variant="contained"
                                    onClick={handleSetMyNum}
                                    color="primary">
                                Set Num
                            </Button>
                        </div>
                        <br/>
                        <br/>
                        <div className={'SetAndGet'}>
                            <input type={'text'}
                                   value={accountAddress}
                                   onChange={(e) => setAccountAddress(e.target.value)}
                            />
                            <input type={'text'}
                                   value={accountAddressNum}
                                   disabled={true}
                            />
                            <Button variant="contained"
                                    onClick={handleGetAccountNum}
                                    color="primary">
                                Get Account Num
                            </Button>
                        </div>

                    </div>
                )
            }
        </div>
    );
}

export default ConnectionTest;
