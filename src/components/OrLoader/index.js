import Lottie from "react-lottie";
import animationData from "../../assets/loader";
import React from "react";
import {useStyles} from "./styles";

function OrLoader(props) {
    const classes = useStyles();

    return (
        <div className={classes.LoaderWrap}>
            <Lottie options={
                {
                    loop: true,
                    autoplay: true,
                    animationData: animationData,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }
            }
                    height={props.height || 300}
                    width={props.width || 300}/>
        </div>
    );
}

export default OrLoader;
