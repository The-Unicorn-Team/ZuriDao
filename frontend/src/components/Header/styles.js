import { makeStyles } from '@mui/styles'
import circlePattern from '../../assets/images/icons/bg-pattern-circle.svg';

export const useStyles = makeStyles(theme => ({
    transitionEffect: {
        transition: 'all 2s ease-in-out'
    },
    scrollEffect: {
        backgroundColor: '#1B262F',
        backgroundImage: `url(${circlePattern})`,
        backgroundPosition: 'right -141px bottom -28px',
        backgroundSize: 300,
        position: 'fixed',
        top: 0,
        zIndex: 10,
        [theme.breakpoints.up('sm')]: {
            backgroundPosition: 'right -59px bottom -41px',
        },
        [theme.breakpoints.up(715)]: {
            backgroundPosition: 'right -39px bottom -46px',
        },
        [theme.breakpoints.up(1100)]: {
            backgroundPosition: 'right -33px bottom -63px',
            backgroundSize: 350,
        }
    },
    logo: {
        '.scroll-effect &': {
            color: '#FFF',
            '& path': {
                fill: 'currentcolor !important'
            },
            '& g': {
                fill: 'currentcolor !important'
            }
        }
    },
    headerNavItemText: {
        [theme.breakpoints.up('sm')]: {
            '.scroll-effect &': {
                color: 'rgb(226 232 240 / var(--tw-text-opacity)) !important'
            }
        }
    },
    menuIcon: {
        '.scroll-effect &': {
            color: 'rgb(226 232 240 / var(--tw-text-opacity)) !important'
        }
    },
    headerDrawer: {
        backgroundColor: '#1B262F',
        width: '80%'
    },
    scheduleButton: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '.65rem',
            paddingRight: '.65rem'
        },
        [theme.breakpoints.up(620)]: {
            paddingLeft: '1rem',
            paddingRight: '1rem'
        }
    }
}))