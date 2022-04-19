import { Typography } from '@mui/material';
import classNames from 'classnames';
import { useGlobalStyles } from '../../styles'

const ScheduleDemo = () => {
    const globalStyles = useGlobalStyles();

    const submitHandler = event => {
        event.preventDefault();
    };

    return (
        <section 
            className={classNames('flex pt-8 pb-16 flex-col items-center md:flex-row md:justify-between',
            globalStyles.px)}>
      
        </section>
    );
};

export default ScheduleDemo;