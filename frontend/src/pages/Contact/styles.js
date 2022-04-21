import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
    hero: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '10%',
            paddingRight: '10%'
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '10%',
            paddingRight: '10%'
        },
    },
    heroContentTitle: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '70%'
        }
    },
    form: {
        [theme.breakpoints.up('md')]: {
            width: '45%'
        },
        [theme.breakpoints.up(1200)]: {
            width: 500
        }
    },
    textField: {
        '& .MuiInputLabel-root': {
            color: '#6C8294'
        },
        '& .Mui-error': {
            color: '#d32f2f'
        }
    },
    formControlLabel: {
        '& .MuiTypography-root': {
            color: '#6C8294',
            fontSize: '.92rem'
        }
    },
    companiesContainer: {
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        [theme.breakpoints.up(1200)]: {
            width: 500
        }
    },
    companyImageContainer: {
        height: 24,
        [theme.breakpoints.up('sm')]: {
            width: '31% !important'
        },
        [theme.breakpoints.up('md')]: {
            height: 21,
            width: '26% !important'
        },
        [theme.breakpoints.up(1200)]: {
            height: 24,
            width: '31% !important'
        }
    },
}));