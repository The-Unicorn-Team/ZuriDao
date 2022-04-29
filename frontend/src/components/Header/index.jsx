import react from "react";
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import classNames from "classnames";
import MenuIcon from "@mui/icons-material/Menu";
import { useStyles } from "./styles";
import { Link } from "react-router-dom";
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from "react";
import "./index.css";
//import logo from '../../assets/images/icons/logo.svg';
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalStyles } from "../../styles";
import { ReactComponent as Logo } from "../../assets/images/icons/logo.svg";
import { AppContext } from "../../context/AppContext";



const Header = () => {
  //const display = useDisplay();
  //const text = useTypography();
  // const bg = useBackground();
  //const responsive = useResponsive();
  const classes = useStyles();
  const globalStyles = useGlobalStyles();

  

  const headerRef = useRef();
  const scrollHelper = useCallback(
    (pageYOffset) => {
      if (pageYOffset > 100) {
        headerRef.current.classList.add("scroll-effect");
        headerRef.current.classList.add(classes.scrollEffect);
      } else {
        headerRef.current.classList.remove(classes.scrollEffect);
        headerRef.current.classList.remove("scroll-effect");
      }
    },
    [classes]
  );

  const { currentAccount, connectWallet } = useContext(AppContext);

  const [shortenedAddress, setShortenedAddress] = useState("");

  useEffect(() => {
    setShortenedAddress(
      `${currentAccount.toString().slice(0, 5)}...${currentAccount
        .toString()
        .slice(currentAccount.length - 4)}`
    );
  }, []);

  useEffect(() => {
    scrollHelper(window.pageYOffset);
    window.addEventListener("scroll", (event) => {
      scrollHelper(window.pageYOffset);
    });
  }, [scrollHelper]);


 
  return (
    <header
      
      className={classNames(
        "flex items-center justify-between py-4 sm:py-6 absolute w-full bg-no-repeat header",
        globalStyles.px,
        classes.transitionEffect
      )}
      ref={headerRef}
    >
       {/* <button onclick={connectWallet}>Connect wallet</button> */}

      <div className={classNames("flex items-center")}>
        <Link to="/">
          <h1 className="text-3xl font-extrabold text-gray-400">ZuriDAPP</h1>
        </Link>
      </div>
      <div>
        <ul className=" space-x-8 sm:flex hidden" >
          <Link to="/elections" className=" text-decoration-none">
          <li className=" text-gray-500 font-semibold cursor-pointer hover:bg-blue-300  hover:bg-opacity-25 px-3 py-2 rounded-md translate-x-1 duration-1000">Student Portal</li>
          </Link>
          <Link to="/admin" className=" text-decoration-none">
          <li className=" text-gray-500 font-semibold cursor-pointer hover:bg-blue-300 hover:bg-opacity-25 px-3 py-2 rounded-md translate-x-1 duration-1000">Admin Portal</li>
          </Link>
        </ul>
      </div>
      <div className={classNames("flex items-center")}>
        <div>
          {!currentAccount ? (
            <button
              onClick={connectWallet}
              className={classNames(
                globalStyles.darkPinkBg,
                globalStyles.darkPinkButton,
                classes.scheduleButton,

                "border-0 outline-none rounded-full text-white py-2.5 hidden sm:block"
              )}
            >
              Connect Wallet
            </button>
          ) : (
            <span className="nav-item text-3xl font-extrabold text-gray-400">
              
            </span>
          )}
        </div>
        <Hidden smUp>
          <button
            aria-label="menu"
            className={classNames("bg-transparent border-0 outline-none")}
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
