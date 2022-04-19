import { makeStyles } from '@mui/styles'
import circlePattern from '../../assets/images/icons/bg-pattern-circle.svg';


export const useStyles = makeStyles(theme => ({
    heroContent: {
        [theme.breakpoints.up('md')]: {
            padding: '0 5%'
        }
    },
    heroContentTitle: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%'
        }
    },
    contentCard: {
        [theme.breakpoints.up('md')]: {
            '&:last-child': {
                marginBottom: '0 !important'
            }
        }
    },
    contentCardDescription: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: '70%'
        }
    },
    meetingImageContainer: {
        [theme.breakpoints.up('md')]: {
            backgroundImage: `url(${circlePattern})`,
            backgroundPosition: 'left -350px center',
            backgroundSize: 600,
            paddingBottom: '7rem !important',
            paddingTop: '7rem !important'
        }
    },
    meetingImage: {
        height: 270,
        [theme.breakpoints.up('sm')]: {
            height: 350,
        },
        [theme.breakpoints.up('md')]: {
            height: 450,
        }
    },
    paragraph: {
        [theme.breakpoints.up('sm')]: {
            width: '31%'
        },
    }
}));