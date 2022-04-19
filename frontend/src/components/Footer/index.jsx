import classNames from 'classnames'
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/icons/logo.svg';
import { useGlobalStyles } from '../../styles'
import { useStyles } from './styles'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();

    return (
      <footer
        className={classNames(
          "flex flex-col items-center bg-no-repeat pt-8 pb-12",
          classes.footer,
          globalStyles.px,
          "sm:flex-row sm:justify-between sm:pb-8"
        )}
      >
        <div className={classNames("flex flex-col items-center sm:flex-row")}>
          <h1 className="text-3xl font-extrabold text-gray-400">ZuriDAPP</h1>
          <ul
            className={classNames(
              "flex flex-col items-center mt-8 sm:mt-0 sm:ml-8 sm:flex-row"
            )}
          >
            <li>
              <Link
                to="/pricing"
                className={classNames(
                  "text-slate-200 hover:text-white color-transition",
                  "md:mb-0 sm:mr-4 sm:mt-0"
                )}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="about-us"
                className={classNames(
                  "text-slate-200 hover:text-white color-transition",
                  "md:mb-0 mt-4 block sm:mr-4 sm:mt-0"
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={classNames(
                  "text-slate-200 hover:text-white color-transition",
                  "md:mb-0 mt-4 block sm:mt-0"
                )}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <ul
          className={classNames("flex items-center mt-8 sm:mt-0 sm:flex-row")}
        >
          <FacebookIcon
            className={classNames(
              "text-white hover:pointer mr-4",
              globalStyles.darkPinkButton
            )}
          />
          <TwitterIcon
            className={classNames(
              "text-white hover:pointer mr-4",
              globalStyles.darkPinkButton
            )}
          />
          <LinkedInIcon
            className={classNames(
              "text-white hover:pointer",
              globalStyles.darkPinkButton
            )}
          />
        </ul>
      </footer>
    );
};

export default Footer;