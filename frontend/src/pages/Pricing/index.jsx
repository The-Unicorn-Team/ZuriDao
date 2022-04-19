import classNames from 'classnames'
import { useGlobalStyles } from '../../styles'
import { Typography } from '@mui/material';
import Card from './Card';
import { useMemo } from 'react';

const Pricing = () => {
    const globalStyles = useGlobalStyles();

    const cardsContent = useMemo(() => [
        {
            dataAOS: 'fade-up',
            dataAOSDuration: '3000',
            description: 'Build and test using our core set of products with up to 100 API requests ',
            price: '0.00',
            title: 'Free Plan',
            list: [
                {
                    isChecked: true,
                    name: 'Transactions'
                },
                {
                    isChecked: true,
                    name: 'Auth'
                },
                {
                    isChecked: true,
                    name: 'Identity'
                },
                {
                    isChecked: false,
                    name: 'Investments'
                },
                {
                    isChecked: false,
                    name: 'Assets'
                },
                {
                    isChecked: false,
                    name: 'Liabilities'
                },
                {
                    isChecked: false,
                    name: 'Income'
                }
            ]
        },
        {
            dataAOS: 'fade-down',
            dataAOSDuration: '3000',
            description: 'Launch your project with unlimited requests and no contractual minimums ',
            price: '249.00',
            title: 'Basic Plan',
            list: [
                {
                    isChecked: true,
                    name: 'Transactions'
                },
                {
                    isChecked: true,
                    name: 'Auth'
                },
                {
                    isChecked: true,
                    name: 'Identity'
                },
                {
                    isChecked: true,
                    name: 'Investments'
                },
                {
                    isChecked: true,
                    name: 'Assets'
                },
                {
                    isChecked: false,
                    name: 'Liabilities'
                },
                {
                    isChecked: false,
                    name: 'Income'
                }
            ]
        },
        {
            dataAOS: 'fade-up',
            dataAOSDuration: '3000',
            description: 'Get tailored solutions, volume pricing, and dedicated support for your team ',
            price: '499.00',
            title: 'Premium Plan',
            list: [
                {
                    isChecked: true,
                    name: 'Transactions'
                },
                {
                    isChecked: true,
                    name: 'Auth'
                },
                {
                    isChecked: true,
                    name: 'Identity'
                },
                {
                    isChecked: true,
                    name: 'Investments'
                },
                {
                    isChecked: true,
                    name: 'Assets'
                },
                {
                    isChecked: true,
                    name: 'Liabilities'
                },
                {
                    isChecked: true,
                    name: 'Income'
                }
            ]
        }
    ], []);


    return (
        <main>
            <section 
                className={classNames(globalStyles.px, globalStyles.hero, 'bg-no-repeat md:mb-8')}>
                <Typography 
                    className={classNames('font-bold text-center md:text-5xl', globalStyles.sanJuanBlueColor)}
                    component="h1"
                    data-aos="zoom-in" 
                    data-aos-duration="3000"
                    variant="h5">
                    Pricing
                </Typography>
                <div className={classNames('flex flex-col items-stretch sm:flex-row sm:justify-between mt-8')}>
                    {
                        cardsContent.map((item, index) => (
                            <Card key={index} { ...item } />
                        ))
                    }
                </div>
            </section>
        </main>
    );
};

export default Pricing;