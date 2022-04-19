import { makeStyles } from "@mui/styles";

export const useTypography = makeStyles(theme => ({
    alignCenter: {
        textAlign: 'center !important'
    },
    alignLeft: {
        textAlign: 'left !important'
    },
    alignRight: {
        textAlign: 'right !important'
    },
    decorationNone: {
        textDecoration: 'none !important'
    },
    font7: {
        fontWeight: '700 !important'
    },
    noUnderline: {
        textDecoration: 'none'
    },
    textDark: {
        color: '#000 !important'
    },
    textLight: {
        color: '#FFF !important'
    },
    capitalize: {
        textTransform: 'capitalize !important'
    },
    uppercase: {
        textTransform: 'uppercase'
    },
    rem7: {
        fontSize: '.7rem !important'
    },
    rem75: {
        fontSize: '.75rem !important'
    },
    rem8: {
        fontSize: '.8rem !important'
    },
    rem85: {
        fontSize: '.85rem !important'
    },
    rem9: {
        fontSize: '.9rem !important'
    },
    smAlignRight: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'right !important'
        }
    },
    smAlignStart: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'left !important'
        }
    },
    mdAlignCenter: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'center !important'
        }
    },
    mdAlignEnd: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'right !important'
        }
    },
    mdAlignLeft: {
        [theme.breakpoints.up('md')]: {
            textAlign: 'left !important'
        }
    },
}))