import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
    card: {
        [theme.breakpoints.up('sm')]: {
            width: '31%'
        }
    },
    notChecked: {
        fontSize: '1.5rem',
        height: '1em',
        width: '1em'
    }
}));