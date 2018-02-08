import air_india from '../../assets/images/air_india.jpg';
import airasia from '../../assets/images/airasia.png';
import go_air from '../../assets/images/go_air.jpg';
import indigo from '../../assets/images/indigo.png';
import jet_airways from '../../assets/images/jet_airways.png';
import singapore from '../../assets/images/singapore-airlines-logo.jpg';
import spicejet from '../../assets/images/spicejet.png';
import vistara from '../../assets/images/vistara.png';

const AirlineLogo=[
    {
        code: 'AI',
        image: air_india,
        name: 'AirIndia',
        url:'www.airindia.in'
    },
    {
        code: '9W',
        image: jet_airways,
        name: 'Jet Airways',
        url:'www.jetairways.com'
    },
    {
        code: 'G8',
        image: go_air,
        name: 'Go Airway',
        url:'www.goair.com'
        
    },
    {
        code: '6E',
        image: indigo,
         name: 'Indigo',
        url:'www.goindigo.in'
         
    },
    {
        code: 'SG',
        image: spicejet,
         name: 'SpiceJet',
         url:'www.spicejet.com'
    },
    {
        code: 'UK',
        image: vistara,
         name: 'Vistara',
         url:'www.airvistara.com'

    },
    {
        code: 'AK',
        image: airasia,
         name: 'Airasia',
         url:'www.airasia.com'
    },
    {
        code: 'H1',
        image: singapore,
        name: 'Singapore Airline',
        url:'www.singaporeair.com'
    },
];
export default AirlineLogo;

