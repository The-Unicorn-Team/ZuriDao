import { makeStyles } from "@mui/styles";

export const useResponsive = makeStyles(theme => ({
    smAlignCenter: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center !important'
        }
    },
    smAlignStretch: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'stretch !important'
        }
    },
    smFlex: {
        [theme.breakpoints.up('sm')]: {
            display: 'flex !important'//
        }
    },
    smInlineBlock: {
        [theme.breakpoints.up('sm')]: {
            display: 'inline-block !important'
        }
    },
    smNone: {
        [theme.breakpoints.up('sm')]: {
            display: 'none !important'
        }
    },
    smRow: {
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row !important'
        }
    },
    smAlignStart: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-start !important'
        }
    },
    smColumn: {
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'column !important'
        }
    },
    smJustifyEnd: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-end !important'
        }
    },
    smJustifyStart: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'flex-start !important'
        }
    },
    smJustifyCenter: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'center !important'
        }
    },
    smJustifyBetween: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'space-between !important'
        }
    },
    mdAlignCenter: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'center !important'
        }
    },
    mdAlignStart: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-start !important'
        }
    },
    mdAlignEnd: {
        [theme.breakpoints.up('md')]: {
            alignItems: 'flex-end !important'
        }
    },
    mdBlock: {
        [theme.breakpoints.up('md')]: {
            display: 'block !important'
        }
    },
    mdColumn: {
        [theme.breakpoints.up('md')]: {
            flexDirection: 'column !important'
        }
    },
    mdFlex: {
        [theme.breakpoints.up('md')]: {
            display: 'flex !important'
        }
    },
    mdNone: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important'
        }
    },
    mdRow: {
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row !important'
        }
    },
    mdRowReverse: {
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row-reverse !important'
        }
    },
    mdJustifyBetween: {
        [theme.breakpoints.up('md')]: {
            justifyContent: 'space-between !important'
        }
    },
    mdJustifyCenter: {
        [theme.breakpoints.up('md')]: {
            justifyContent: 'center !important'
        }
    },
    smMb0: {
        [theme.breakpoints.up('sm')]: {
            marginBottom: '0rem !important'
        }
    },
    smMt0: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '0rem !important'
        }
    },
    smMt1: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '1rem !important'
        }
    },
    smMt2: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '2rem !important'
        }
    },
    smMt3: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '3rem !important'
        }
    },
    smMl0: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '0rem !important'
        }
    },
    smMl1: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '1rem !important'
        }
    },
    smMl2: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '2rem !important'
        }
    },
    smMl3: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: '3rem !important'
        }
    },
    smMr1: {
        [theme.breakpoints.up('sm')]: {
            marginRight: '1rem !important'
        }
    },
    smPb0: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '0 !important'
        }
    },
    smPb2: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '2rem !important'
        }
    },
    smPl2: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '2rem !important'
        }
    },
    smPr2: {
        [theme.breakpoints.up('sm')]: {
            paddingRight: '2rem !important'
        }
    },
    smPt0: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: '0 !important'
        }
    },
    smPt3: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: '3rem !important'
        }
    },
    mdMb0: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '0rem !important'
        }
    },
    smWAuto: {
        [theme.breakpoints.up('sm')]: {
            width: 'auto !important'
        }
    },
    mdMb1: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '1rem !important'
        }
    },
    mdMb2: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '2rem !important'
        }
    },
    mdMb3: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '3rem !important'
        }
    },
    mdMl0: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '0rem !important'
        }
    },
    mdMl1: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '1rem !important'
        }
    },
    mdMl2: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '2rem !important'
        }
    },
    mdMl3: {
        [theme.breakpoints.up('md')]: {
            marginLeft: '3rem !important'
        }
    },
    mdMr0: {
        [theme.breakpoints.up('md')]: {
            marginRight: '0rem !important'
        }
    },
    mdMr1: {
        [theme.breakpoints.up('md')]: {
            marginRight: '1rem !important'
        }
    },
    mdMr2: {
        [theme.breakpoints.up('md')]: {
            marginRight: '2rem !important'
        }
    },
    mdMr3: {
        [theme.breakpoints.up('md')]: {
            marginRight: '3rem !important'
        }
    },
    mdMt0: {
        [theme.breakpoints.up('md')]: {
            marginTop: '0rem !important'
        }
    },
    mdMt1: {
        [theme.breakpoints.up('md')]: {
            marginTop: '1rem !important'
        }
    },
    mdMt2: {
        [theme.breakpoints.up('md')]: {
            marginTop: '2rem !important'
        }
    },
    mdMt3: {
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem !important'
        }
    },
    mdPb2: {
        [theme.breakpoints.up('md')]: {
            paddingBottom: '2rem !important'
        }
    },
    mdPt0: {
        [theme.breakpoints.up('md')]: {
            paddingTop: '0rem !important'
        }
    },
    mdPt2: {
        [theme.breakpoints.up('md')]: {
            paddingTop: '2rem !important'
        }
    },
    mdPt3: {
        [theme.breakpoints.up('md')]: {
            paddingTop: '3rem !important'
        }
    },
    mdPl0: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '0rem !important'
        }
    },
    mdPl2: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '2rem !important'
        }
    },
    mdPl3: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '3rem !important'
        }
    },
    mdPr0: {
        [theme.breakpoints.up('md')]: {
            paddingRight: '0rem !important'
        }
    },
    mdPy1: {
        [theme.breakpoints.up('md')]: {
            paddingBottom: '1rem !important',
            paddingTop: '1rem !important'
        }
    },
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '10%',
            paddingRight: '10%'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }
}))