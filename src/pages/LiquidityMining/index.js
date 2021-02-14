import {useState} from 'react';
import Button from '@material-ui/core/Button';

import {useStyles} from './styles';

function LiquidityMining() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.LiquidityMiningPage}>
            <div className={classes.Pools}>
                {
                    ["1", "1", "1"].map((pool) => (
                        <div className={classes.Pool}>
                            <div className={classes.Pool__Icon}>

                            </div>
                            <div className={classes.Pool__Title}>
                                Deposit ROOM-USDT LP
                            </div>
                            <div className={classes.Pool__Action}>
                                <Button className={classes.Pool__Action__Btn}
                                        variant="contained"
                                        color="primary">
                                    Earn $COURT
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default LiquidityMining;
