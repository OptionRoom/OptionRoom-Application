import React from "react";
import {get} from 'lodash';

import {useStyles} from "./styles";

function OptionsWidget(props) {
    const classes = useStyles();
    return (
        <div className={classes.OptionsWidget}>
            <div className={classes.OptionsWidget__Header}>
                Market Options
            </div>
            <div className={classes.Options}>
                {get(props, ['marketInfo', 'info', 'choices'], []).map((entry) => {
                    return (
                        <div className={classes.Option}>
                            {entry}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default OptionsWidget;
