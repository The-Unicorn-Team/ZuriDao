import { makeStyles } from "@mui/styles";

export const useBackground = makeStyles(theme => ({
    center: {
        backgroundPosition: 'center'
    },
    contain: {
        backgroundSize: 'contain'
    },
    cover: {
        backgroundSize: 'cover'
    },
    noRepeat: {
        backgroundRepeat: 'no-repeat'
    },
    transparent: {
        backgroundColor: 'transparent !important'
    }
}));