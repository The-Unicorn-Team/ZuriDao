import classNames from 'classnames'
import { useGlobalStyles } from '../../styles'
import { Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useStyles } from './styles';
import { useCallback } from 'react';
import { ReactComponent as GoogleLogo } from '../../assets/images/shared/google.svg';
import { ReactComponent as MicrosoftLogo } from '../../assets/images/shared/microsoft.svg';
import { ReactComponent as TeslaLogo } from '../../assets/images/shared/tesla.svg';
import { ReactComponent as NvidiaLogo } from '../../assets/images/shared/nvidia.svg';
import { ReactComponent as OracleLogo } from '../../assets/images/shared/oracle.svg';
import { ReactComponent as HewlettPackardLogo } from '../../assets/images/shared/hewlett-packard.svg';
import { useForm } from "react-hook-form";

const Contact = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        reset();
    }

    const ImageContainer = useCallback(({ alt, children, image }) => (
        <div className={classNames('mb-12 w-1/2', classes.companyImageContainer)}>
            { image }
        </div>
    ), [ classes ])

    return (
        <main>
            <section className={classNames('bg-no-repeat flex flex-col items-stretch md:mb-12', 
                globalStyles.hero, globalStyles.px, classes.hero)}>
                <Typography 
                    className={classNames('font-bold text-center md:text-left mb-16 md:mb-12', 
                    globalStyles.sanJuanBlueColor, classes.heroContentTitle)}
                    component="h1"
                    data-aos="zoom-in" 
                    data-aos-duration="3000"
                    variant="h4">
                        Submit a help request and we’ll get in touch shortly.
                </Typography>
                <div className={classNames('md:flex md:items-center md:justify-between')}>
                    <form 
                        className={classNames(classes.form)}
                        data-aos="fade-left" 
                        data-aos-duration="3000"
                        onSubmit={handleSubmit(onSubmit)}>
                        <TextField 
                            classes={{ root: classNames(classes.textField)}}
                            className={classNames('mb-2.5')}
                            error={Boolean(errors.name)}
                            fullWidth
                            helperText={errors.name ? "This field can't be empty" : ''}
                            label="Name" 
                            variant="standard" 
                            {...register("name", { required: true })}
                        />
                        <TextField 
                            classes={{ root: classNames(classes.textField)}}
                            className={classNames('mb-2.5')}
                            error={Boolean(errors["email-address"])}
                            fullWidth
                            helperText={errors["email-address"] ? "This field can't be empty" : ''}
                            label="Email Address" 
                            variant="standard" 
                            {...register("email-address", { required: true })}
                        />
                        <TextField 
                            classes={{ root: classNames(classes.textField)}}
                            className={classNames('mb-2.5')}
                            error={Boolean(errors["company-name"])}
                            fullWidth
                            helperText={errors["company-name"] ? "This field can't be empty" : ''}
                            label="Company Name" 
                            variant="standard" 
                            {...register("company-name", { required: true })}
                        />
                        <TextField 
                            classes={{ root: classNames(classes.textField)}}
                            className={classNames('mb-2.5')}
                            error={Boolean(errors["title"])}
                            fullWidth
                            helperText={errors.title ? "This field can't be empty" : ''}
                            label="Title" 
                            variant="standard" 
                            {...register("title", { required: true })}
                        />
                        <TextField 
                            classes={{ root: classNames(classes.textField)}}
                            className={classNames('mb-2.5')}
                            error={Boolean(errors["message"])}
                            fullWidth
                            helperText={errors.message ? "This field can't be empty" : ''}
                            label="Message" 
                            multiline
                            rows={5}
                            variant="standard" 
                            {...register("message", { required: true })}
                        />
                        <FormControlLabel 
                            classes={{ root: classNames('mt-4', classes.formControlLabel)}}
                            control={
                                <Checkbox 
                                    defaultChecked 
                                />
                            } 
                            label="Stay up-to-date with company announcements and updates to our API" 
                            {...register("receive-announcements")}
                        />
                        <button 
                            className={classNames('rounded-full bg-transparent px-8 py-1.5 mt-5 border border-cyan-900 border-solid capitalize',
                            globalStyles.sanJuanBlueColor, globalStyles.transparentButton, 'hover:text-white mr-auto')}>
                            Submit
                        </button>
                    </form>
                    <div 
                        className={classNames('mt-16 md:mt-0', classes.companiesContainer)}
                        data-aos="fade-right" 
                        data-aos-duration="3000">
                        <Typography 
                            component="h2" 
                            variant="h5" 
                            className={classNames('text-center md:text-left font-bold', globalStyles.sanJuanBlueColor)}>
                            Join the thousands of innovators already building with us
                        </Typography>
                        <div className={classNames('flex items-center justify-between flex-wrap mt-8', classes.companiesLogosContainer)}>
                            <ImageContainer alt="tesla" image={<TeslaLogo  className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                            <ImageContainer alt="microsoft" image={<MicrosoftLogo className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                            <ImageContainer alt="hewlettPackard" image={<HewlettPackardLogo className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                            <ImageContainer alt="oracle" image={<OracleLogo className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                            <ImageContainer alt="google" image={<GoogleLogo  className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                            <ImageContainer alt="nvidia" image={<NvidiaLogo  className={classNames('text-white mx-auto', classes.companiesLogos)}/>} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;