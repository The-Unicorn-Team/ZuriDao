import { Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import classNames from 'classnames'
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './styles'
import { Link } from 'react-router-dom';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
//import logo from '../../assets/images/icons/logo.svg';
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalStyles } from '../../styles'
import { ReactComponent as Logo } from '../../assets/images/icons/logo.svg';


const Header = () => {
    //const display = useDisplay();
    //const text = useTypography();
   // const bg = useBackground();
    //const responsive = useResponsive();
    const classes = useStyles();
    const globalStyles = useGlobalStyles();
    
    const [ canIOpenNavBar, setCanIOpenNavBar ] = useState(false);
    const menuClickHandler = useCallback(() => setCanIOpenNavBar(b => !b), [ ]);
    const clickHandler = useCallback(() => setCanIOpenNavBar(false), []);

    const headerRef = useRef(null);
    const scrollHelper = useCallback(pageYOffset => {
        if(pageYOffset > 100) {
            headerRef.current.classList.add('scroll-effect')
            headerRef.current.classList.add(classes.scrollEffect)
        } else {
            headerRef.current.classList.remove(classes.scrollEffect)
            headerRef.current.classList.remove('scroll-effect')
        }
    }, [ classes ]);

    useEffect(() => {
        scrollHelper(window.pageYOffset);
        window.addEventListener('scroll', event => {
            scrollHelper(window.pageYOffset)
        });

    }, [ scrollHelper ])

    const headerNavigation = useMemo(() => (
        <nav className={classNames('pt-8 md:ml-8 sm:pt-0 md:relative sm:px-0 h-full', globalStyles.px)}>
            <Hidden smUp>
                <IconButton 
                    className={classNames('block ml-auto')}
                    onClick={menuClickHandler}>
                    <CloseIcon classes={{ root: 'text-white'}} />
                </IconButton>
                <Divider className={classNames('w-full mt-4 mb-4 border-slate-200')} />
            </Hidden>
            <List component="ul" className={classNames('flex flex-col item-center sm:flex-row sm:pb-0 sm:pt-0',)}>
                <ListItem disablePadding onClick={clickHandler} component={Link} to="/pricing" >
                    <ListItemButton className={classNames('sm:pb-0 sm:pt-0')}>
                        <ListItemText classes={{ root: classNames('sm:text-sky-700 text-center color-transition', classes.headerNavItemText, 
                            'md:mb-0 md:mt-0', globalStyles.lightJuanBlueColor, globalStyles.lightJuanBlueColorHover, 
                            classes.transitionEffect)}} 
                            primary="Pricing" 
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={clickHandler} component={Link} to="/about-us">
                    <ListItemButton className={classNames('sm:pb-0 sm:pt-0')}>
                        <ListItemText classes={{ root: classNames('sm:text-sky-700 text-center color-transition', classes.headerNavItemText, 
                            'md:mb-0 md:mt-0', globalStyles.lightJuanBlueColor, globalStyles.lightJuanBlueColorHover, 
                            classes.transitionEffect)}} 
                            primary="About" 
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={clickHandler} component={Link} to="/contact">
                    <ListItemButton className={classNames('sm:pb-0 sm:pt-0')}>
                        <ListItemText classes={{ root: classNames('sm:text-sky-700 text-center color-transition', classes.headerNavItemText, 
                            'md:mb-0 md:mt-0', globalStyles.lightJuanBlueColor, globalStyles.lightJuanBlueColorHover, 
                            classes.transitionEffect)}} 
                            primary="Contact" 
                        />
                    </ListItemButton>
                </ListItem>
            </List>
            <Hidden smUp>
                <Link to="/contact" onClick={clickHandler} className={classNames('no-underline', classes.contactMeLink)}>
                    <button 
                        className={classNames('w-full border-0 py-3 rounded-full outline-none font-bold text-white', 
                        globalStyles.darkPinkBg, classes.headerContactMe, 'bg-transition', globalStyles.darkPinkButton,)}>
                        Connect Wallet
                    </button>
                </Link>
            </Hidden>
        </nav>
    ), [ classes, clickHandler, globalStyles, menuClickHandler, ]);

    return (
      <header
        className={classNames(
          "flex items-center justify-between py-4 sm:py-6 absolute w-full bg-no-repeat",
          globalStyles.px,
          classes.transitionEffect
        )}
        ref={headerRef}
      >
        <div elevation={0} className={classNames("flex items-center")}>
          <Link to="/">
            <h1 className="text-3xl font-extrabold text-gray-400">ZuriDAPP</h1>
          </Link>
          <Hidden smDown>{headerNavigation}</Hidden>
          <Hidden smUp>
            <Drawer
              anchor="right"
              open={canIOpenNavBar}
              onClose={menuClickHandler}
              classes={{ paper: classes.headerDrawer }}
            >
              {headerNavigation}
            </Drawer>
          </Hidden>
        </div>
        <div elevation={0} className={classNames("flex items-center")}>
          <Hidden smDown>
            <Link to="/contact" className={classNames("")}>
              <button
                className={classNames(
                  globalStyles.darkPinkBg,
                  globalStyles.darkPinkButton,
                  classes.scheduleButton,
                  "border-0 outline-none rounded-full text-white py-2.5"
                )}
              >
                Connect Wallet
              </button>
            </Link>
          </Hidden>
          <Hidden smUp>
            <button
              aria-label="menu"
              className={classNames("bg-transparent border-0 outline-none")}
              onClick={menuClickHandler}
            >
              <MenuIcon
                classes={{ root: classNames("text-sky-700", classes.menuIcon) }}
              />
            </button>
          </Hidden>
        </div>
      </header>
    );
};

export default Header;
/**
 * 
                    <img 
                        alt="logo"
                        className={classNames('block')}
                        src={logo}
                    />
 */