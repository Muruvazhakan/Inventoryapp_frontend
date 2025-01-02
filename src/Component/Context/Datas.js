import companyperson from '../../Image/companydetails.png';
import invocie from '../../Image/invoice.png';
import estimation from '../../Image/estimationgen.png';
import allestimation from '../../Image/allestimation.png';
import allinvoice from '../../Image/allinvoice.png';

export const navigationbarcontent = [
    {
        screenname: 'Home',
        links: '/',
        altname: '/',
        displays: true
    },
    {
        screenname: 'Company Detail',
        links: '/yourdetail',
        altname: 'yourdetail',
        displays: true,
        image: companyperson
    },
    {
        screenname: 'Stocks',
        links: '/stocks',
        altname: 'stocks',
        displays: true,
        image: invocie
    },
    {
        screenname: 'Sales',
        links: '/sales',
        altname: 'sales',
        displays: true,
        image: invocie
    },
    // {
    //     screenname: 'Generate Estimate',
    //     links: '/genestimate',
    //     altname: 'genestimate',
    //     displays: true,
    //     image: estimation
    // },
    // {
    //     screenname: 'All Invoice',
    //     links: '/allinvoice',
    //     altname: 'allinvoice',
    //     displays: true,
    //     image: allinvoice
    // },
    // {
    //     screenname: 'All Estimates',
    //     links: '/allestimates',
    //     altname: 'allestimates',
    //     displays: true,
    //     image: allestimation
    // },

];

export const userLogin = [
    {
        screenname: 'Login',
        links: '/',
        altname: '/',
        displays: true
    },
    {
        screenname: 'Siginup',
        links: '/siginup',
        altname: 'signup',
        displays: true
    },
]

export const userLoginname = [
    {
        userid:'12',
        username: 'JR modular',
        userPass: 'jrmodular123'
    },
    {
        userid:'13',
        username: 'Other1',
        userPass: 'jrmodular123'
    },
]