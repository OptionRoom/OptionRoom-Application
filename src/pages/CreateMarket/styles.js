import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => {
    return {
        '& textarea': {

        },
        LoadingWrapper: {
            padding: '100px',
            textAlign: 'center'
        },
        CreateMarketPage:{
            [theme.breakpoints.up('md')]: {
                padding: '50px'
            },
            padding: '10px'
        },
        CreateMarketPage__Main:{
            maxWidth: '600px',
            //margin: '0 auto'
        },
        CreateMarketBox:{
            borderRadius: "16px",
            backgroundColor: theme.isDark ? "#242D38" : "#fff",
            boxShadow: theme.colors.boxBoxShadow,
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
        CreateMarket__FieldTitleRequired: {
            color: 'red'
        },
        CreateMarket__FieldTitleLiquidity: {
            display: 'flex',
            alignItems: 'center',
            '&>span:first-child': {
                marginRight: 'auto'
            }
        },
        CreateMarket__FieldTitle__helper: {
            fontSize: '12px'
        },
        CreateMarket__FieldBody:{
            position: 'relative',
            '& input, & textarea': {
                border: `1px solid ${theme.colors.inputBorder}`,
                borderRadius: "8px",
                backgroundColor: theme.isDark ? "#353F4D": "#EDF1F5",
                display: 'block',
                width: '100%',
                color: theme.isDark ? "#fff" : "#000",
                fontSize: "14px",
                letterSpacing: "0",
                //lineHeight: "14px",
                padding: '16.5px',
                outline: 'none',
                maxWidth: '100%',
                fontFamily: [
                    'Open Sans',
                    //'Kanit',
                    'sans-serif',
                ].join(',')
            }
        },
        CreateMarket__FieldBodyFieldError: {
            marginTop: '8px',
            color: 'red'
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
        CreateMarket__Sources: {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            backgroundColor: theme.isDark ? "#141A22": "#EDF1F5",
            padding: '16px',
            marginTop: '8px',
            width: '100%',
            '& >div': {
                padding: '4px 8px',
                borderRadius: "8px",
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                '& span:first-child': {
                    marginRight: 'auto'
                },
                '&:last-child': {
                    marginBottom: 0,
                }
            },
            '& input': {
                background: theme.isDark ? "#353F4D" : "#fff"
            }
        },
        RemoveSourceIcon: {
            cursor: 'pointer',
            color: 'black'
        },
        CreateMarket__FieldBodyImg: {
            border: "1px solid #D2D9E1",
            borderRadius: "8px",
            backgroundColor: theme.isDark ? "#353F4D": "#EDF1F5",
            padding: '16px',
        },
        CreateMarket__FieldBodyImgEmpty: {
            textAlign: 'center',
            '& div': {
                color: "#5F7184",
                fontSize: "14px",
                letterSpacing: "0",
                lineHeight: "14px",
                marginBottom: '24px'
            },
            '& button': {
                width: '96px'
            }
        },
        CreateMarket__FieldBodySelected: {
            textAlign: 'center',

        },
        MarketImgFileWrap: {
            height: "96px",
            width: "96px",
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            boxShadow: theme.colors.boxBoxShadow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
        },
        MarketImgFileWrap__Img: {
            height: "64px",
            width: "64px",
            borderRadius: '50%'
        },
        CreateBtnWrap:{
            padding: '0 24px'
        },
        CreateNote: {
            margin: '20px 0 0',
            textAlign: 'center',
            color: theme.isDark ? "#fff" : "#222",
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
        ConnectWrap: {
            padding: '100px',
            textAlign: 'center'
        },
    }
});
