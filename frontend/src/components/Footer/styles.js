import { makeStyles } from '@mui/styles'
import circlePattern from '../../assets/images/icons/bg-pattern-circle.svg';

export const useStyles = makeStyles(theme => ({//
    footer: {
        backgroundColor: '#1B262F',
        backgroundImage: `url(${circlePattern})`,
        backgroundPosition: 'center bottom -227px',
        backgroundSize: 400,
        [theme.breakpoints.up(420)]: {
            backgroundPosition: 'center bottom -324px',
            backgroundSize: 500,
        },
        [theme.breakpoints.up(490)]: {
            backgroundPosition: 'center bottom -524px',
            backgroundSize: 700,
        },
        [theme.breakpoints.up('sm')]: {
            backgroundPosition: 'right -183px bottom -217px',
            backgroundSize: 400,
        },
        [theme.breakpoints.up(1200)]: {
            backgroundPosition: 'right -134px bottom -240px',
        }
    }
}))