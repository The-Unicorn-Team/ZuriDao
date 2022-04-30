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
          'flex flex-col items-center sticky bottom-0 bg-no-repeat pt-8 pb-12',
          classes.footer,
          globalStyles.px,
          'sm:flex-row sm:justify-between sm:pb-8',
        )}>
        <div className={classNames('flex flex-col items-center sm:flex-row')}>
          <h1 className="text-3xl font-extrabold text-gray-400">ZuriDAPP</h1>
          <ul
            className={classNames(
              'flex flex-col items-center mt-8 sm:mt-0 sm:ml-8 sm:flex-row',
            )}></ul>
        </div>
        <ul
          className={classNames('flex items-center mt-8 sm:mt-0 sm:flex-row')}>
          <FacebookIcon
            className={classNames(
              'text-white hover:pointer mr-4',
              globalStyles.darkPinkButton,
            )}
          />
          <TwitterIcon
            className={classNames(
              'text-white hover:pointer mr-4',
              globalStyles.darkPinkButton,
            )}
          />
          <LinkedInIcon
            className={classNames(
              'text-white hover:pointer',
              globalStyles.darkPinkButton,
            )}
          />
        </ul>
      </footer>
    );
};

export default Footer;