import {useState} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Navbar from '../../components/Navbar';
import DepositModal from '../../components/DepositModal';

import {useStyles} from './styles';

function LiquidityMining() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const pools = [
        {
            title: 'Deposit ROOM-ETH LP',
            decs: 'EARN $ROOM'
        }
    ]

    return (
        <>
            <Navbar title={'Liquidity Mining Page'}
                    details={'Note: Current APY includes 2/3rd $COURT emission that is locked for 6 months.'}/>

            <div className={classes.LiquidityMiningPage}>
                <div className={classes.Pools}>
                    {
                        pools.map((pool) => (
                            <div className={classes.Pool}>
                                <div className={classes.Pool__Icon}></div>
                                <div className={classes.Pool__Title}>
                                    {pool.title}
                                </div>
                                <div className={classes.Pool__Action}>
                                    <Button className={classes.Pool__Action__Btn}
                                            variant="contained"
                                            color="primary">{pool.decs}</Button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        pools.map((pool) => (
                            <div className={classes.EarnCard}>
                                <div className={classes.EarnCard__Icon}></div>
                                <div className={classes.EarnCard__Title}>0.00000000</div>
                                <div className={classes.EarnCard__SubTitle}>$COURT Earned</div>
                                <div className={classes.EarnCard__Action}>
                                    <Button className={classes.EarnCard__Action__Btn}
                                            variant="contained"
                                            color="primary">{pool.decs}</Button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        pools.map((pool) => (
                            <div className={classes.EarnCard}>
                                <div className={classes.EarnCard__Icon}></div>
                                <div className={classes.EarnCard__Title}>0.00000000</div>
                                <div className={classes.EarnCard__SubTitle}>$COURT Earned</div>
                                <div className={classes.EarnCard__Action}>
                                    <Button classes={{
                                        root: classes.EarnCard__Action__Btn,
                                        disabled: classes.EarnCard__Action__Btn__Disabled
                                    }}
                                            disabled={true}
                                            variant="contained"
                                            color="primary">
                                        {pool.decs}
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                    {
                        pools.map((pool) => (
                            <div className={classes.EarnCard}>
                                <div className={classes.EarnCard__Icon}></div>
                                <div className={classes.EarnCard__Title}>0.00000000</div>
                                <div className={classes.EarnCard__SubTitle}>$COURT Earned</div>
                                <div className={`${classes.EarnCard__Action} ${classes.EarnCard__Action_Two}`}>
                                    <Button classes={{
                                        root: classes.EarnCard__Action__Btn,
                                        disabled: classes.EarnCard__Action__Btn__Disabled
                                    }}
                                            variant="contained"
                                            color="primary">
                                        Unstake
                                    </Button>
                                    <Button classes={{
                                        root: classes.EarnCard__Action__Btn_Add,
                                        disabled: classes.EarnCard__Action__Btn__Disabled
                                    }}
                                            variant="contained">
                                        <AddIcon className={classes.EarnCard__Action__Btn_Add__Icon}></AddIcon>
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <DepositModal open={isDepositModalOpen}
                          onClose={() => setIsDepositModalOpen(false)}/>
        </>
    );
}

export default LiquidityMining;
