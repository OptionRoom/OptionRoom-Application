import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    CreateMarketPage:{},
    CreateMarketPage__Main:{
        maxWidth: '600px',
        margin: '0 auto'
    },
    CreateMarketBox:{
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 0 20px 0 #E6EDFF",
        marginBottom: '24px',
        padding: '24px'
    },
    CreateMarket__Section:{},
    CreateMarket__Field:{
        paddingBottom: '24px',
        marginBottom: '24px',
        borderBottom: '1px solid #EDEFF4',
        '&:last-child': {
            borderBottom: 'none',
            paddingBottom: 0
        }
    },
    CreateMarket__FieldTitle:{
        color: "#4E5D6D",
        fontSize: "14px",
        letterSpacing: "0",
        lineHeight: "24px",
        marginBottom: '4px'
    },
    CreateMarket__FieldBody:{
        position: 'relative',
        '& input, & textarea': {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            display: 'block',
            width: '100%',
            color: "#99A6B7",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "14px",
            padding: '16.5px',
            outline: 'none',

        }
    },
    CreateMarket__FieldSources: {
        '& $CreateMarket__FieldBody' : {
            display: 'flex',
            alignItems: 'center',
            '& input': {
                marginRight: '15px',
                width: 'calc(100% - 70px)'
            },
            '& button': {
                width: '56px'
            }
        }
    },
    CreateMarket__LiquidityInput: {
        paddingRight: '200px'
    },
    CreateMarket__FieldAddon: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        right: '8.5px',
        transform: 'translateY(-50%)',
    },
    Liquidity__AddBtn: {
        height: "40px",
        width: "96px"
    },
    Liquidity__MaxBtn: {
        color: "#004BFF",
        fontSize: "14px",
        fontWeight: 500,
        letterSpacing: "0",
        lineHeight: "24px",
        background: 'none !important',
        boxShadow: 'none !important',
        textDecoration: 'underline !important',
        cursor: 'pointer',
        marginRight: '12px'
    },
    CreateMarket__FieldBodyImg: {
        border: "1px solid #D2D9E1",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: '16px',
        textAlign: 'center',
        '& div': {
            color: "#5F7184",
            fontFamily: "Poppins",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "14px",
            marginBottom: '24px'
        },
        '& button': {
            width: '96px'
        }

    },
    CreateBtnWrap:{
        padding: '0 24px'
    },
    CreateMarketBoxInfo: {
        '& div:first-child': {
            color: "#3F4A57",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0",
            lineHeight: "24px",
            marginBottom: '24px'
        },
        '& div:last-child': {
            color: "#4E5D6D",
            fontSize: "14px",
            letterSpacing: "0",
            lineHeight: "24px"
        },
    },
    DateTimePickerField: {
        '& .MuiFormControl-root': {
            width: '100%'
        },
        '& .MuiInput-underline:after, & .MuiInput-underline:before': {
            display: 'none !important'
        }
    },
    CreateMarket__CategoryField: {
        '& .CreateMarket__CategoryField__value-container': {
            padding: '10.5px 16px'
        },
        '& .CreateMarket__CategoryField__control': {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            '& .CreateMarket__CategoryField__indicator-separator': {
                display: 'none'
            }
        }
    }
}));
