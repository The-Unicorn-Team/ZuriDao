import { makeStyles } from "@mui/styles";


export const useDisplay = makeStyles(theme => ({
    absolute: {
        position: 'absolute'
    },
    alignBaseline: {
        alignItems: 'baseline !important'
    },
    alignCenter: {
        alignItems: 'center !important'
    },
    alignStart: {
        alignItems: 'flex-start !important'
    },
    alignStretch: {
        alignItems: 'stretch !important'
    },
    block: {
        display: 'block !important'
    },
    borderBox: {
        boxSizing: 'border-box'
    },
    borderNone: {
        border: 'none !important'
    },
    radius50: {
        borderRadius: '50%'
    },
    fixed: {
        position: 'fixed'
    },
    flex: {
        display: 'flex !important'
    },
    flexColumn: {
        flexDirection: 'column'
    },
    flexGrow1: {
        flexGrow: 1
    },
    flexWrap: {
        flexWrap: 'wrap !important'
    },
    h100: {
        height: '100%'
    },
    inlineBlock: {
        display: 'inline-block'
    },
    inlineFlex: {
        display: 'inline-flex'
    },
    justifyBetween: {
        justifyContent: 'space-between !important'
    },
    justifyCenter: {
        justifyContent: 'center !important'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    listStyleNone: {
        listStyle: 'none'
    },
    mb1: {
        marginBottom: '1rem !important'
    },
    mb2: {
        marginBottom: '2rem !important'
    },
    mb3: {
        marginBottom: '3rem !important'
    },
    mlAuto: {
        marginLeft: 'auto !important'
    },
    ml0: {
        marginLeft: '0 !important'
    },
    ml1: {
        marginLeft: '1rem !important'
    },
    ml2: {
        marginLeft: '2rem !important'
    },
    ml3: {
        marginLeft: '3rem !important'
    },
    mrAuto: {
        marginRight: 'auto !important'
    },
    mr0: {
        marginRight: '0 !important'
    },
    mr1: {
        marginRight: '1rem !important'
    },
    mr2: {
        marginRight: '2rem !important'
    },
    mr3: {
        marginRight: '3rem !important'
    },
    mt0: {
        marginTop: '0rem !important'
    },
    mt1: {
        marginTop: '1rem !important'
    },
    mt2: {
        marginTop: '2rem !important'
    },
    mt3: {
        marginTop: '3rem !important'
    },
    minH100: {
        minHeight: '100%'
    },
    noWrap: {
        flexWrap: 'nowrap'
    },
    none: {
        display: 'none !important'
    },
    opacity7: {
        opacity: '.7 !important'
    },
    opacity8: {
        opacity: '.8 !important'
    },
    opacity9: {
        opacity: '.9 !important'
    },
    overflowHidden: {
        overflow: 'hidden'
    },
    outlineNone: {
        outline: 'none !important'
    },
    pt0: {
        paddingTop: '0rem !important'
    },
    pt1: {
        paddingTop: '1rem !important'
    },
    pt2: {
        paddingTop: '2rem !important'
    },
    pt3: {
        paddingTop: '3rem !important'
    },
    pb1: {
        paddingBottom: '1rem !important'
    },
    pb2: {
        paddingBottom: '2rem !important'
    },
    pb3: {
        paddingBottom: '3rem !important'
    },
    pl0: {
        paddingLeft: '0rem !important'
    },
    pl1: {
        paddingLeft: '1rem !important'
    },
    pl2: {
        paddingLeft: '2rem !important'
    },
    pl3: {
        paddingLeft: '3rem !important'
    },
    pr0: {
        paddingRight: '0rem !important'
    },
    pr1: {
        paddingRight: '1rem !important'
    },
    pr2: {
        paddingRight: '2rem !important'
    },
    pr3: {
        paddingRight: '3rem !important'
    },
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
        [theme.breakpoints.up(1000)]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        }
    },
    relative: {
        position: 'relative'
    },
    rowReverse: {
        flexDirection: 'row-reverse !important'
    },
    wrap: {
        flexWrap: 'wrap'
    },
    w100: {
        width: '100%'
    }
}));