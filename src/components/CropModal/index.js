import {useState, useRef} from 'react';
import Button from "../Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import AvatarEditor from 'react-avatar-editor'
import LoopIcon from '@material-ui/icons/Loop';
import {useStyles} from "./styles";

function CropModal(props) {

    const classes = useStyles();
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [editor, setEditor] = useState(null);
    const [isCropping, setIsCropping] = useState(false);

    const handleClose = () => {
        props.onClose && props.onClose();
    };

    const handleConfirm = async () => {
        setIsCropping(true);
        setTimeout(() => {
            const img = editor.getImageScaledToCanvas().toDataURL();
            props.onCrop && props.onCrop(img);
            handleClose();
            setIsCropping(false);
        }, 100);
    };

    const handleRotate = (e) => {
        setRotate(rotate + 90);
    };

    return (
        <Dialog
            classes={{
                paper: classes.paper, // class name, e.g. `classes-nesting-root-x`
            }}
            onClose={handleClose}
            aria-labelledby="CropModal-dialog-title"
            open={props.isOpen}
            disableBackdropClick={true}
        >
            <MuiDialogTitle
                id="CropModal-dialog-title"
                disableTypography
                className={classes.MuiDialogTitle}
            >
                <Typography className={classes.DialogTitle} variant="h6">
                    Edit image
                </Typography>
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={handleClose}
                >
                    <CloseIcon/>
                </IconButton>
            </MuiDialogTitle>
            <MuiDialogContent className={classes.MuiDialogContent}>
                <div>
                    <AvatarEditor
                        ref={(newVal) => {
                            if(newVal) {
                                setEditor(newVal);
                            }
                        }}
                        image={props.file}
                        width={300}
                        height={300}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={zoom}
                        rotate={parseFloat(rotate)}
                        borderRadius={500}
                    />
                </div>
                <div className={classes.Actions}>
                    <input
                        name="scale"
                        type="range"
                        onChange={(e) => {setZoom(parseFloat(e.target.value))}}
                        checked={zoom}
                        max="2"
                        step="0.01"
                        defaultValue="1"
                    />
                    <Button
                        color={"gray"}
                        onClick={handleRotate}
                        size={"small"}
                    >
                        <LoopIcon/>
                    </Button>
                </div>
            </MuiDialogContent>
            <MuiDialogActions className={classes.MuiDialogActions}>
                <Button
                    className={classes.MuiDialogActions__CancelBtn}
                    color={"gray"}
                    onClick={handleClose}
                    size={"small"}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleConfirm}
                    className={classes.MuiDialogActions__ConfirmBtn}
                    color={"primary"}
                    size={"small"}
                    isProcessing={isCropping}
                >
                    Confirm
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}

export default CropModal;
