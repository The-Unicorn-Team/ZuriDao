import { makeStyles } from '@mui/styles'
import circlePattern from '../../assets/images/icons/bg-pattern-circle.svg';
import phoneIllustration from '../../assets/images/home/illustration-phone-mockup.svg';

export const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${phoneIllustration}), url(${circlePattern})`,
        backgroundPosition: 'center top 83px, center top -319px',
        backgroundSize: '240px, 600px',
        height: 765,
        [theme.breakpoints.up('sm')]: {
            backgroundPosition: 'center top 83px, center top -634px',
            backgroundSize: '240px, 900px',
            height: 724,
        },
        [theme.breakpoints.up(800)]: {
            backgroundPosition: 'center top 83px, center top -725px',
            backgroundSize: '240px, 1020px',

        },
        [theme.breakpoints.up('md')]: {
            backgroundPosition: 'right 121px top 83px, right -100px top -64px',
            backgroundSize: '270px, contain',
            height: 500,

        },
        [theme.breakpoints.up(1200)]: {
            backgroundPosition: 'right 190px top 83px, right -100px top -173px',
            backgroundSize: '323px, 622px',
            height: 580,

        }
    },
    heroContent: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '26rem'
        },
        [theme.breakpoints.up(1045)]: {
            maxWidth: '30rem'
        }
    },
    heroTitle: {
        [theme.breakpoints.up(1100)]: {
            fontSize: '2.75rem !important',
            lineHeight: '2.9rem !important'
        }
    },
    companies: {
        backgroundImage: `url(${circlePattern})`,
        backgroundPosition: 'center top -270px',
        backgroundSize: 500,
        [theme.breakpoints.up(490)]: {
            backgroundPosition: 'center top -469px',
            backgroundSize: 700,
        },
        [theme.breakpoints.up(645)]: {
            backgroundPosition: 'center top -800px',
            backgroundSize: 1000,
        },
        [theme.breakpoints.up(800)]: {
            backgroundPosition: 'center top -1000px',
            backgroundSize: 1200,
        },
        [theme.breakpoints.up('md')]: {
            backgroundPosition: 'left -85px top -188px',
            backgroundSize: 550,
        },
        [theme.breakpoints.up(1003)]: {
            backgroundPosition: 'left -176px top -207px',
        },
        [theme.breakpoints.up(1140)]: {
            backgroundPosition: 'left -176px top -224px',
        },
        [theme.breakpoints.up(1200)]: {
            backgroundPosition: 'left -168px top -252px',
            backgroundSize: 574,
        }
    },
    companiesLogosContainer: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '53% !important'
        },
        [theme.breakpoints.up(1200)]: {
            maxWidth: '46% !important'
        }
    },
    companyImageContainer: {
        height: 24,
        [theme.breakpoints.up('sm')]: {
            width: '31% !important'
        },[theme.breakpoints.up('md')]: {
            height: 21,
            width: '26% !important'
        },[theme.breakpoints.up(1200)]: {
            height: 24,
            width: '31% !important'
        }
    },
    companyImage: {
        width: 121
    },
    companiesLogos: {
        '& path': {
            fill: 'currentcolor !important'
        }
    },
    companiesContent: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '45% !important'
        }
    },
    services: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        },
        [theme.breakpoints.up('md')]: {
            backgroundImage: `url(${circlePattern})`,
            backgroundPosition: 'right -235px bottom',
            backgroundSize: 540,
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        [theme.breakpoints.up(1200)]: {
            paddingLeft: '7%',
            paddingRight: '7%',
        }
    },
    formCodeImageContainer: {
        height: 300,
        [theme.breakpoints.up('md')]: {
            height: 250,
            width: 350
        },
        [theme.breakpoints.up(1200)]: {
            height: 310,
            width: 'auto'
        }
    },
    formCodeContent: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%'
        }
    },
    simpleUIImageContainer: {
        height: 300,
        [theme.breakpoints.up(1200)]: {
            height: 350
        }
    },
    simpleUIContent: {
        [theme.breakpoints.up('md')]: {
        }
    }
}))