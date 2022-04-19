import { makeStyles } from '@mui/styles'
import bankingIcon from '../../../assets/images/home/icon-banking-and-coverage.svg';
import personalFinancesIcon from '../../../assets/images/home/icon-personal-finances.svg';
import paymentIcon from '../../../assets/images/home/icon-consumer-payments.svg';

export const useStyles = makeStyles(theme => ({//
    card: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '7rem',
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: 0,
            width: '31%'
        }
    },
    title: {
        '&::before': {
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '""',
            display: 'block',
            height: 71,
            margin: '0 auto 2rem auto',
            width: 71
        },
        [theme.breakpoints.up('sm')]: {
            '&::before': {
                left: 0,
                marginLeft: 0,
                position: 'absolute',
                top: 0,
            }
        },
        [theme.breakpoints.up('md')]: {
            '&::before': {
                left: 0,
                marginLeft: 'auto',
                position: 'relative',
                top: 0,
            }
        }
    },
    personalFinances: {
        '&::before': {
            backgroundImage: `url(${personalFinancesIcon})`
        }
    },
    banking: {
        '&::before': {
            backgroundImage: `url(${bankingIcon})`
        }
    },
    payments: {
        '&::before': {
            backgroundImage: `url(${paymentIcon})`
        }
    }
}))