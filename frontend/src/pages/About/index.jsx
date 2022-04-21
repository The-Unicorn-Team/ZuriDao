import classNames from 'classnames'
import { useGlobalStyles } from '../../styles'
import { Hidden, Typography } from '@mui/material';
import { useStyles } from './styles';
import { useCallback } from 'react'
import meetingImage from '../../assets/images/about/mobile/image-team-members.jpg';
import meetingTabletImage from '../../assets/images/about/tablet/image-team-members.jpg';
import meetingDesktopImage from '../../assets/images/about/desktop/image-team-members.jpg';

const About = () => {
    const classes = useStyles();
    const globalStyles = useGlobalStyles();

    const ContentCard = useCallback(({ description, title }) => (
        <div className={classNames('mb-8 sm:flex sm:items-start sm:justify-between', classes.contentCard)}>
            <Typography 
                className={classNames('font-bold capitalize text-center sm:text-left', globalStyles.sanJuanBlueColor)}
                component="h2"
                data-aos="fade-left" 
                data-aos-duration="3000"
                variant="h5">
                    { title }
            </Typography>
            <Typography 
                className={classNames('text-center sm:text-left text-base mt-4 sm:mt-0 grow', 
                globalStyles.lightJuanBlueColor, classes.contentCardDescription)}
                component="p"
                data-aos="fade-right" 
                data-aos-duration="3000"
                variant="body2">
                    { description }
            </Typography>
        </div>
    ), [ classes, globalStyles ]);

    const Paragraph = useCallback(({ description, highlight }) => (
        <Typography 
            className={classNames('text-center text-base mb-8 flex flex-col items-center', classes.paragraph,
            globalStyles.lightJuanBlueColor, 'sm:border-slate-300 sm:border-y sm:border-solid sm:pt-4 sm:pb-4')}
            component="p"
            variant="body2">
                <Hidden smUp>
                    { description }
                </Hidden>
                <span className={classNames(globalStyles.darkPinkColor, 'mt-2.5 sm:mt-0 text-4xl font-bold')}>
                    { highlight }
                </span>
        </Typography>
    ), [ classes, globalStyles ])

    return (
        <main>
            <section className={classNames('bg-no-repeat flex', globalStyles.hero, globalStyles.px)}>
                <div className={classNames(classes.heroContent)}>
                    <Typography 
                        className={classNames('font-bold text-center md:text-left mb-16', 
                        globalStyles.sanJuanBlueColor, classes.heroContentTitle)}
                        component="h1"
                        data-aos="zoom-in" 
                        data-aos-duration="3000"
                        variant="h4">
                            We empower innovators by delivering access to the financial system
                    </Typography>
                    <ContentCard 
                        description="Our main goal is to build beautiful consumer experiences along with developer-friendly infrastructure. The result is an intelligent tool that gives everyone the ability to create amazing products that solve big problems. We are deeply focused on democratizing financial services through technology. "
                        title="Our vision"
                    />
                    <ContentCard 
                        description="At the core of our platform is the technical infrastructure APIs that connect consumers. Our innovative product provides key insights for businesses and individuals, as well as robust reporting for traditional financial institutions and developers. "
                        title="Our business"
                    />
                </div>
            </section>
            <div 
                className={classNames('flex bg-no-repeat pt-12', classes.meetingImageContainer)}
                data-aos="fade-up" data-aos-duration="3000">
                <div className={classNames(classes.meetingImage, 'w-full')}>
                    <Hidden smUp>
                        <img 
                            alt="meeting"
                            className={classNames('block w-full h-full object-cover')}
                            src={meetingImage}
                        />
                    </Hidden>
                    <Hidden smDown mdUp>
                        <img 
                            alt="meeting"
                            className={classNames('block w-full h-full object-cover')}
                            src={meetingTabletImage}
                        />
                    </Hidden>
                    <Hidden mdDown>
                        <img 
                            alt="meeting"
                            className={classNames('block w-full h-full object-cover')}
                            src={meetingDesktopImage}
                        />
                    </Hidden>
                </div>
            </div>
            <section className={classNames(globalStyles.px, 'md:flex mt-8 md:mt-0')}>
                <div className={classNames(classes.heroContent, 'md:pb-12')}>
                    <div 
                        className={classNames('flex flex-col items-center pt-8 md:pt-0 border-slate-300 border-y',
                        'border-solid sm:border-0 mb-12 sm:flex-row sm:justify-between sm:items-stretch')}
                        data-aos="zoom-in" data-aos-duration="3000">
                        <Paragraph 
                            description="Team Members"
                            highlight="300+"
                        />
                        <Paragraph 
                            description="Offices in the US"
                            highlight="3"
                        />
                        <Paragraph 
                            description="Transactions analyzed"
                            highlight="10M+"
                        />
                    </div>
                    <ContentCard 
                        description="We strongly believe there's always an opportunity to learn from each other outside of day-to-day work, whether it's company-wide offsites, internal hackathons, or co-worker meetups. We always value cross-team collaboration and diversity of thought, no matter the job title."
                        title="Our business"
                    />
                    <ContentCard 
                        description="We're all passionate about building a more efficient and inclusive financial infrastructure together. At PayAPI, we have diverse backgrounds and skills."
                        title="The people"
                    />
                </div>
            </section>
        </main>
    );
};

export default About;