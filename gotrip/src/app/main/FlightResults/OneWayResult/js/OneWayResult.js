import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showOneWayResult } from '../../../../state/action/FlightSearchAction';
import { storeOneWayDetail } from '../../../../state/action/OneWayFlightDetail';
import { key } from '../../../../../apikey';
import SearchResults from '../../SearchResults/js/SearchResults.js';
import FilterBar from '../../FilterBar/js/FilterBar';
import Spinner from '../../spinner/js/spinner';
import '../css/OneWayResult.css';
import AirportInput from '../../../FlightSearch/AirportDropdown/js/AirportInputResultPage';
import AirportList from '../../../FlightSearch/AirportDropdown/js/AirportList';
import { withRouter } from 'react-router-dom';

function getSuggestionValue(suggestion) {
    if (suggestion == '')
        return '';
    return suggestion.location + ' (' + suggestion.iata_code + ')';
}

class OneWayResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source_value_store: '',
            destination_value_store: '',
            total_passenger: 1,
            min_price: 0,
            max_price: 0,

            result: '',
            status: '',
            filters: 0,
            fetching: true,
            sort_price: false,
            sort_depart: false,
            sort_arrival: false,
            sort_duration: false,
            sort_airline: false,

            non_stop: true,
            zero_stop: false,
            morethanone_stop: true,

            range: 0,

            early_morning: true,
            morning: true,
            mid_day: true,
            evening: true,


            airindia_1: true,
            indigo_2: true,
            goair_5: true,
            jetairways_4: true,
            spicejet_6: true,
            vistara_3: true,
            others_7: true,
            source_value: this.getCityPlaceholder(this.props.match.params.src),
            destination_value: this.getCityPlaceholder(this.props.match.params.dest),
            source_value_store: this.getCityPlaceholder(this.props.match.params.src),
            destination_value_store: this.getCityPlaceholder(this.props.match.params.dest),
            source: { iata_code: this.props.match.params.src },
            destination: { iata_code: this.props.match.params.dest },
            depart_date: new Date(this.props.match.params.dept_date),
            class: this.props.match.params.class,
            adult: this.props.match.params.adult,
            child: this.props.match.params.child,
            infant: this.props.match.params.infant,

            placeholder_source: this.getCityPlaceholder(this.props.match.params.src),
            placeholder_destination: this.getCityPlaceholder(this.props.match.params.dest),

            sort_depart_btn: 0,
            sort_duration_btn:0,
            sort_price_btn:1

        }
        this.sortByPrice = this.sortByPrice.bind(this);
        this.sortByDepart = this.sortByDepart.bind(this);
        this.sortByArrival = this.sortByArrival.bind(this);
        this.sortByDuration = this.sortByDuration.bind(this);
        this.sortByAirline = this.sortByAirline.bind(this);
        this.nonStop = this.nonStop.bind(this);
        this.rangeFilter = this.rangeFilter.bind(this);
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    changeSourceValue = (value) => {
        // console.log(value);
        this.setState({ source_value: value });
    }


    changeDestinationValue = (value) => {
        // console.log(value);

        this.setState({ destination_value: value })
    }
    changeSourceStoreValue = (value) => {

        this.setState({ source_value_store: value });

    }
    changeDestinationStoreValue = (value) => {
        this.setState({ destination_value_store: value });
    }

    swapCity = () => {
        if (this.state.source === '' && this.state.destination === '') {
            return false;
        }
        let temp = this.state.source;
        this.setState({ source: this.state.destination });
        this.setState({ destination: temp });
        temp = this.state.source_value;
        this.setState({ source_value: this.state.destination_value });
        this.setState({ destination_value: temp });
        temp = this.state.source_value_store;
        this.setState({ source_value_store: this.state.destination_value_store });
        this.setState({ destination_value_store: temp });
        console.log("swap");

    }
    getCityObject(code) {
        let suggestion = AirportList.find((element) => {
            return element.iata_code === code;
        });
        return suggestion;
    }

    // -----------Sorting Start----------------

    sortByDepart() {
        let click = 1;
        this.setState({sort_price_btn: 0});
        this.setState({sort_duration_btn: 0});
        if(this.state.sort_depart_btn === 0 && click === 1){
            this.setState({sort_depart_btn: 1});
            click = 0;
        }
        if(this.state.sort_depart_btn === 1 && click === 1){
            this.setState({sort_depart_btn: 2});
            click = 0;
        }
        if(this.state.sort_depart_btn === 2 && click === 1){
            this.setState({sort_depart_btn: 1});
            click = 0;
        }
        let list = this.state.result;
        if (list == undefined) {
            return false;
        }
        if (this.state.sort_depart) {
            list.sort((a, b) => {

                if (new Date(a.itineraries[0].outbound.flights[0].departs_at) > new Date(b.itineraries[0].outbound.flights[0].departs_at)) {
                    return 1;
                }
                if (new Date(a.itineraries[0].outbound.flights[0].departs_at) < new Date(b.itineraries[0].outbound.flights[0].departs_at)) {
                    return -1;
                }
                return 0;
            });
        } else {

            list.sort((a, b) => {

                if (new Date(a.itineraries[0].outbound.flights[0].departs_at) > new Date(b.itineraries[0].outbound.flights[0].departs_at)) {
                    return -1;
                }
                if (new Date(a.itineraries[0].outbound.flights[0].departs_at) < new Date(b.itineraries[0].outbound.flights[0].departs_at)) {
                    return 1;
                }
                return 0;
            });

        }
        this.setState({
            sort_depart: !this.state.sort_depart
        });
        this.setState({
            result: list
        });

    }
    sortByArrival() {
        let list = this.state.result;
        if (list == undefined) {
            return false;
        }
        if (this.state.sort_arrival) {
            list.sort((a, b) => {
                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let date1 = new Date(a.itineraries[0].outbound.flights[index1 - 1].departs_at);
                date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();

                let date2 = (new Date(b.itineraries[0].outbound.flights[index2 - 1].departs_at));
                date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();

                if (new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at).getTime() - date1 > new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at).getTime() - date2) {
                    return 1;
                }
                if (new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at).getTime() - date1 < new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at).getTime()) {
                    return -1;
                }
                return 0;
            });
        } else {

            list.sort((a, b) => {
                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let date1 = new Date(a.itineraries[0].outbound.flights[index1 - 1].departs_at);
                date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()).getTime();

                let date2 = (new Date(b.itineraries[0].outbound.flights[index2 - 1].departs_at));
                date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()).getTime();
                if (new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at).getTime() - date1 > new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at).getTime() - date2) {
                    return -1;
                }
                if (new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at).getTime() - date1 < new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at).getTime() - date2) {
                    return 1;
                }
                return 0;
            });

        }
        this.setState({
            sort_arrival: !this.state.sort_arrival
        });
        this.setState({
            result: list
        });

    }

    sortByPrice() {
        let click = 1;
        this.setState({sort_depart_btn: 0});
        this.setState({sort_duration_btn: 0});
        if(this.state.sort_price_btn === 0 && click === 1){
            this.setState({sort_price_btn: 1});
            click = 0;
        }
        if(this.state.sort_price_btn === 1 && click === 1){
            this.setState({sort_price_btn: 2});
            click = 0;
        }
        if(this.state.sort_price_btn === 2 && click === 1){
            this.setState({sort_price_btn: 1});
            click = 0;
        }

        let list = this.state.result;
        if (list == undefined) {
            return false;
        }
        if (this.state.sort_price) {
            list.sort((a, b) => {
                return a.fare.total_price - b.fare.total_price;
            });
        } else {

            list.sort((a, b) => {
                return b.fare.total_price - a.fare.total_price;
            });

        }
        this.setState({
            sort_price: !this.state.sort_price
        });
        this.setState({
            result: list
        });
    }
    sortByAirline() {
        let list = this.state.result;
        if (list == undefined) {
            return false;
        }
        if (this.state.sort_airline) {
            list.sort((a, b) => {
                var nameA = a.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase
                var nameB = b.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase

                if (nameA == '9W') {
                    nameA = "JET";
                }
                if (nameB == '9W') {
                    nameB = "JET";
                }
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        } else {

            list.sort((a, b) => {
                var nameA = a.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase
                var nameB = b.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase
                if (nameA == '9W') {
                    nameA = "JET";
                }
                if (nameB == '9W') {
                    nameB = "JET";
                }
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }

                // names must be equal
                return 0;
            });

        }
        this.setState({
            sort_airline: !this.state.sort_airline
        });
        this.setState({
            result: list
        });
    }
    sortByDuration() {
        let click = 1;
        this.setState({sort_price_btn: 0});
        this.setState({sort_depart_btn: 0});
        if(this.state.sort_duration_btn === 0 && click === 1){
            this.setState({sort_duration_btn: 1});
            click = 0;
        }
        if(this.state.sort_duration_btn === 1 && click === 1){
            this.setState({sort_duration_btn: 2});
            click = 0;
        }
        if(this.state.sort_duration_btn === 2 && click === 1){
            this.setState({sort_duration_btn: 1});
            click = 0;
        }

        let list = this.state.result;
        if (list == undefined) {
            return false;
        }
        if (this.state.sort_duration) {
            list.sort((a, b) => {
                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let dt1 = new Date(a.itineraries[0].outbound.flights[0].departs_at);
                let dt2 = new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at);
                let dt3 = new Date(b.itineraries[0].outbound.flights[0].departs_at);
                let dt4 = new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at);
                return this.diff_minutes(dt1, dt2) - this.diff_minutes(dt3, dt4);
            });
        } else {
            list.sort((a, b) => {

                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let dt1 = new Date(a.itineraries[0].outbound.flights[0].departs_at);
                let dt2 = new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at);
                let dt3 = new Date(b.itineraries[0].outbound.flights[0].departs_at);
                let dt4 = new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at);
                return this.diff_minutes(dt3, dt4) - this.diff_minutes(dt1, dt2);
            });

        }
        this.setState({
            sort_duration: !this.state.sort_duration
        });
        this.setState({
            result: list
        });
    }

    diff_minutes(dt2, dt1) {

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    }
    // -----------Sorting End----------------
    //------------Filter Start---------------
    nonStop() {
        let s = this.state.non_stop;


        if (s) {
            this.setState({ non_stop: false });
            this.setState({ zero_stop: true });
            this.setState({ morethanone_stop: true });
        } else {
            this.setState({ non_stop: true });
        }


    }
    zeroStop = () => {
        let s = this.state.zero_stop;
        console.log(s);

        if (s) {
            this.setState({ zero_stop: false });
            this.setState({ non_stop: true });
            this.setState({ morethanone_stop: true });

        } else {

        }


    }
    moreThanOneStop = () => {

        let s = this.state.morethanone_stop;


        if (s) {
            this.setState({ morethanone_stop: false });
            this.setState({ zero_stop: true });
            this.setState({ non_stop: true });

        } else {
            this.setState({ morethanone_stop: true });
        }


    }
    rangeFilter(val) {
        this.setState({ range: val });
    }

    departureFilter = (event, id) => {

        if (id === 1) {

            this.setState({ early_morning: !this.state.early_morning });
        }
        else if (id === 2) {

            this.setState({ morning: !this.state.morning });

        }
        else if (id === 3) {

            this.setState({ mid_day: !this.state.mid_day });

        }
        if (id === 4) {

            this.setState({ evening: !this.state.evening });

        }

    }

    airlineFilter = (event, id) => {
        if (id === 1) {
            this.setState({ airindia_1: !this.state.airindia_1 });
        }
        if (id === 2) {
            this.setState({ indigo_2: !this.state.indigo_2 });
        }
        if (id === 3) {
            this.setState({ vistara_3: !this.state.vistara_3 });
        }
        if (id === 4) {
            this.setState({ jetairways_4: !this.state.jetairways_4 });
        }
        if (id === 5) {
            this.setState({ goair_5: !this.state.goair_5 });
        }
        if (id === 6) {
            this.setState({ spicejet_6: !this.state.spicejet_6 });
        }
        if (id === 7) {
            this.setState({ others_7: !this.state.others_7 });
        }

    }

    //------------Filter End---------------
    FetchData = () => {
        let api = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${this.state.source.iata_code}&destination=${this.state.destination.iata_code}&departure_date=${this.FormatDate(this.state.depart_date)}&currency=INR&travel_class=${this.state.class}`


        fetch(api).then(res => res.json()).then(res => {
            this.setState({
                result: res.results
            });
            this.setState({
                fetching: false
            });
            if (this.state.result != '' && this.state.result != undefined) {

                let total_passenger = parseInt(this.props.match.params.adult) + parseInt(this.props.match.params.child) + parseInt(this.props.match.params.infant);
                this.setState({ total_passenger: total_passenger });
                this.setState({ min_price: (parseFloat(this.state.result[0].fare.total_price) * total_passenger) - 100 });
                this.setState({ max_price: (parseFloat(this.state.result[this.state.result.length - 1].fare.total_price) * total_passenger) + 100 });
                this.setState({ range: this.state.max_price });
            }

        });
    }
    componentWillMount() {

        let api = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${this.props.match.params.src}&destination=${this.props.match.params.dest}&departure_date=${this.props.match.params.dept_date}&currency=INR&travel_class=${this.props.match.params.class}`
        console.log(api);
        fetch(api).then(res => res.json()).then(res => {
            this.setState({
                result: res.results
            });
            this.setState({
                fetching: false
            });
            if (this.state.result != '' && this.state.result != undefined) {

                let total_passenger = parseInt(this.props.match.params.adult) + parseInt(this.props.match.params.child) + parseInt(this.props.match.params.infant);
                this.setState({ total_passenger: total_passenger });
                this.setState({ min_price: (parseFloat(this.state.result[0].fare.total_price) * total_passenger) - 100 });
                this.setState({ max_price: (parseFloat(this.state.result[this.state.result.length - 1].fare.total_price) * total_passenger) + 100 });
                this.setState({ range: this.state.max_price });
            }


        });




    }
    FormatDate = (depart_date) => {
        let month = (depart_date.getMonth() + 1).toString();
        if (month.length == 1) {
            month = '0' + month;
        }
        let date = (depart_date.getDate()).toString();
        if (date.length == 1) {
            date = '0' + date;
        }
        let year = depart_date.getFullYear().toString();
        return `${year}-${month}-${date}`;
    }
    handleFilterClick = () => {
        if (this.state.filters === 0) {
            this.setState({ filters: 1 });
        }
        if (this.state.filters === 1) {
            this.setState({ filters: 0 });
        }
    }
    HandleSubmit = (event) => {
        if (this.state.source_value_store != this.state.source_value) {
            alert("select a valid Source City");
            return false;
        }
        if (this.state.destination_value_store != this.state.destination_value) {
            alert("select a valid Destination City");
            return false;
        }


        if (this.state.source == '') {
            alert("Please select Source city");
            return false;
        }
        if (this.state.destination == '') {
            alert("Please select Destination city");
            return false;
        }
        if (this.state.source.iata_code == this.state.destination.iata_code) {
            alert("Source and Destination can't be same");
            return false;
        }
        // if(this.state.depart_date<new Date(mindate))
        // {
        //     alert("Depart date cannot be less than current date.");
        //     return false;
        // }
        // if(this.state.depart_date > new Date(this.props.maxdate))
        // {
        //     alert("Depart date cannot be more than a year from current date.");
        //     return false;
        // }
        if (parseInt(this.state.adult) + parseInt(this.state.child) + parseInt(this.state.infant) > 6) {
            alert("Maximum of 6 traveller's allowed");
            return false;
        }
        if (parseInt(this.state.infant) > parseInt(this.state.adult)) {
            alert("Number of infants cannot be more than adults");
            return false;
        }
        this.props.history.push(`/onewaysearch/${this.state.source.iata_code}/${this.state.destination.iata_code}/${this.FormatDate(this.state.depart_date)}/${this.state.class}/${this.state.adult}/${this.state.child}/${this.state.infant}`);
        this.FetchData();

        this.setState({ fetching: true });

    }
    getCityPlaceholder = (code) => {
        let suggestion = AirportList.find((element) => {
            return element.iata_code === code;
        });
        return suggestion.location + ' (' + suggestion.iata_code + ') ,IN';
    }

    ClearCity = (flag) => {
        if (flag) {
            this.setState({ source: '' });
        }
        else {
            this.setState({ destination: '' });
        }
    }
    changeLocation = (location, flag) => {

        if (flag) {
            this.setState({ source: location });
            this.setState({ placeholder_source: 'Select Source' });

        }
        else {
            this.setState({ destination: location });
            this.setState({ placeholder_destination: 'Select Destination' });


        }

    }
    HandleBook = (event) => {
        console.log(parseInt(event.target.id.split('_')[1]));
        console.log(this.state.result[parseInt(event.target.id.split('_')[1])].itineraries[0].outbound.flights[0]);
        let result = this.state.result[parseInt(event.target.id.split('_')[1])].itineraries[0].outbound.flights[0];
        this.props.storeOneWayDetail({ result: this.state.result[parseInt(event.target.id.split('_')[1])] });
        this.props.history.push(`/flightdetail/${this.props.match.params.src}/${this.props.match.params.dest}/${this.props.match.params.dept_date}/${this.props.match.params.class}/${this.props.match.params.adult}/${this.props.match.params.child}/${this.props.match.params.infant}/${result.marketing_airline}/${result.flight_number}`);
    };
    render() {
        let list = [];
        let NoFlights = <center><h4>No Flights Found</h4></center>;




        if (!this.state.result == '') {
            list = this.state.result;

            list = this.state.result.filter((val, index) => {
                val.id = index;
                return (this.state.non_stop) ? true : val.itineraries[0].outbound.flights.length == 1 && !this.state.non_stop
            })
                .filter(val => {
                    return (this.state.morethanone_stop) ? true : val.itineraries[0].outbound.flights.length > 1 && !this.state.morethanone_stop
                })
                .filter(val => {
                    // if(this.state.range<=parseFloat(val.fare.total_fare)*this.state.total_passenger)
                    // {
                    //     return true;
                    // }
                    // return true;
                    return (parseInt(val.fare.price_per_adult.total_fare) * this.state.total_passenger <= this.state.range);
                })
                .filter(val => {
                    // if(!this.state.early_morning && !this.state.morning && !this.state.evening && !this.state.mid_day)
                    // {
                    //     return true;
                    // }
                    if (this.state.early_morning && this.state.morning && this.state.evening && this.state.mid_day) {
                        return true;
                    }

                    if (!this.state.early_morning) {
                        let date = new Date(val.itineraries[0].outbound.flights[0].departs_at);
                        let hour = date.getHours();
                        let min = date.getMinutes();
                        if (hour >= 0 && hour < 7) {
                            if (hour == 6 && min != 0) {
                                return false;
                            }
                            return true
                        }
                    }
                    if (!this.state.morning) {
                        let date = new Date(val.itineraries[0].outbound.flights[0].departs_at);
                        let hour = date.getHours();
                        let min = date.getMinutes();
                        if (hour >= 6 && hour <= 11) {
                            if (hour == 11 && min != 0) {
                                return false;
                            }
                            return true
                        }
                    }
                    if (!this.state.mid_day) {
                        let date = new Date(val.itineraries[0].outbound.flights[0].departs_at);
                        let hour = date.getHours();
                        let min = date.getMinutes();

                        if (hour >= 11 && hour <= 17) {
                            if (hour == 17 && min != 0) {
                                return false;
                            }
                            return true
                        }
                    }
                    if (!this.state.evening) {
                        let date = new Date(val.itineraries[0].outbound.flights[0].departs_at);
                        let hour = date.getHours();
                        let min = date.getMinutes();

                        if (hour >= 17 && hour <= 23) {
                            // if(hour==5 && min!=0)
                            // {
                            //     return false;
                            // }
                            return true
                        }
                    }



                })
                .filter(val => {
                    let airline = val.itineraries[0].outbound.flights[0].marketing_airline;

                    if (this.state.airindia_1 && this.state.indigo_2 && this.state.vistara_3 && this.state.jetairways_4 && this.state.goair_5 && this.state.spicejet_6 && this.state.others_7) {
                        return true;
                    }
                    if (!this.state.airindia_1 && val.itineraries[0].outbound.flights[0].marketing_airline === 'AI') {
                        return true;
                    }
                    if (!this.state.indigo_2 && val.itineraries[0].outbound.flights[0].marketing_airline === '6E') {
                        return true;
                    }
                    if (!this.state.vistara_3 && val.itineraries[0].outbound.flights[0].marketing_airline === 'UK') {
                        return true;
                    }
                    if (!this.state.jetairways_4 && val.itineraries[0].outbound.flights[0].marketing_airline === '9W') {
                        return true;
                    }
                    if (!this.state.goair_5 && val.itineraries[0].outbound.flights[0].marketing_airline === 'G8') {
                        return true;
                    }
                    if (!this.state.spicejet_6 && val.itineraries[0].outbound.flights[0].marketing_airline === 'SG') {
                        return true;
                    }
                    if (!this.state.others_7 && airline != 'AI' && airline != '9W' && airline != 'G8' && airline != 'UK' && airline != '6E') {
                        return true;
                    }


                })
                .map((val, index) => <SearchResults key={index} id={val.id} HandleBook={this.HandleBook} value={val} adult={parseInt(this.props.match.params.adult)} child={parseInt(this.props.match.params.child)} infant={parseInt(this.props.match.params.infant)} />);
            if (list.length == 0) {
                list = <center><h4>No Flights Available</h4></center>;
            }




        }
        let showFilters = null;
        if (this.state.filters === 1) {
            showFilters = <FilterBar departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} />
        }
        if (this.state.filters === 0) {
            showFilters = null;
        }

        var source = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={true} id="1" ClearCity={this.ClearCity} oneway_value={this.state.source_value} changeValue={this.changeSourceValue} changeStoreValue={this.changeSourceStoreValue} />;
        var destination = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={false} id="2" ClearCity={this.ClearCity} oneway_value={this.state.destination_value} changeValue={this.changeDestinationValue} changeStoreValue={this.changeDestinationStoreValue} />;

        var mindate = new Date().toISOString().split('T')[0];
        let date = new Date();
        let year = parseInt(date.getFullYear()) + 1;
        let month = date.getMonth();
        let date1 = date.getDate();
        let maxdate = new Date(year, month, date1).toISOString().split('T')[0];
        let sort_btn_depart, sort_btn_duration, sort_btn_price;
        if(this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 1){
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_up</i></div>;
        }
        if(this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 2){
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_down</i></div>;
        }
        if(this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 1 && this.state.sort_price_btn === 0){
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if(this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 2 && this.state.sort_price_btn === 0){
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if(this.state.sort_depart_btn === 1 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 0){
            sort_btn_depart = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if(this.state.sort_depart_btn === 2 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 0){
            sort_btn_depart = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div>PRICE</div>;
        }

        return (
            <div id="onewayresultpage" className="row grey lighten-4">
                <div id="remove_padding" className="col s12 m12 l12">
                    <div className="row indigo darken-4">
                        <form id="form" className="col s12 m12 l12" >
                            <div id="row2" className="row">
                                <div className="col s12 m5 l2">
                                    <h6 className="white-text">From</h6>

                                    {/*{(this.state.swap)?source:destination}*/}
                                    {source}
                                </div>
                                <div className="col s12 m2 l1 center" >
                                    <div id="swap_icon" className="row"><i id="swap_icon_main" className="material-icons white-text col s12 m12 l12" onClick={this.swapCity}>swap_vertical_circle</i></div>
                                </div>
                                <div className="col s12 m5 l2">
                                    <h6 className="white-text">To</h6>
                                    {/*<input placeholder="Enter city or airport" type="text" className="s12 m12 l12" />*/}
                                    {/*{(this.state.swap)?source:destination}*/}
                                    {destination}
                                </div>
                                <div className="col s12 m5 l3">
                                    <div className="col s6 m6 l6">
                                        <h6 className="white-text" style={{whiteSpace: "nowrap"}}>Depart Date</h6>
                                        <input placeholder="Select a depart date" className="white-text" min={mindate} max={maxdate} defaultValue={this.props.match.params.dept_date} type="date" onChange={(event) => { this.setState({ depart_date: new Date(event.target.value) }) }} />
                                    </div>
                                    <div className="col s6 m6 l6">
                                        <h6 className="white-text">Class</h6>
                                        <select className="browser-default" defaultValue={this.props.match.params.class} onChange={(event) => { this.setState({ class: event.target.value }) }} >
                                            <option value="ECONOMY">Economy</option>
                                            <option value="BUSINESS">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col s12 m7 l4">
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{whiteSpace: "nowrap"}}>Adult(12+ yr)</h6>
                                        <select className="browser-default" defaultValue={this.props.match.params.adult} onChange={(event) => { this.setState({ adult: event.target.value }) }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{whiteSpace: "nowrap"}}>Child(2-12 yr)</h6>
                                        <select className="browser-default" defaultValue={this.props.match.params.child} onChange={(event) => { this.setState({ child: event.target.value }) }} >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{whiteSpace: "nowrap"}}>Infant(0-2 yr)</h6>
                                        <select className="browser-default" defaultValue={this.props.match.params.infant} onChange={(event) => { this.setState({ infant: event.target.value }) }} >
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <div id="search_button" className="col s12 m3 l3">
                                        <div id="just_add_pad" className="col m12 l12 hide-on-small-only"></div>
                                        <button className="waves-effect waves-dark btn white col s12 m12 l12 black-text" onClick={this.HandleSubmit} type="button">Search</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="OneWayResult">
                        <div className="row">
                            <div className="col s12 m12 hide-on-large-only">
                                <div className="row"><div className="col s12 m12"><a className="waves-effect waves-light btn col s12 m12 indigo darken-4" onClick={this.handleFilterClick}>Filters<i className="material-icons right">arrow_drop_down</i></a></div></div>
                            </div>
                            <div>{showFilters}</div>
                            <div id="filtersoneway" className="col l3 hide-on-med-and-down">
                                <FilterBar departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} min_price={this.state.min_price} max_price={this.state.max_price} />
                            </div>
                            <div className="col s12 m12 l9">
                                <div id="sort_bar" className="col s12 m12 l12 indigo lighten-4 z-depth-1 valign-wrapper" style={{ marginTop: 10 }}>
                                    <div id="price_sort" className="col s6 m3 l3 center"><p style={{ margin: 0 }}>Sort By:</p></div>
                                    <div id="price_sort" className="col s6 m3 l3"><p style={{ margin: 0 }} onClick={this.sortByDepart}>{sort_btn_depart}</p></div>
                                    <div id="price_sort" className="col s6 m3 l3"><p style={{ margin: 0 }} onClick={this.sortByDuration}>{sort_btn_duration}</p></div>
                                    <div id="price_sort" className="col s6 m3 l3"><p style={{ margin: 0 }} onClick={this.sortByPrice}>{sort_btn_price}</p></div>
                                </div>

                                <ul id="ul_search" className="col s12 m12 l12">
                                    {(this.state.fetching) ? <Spinner /> : ((this.state.result == undefined) ? NoFlights : list)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        oneWay: state.OneWaySearch,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

        showOneWayResult: (show) => {
            dispatch(showOneWayResult(show));
        },
        storeOneWayDetail: (detail) => {
            dispatch(storeOneWayDetail(detail));
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OneWayResult));