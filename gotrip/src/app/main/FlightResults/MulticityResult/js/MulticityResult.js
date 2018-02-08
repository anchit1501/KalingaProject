import React, { Component } from 'react';
import '../css/MulticityResult.css';
import { withRouter } from 'react-router-dom';
import FilterBarRound from '../../FilterBar/js/FilterBarRound.js';
import SearchResultMulticity from '../../SearchResultMulticity/js/SearchResultMulticity.js';
import AirportList from '../../../FlightSearch/AirportDropdown/js/AirportList';
import AirportInput from '../../../FlightSearch/AirportDropdown/js/AirportInput';
import plane from '../../../../assets/animation/plane.gif';
import { key } from '../../../../../apikey';
import { sortByPrice, sortByDuration, sortByDepart } from '../../RoundTripResult/js/Sorting';
import SelectedCard from './SelectedCard';
import Spinner from '../../spinner/js/spinner';
class MulticityResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_passenger: 1,
            overlap: false,
            current: 0,
            selected_source: '',
            selected_source_value: '',
            selected_source_value_store: '',
            selected_destination: '',
            selected_destination_value: '',
            selected_destination_value_store: '',
            selected_date: '',
            filters: 0,

            result_0: [],
            result_1: [],
            result_2: [],
            result_3: [],

            fetching_0: true,
            fetching_1: true,
            fetching_2: true,
            fetching_3: true,

            selected_0_id: 'result_0_0',
            selected_1_id: 'result_1_0',
            selected_2_id: 'result_2_0',
            selected_3_id: 'result_3_0',

            sort_price: false,
            sort_depart: false,
            sort_arrival: false,
            sort_duration: false,

            non_stop: true,
            zero_stop: false,
            morethanone_stop: true,

            range: 0,
            min_price: 0,
            max_price: 0,

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
            status: '',
            filters: 0,
            sort_depart_btn: 0,
            sort_duration_btn:0,
            sort_price_btn:1
        }
    }

    HandleSubmit = () => {
        //console.log(this.state[`selected_source`]);
        // if (this.state.selected_source_value_store != this.state.selected_source_value) {
        //     alert("select a valid Source City");
        //     return false;
        // }
        // if (this.state.selected_destination_value_store != this.state.selected_destination_value) {
        //     alert("select a valid Destination City");
        //     return false;
        // }
        this.setState({ [`result_${this.state.current}`]: [] });

        if (this.state[`selected_source`] == '') {
            alert("Please select Source city");
            return false;
        }
        if (this.state[`selected_destination`] == '') {
            alert("Please select Destination city");
            return false;
        }
        //console.log(this.state[`selected_source`].iata_code);
        if (this.state[`selected_source`].iata_code == this.state[`selected_destination`].iata_code) {
            alert("Source and Destination can't be same");
            return false;
        }
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        console.log(data);
        data[`source_${this.state.current}`] = this.state.selected_source;
        data[`source_${this.state.current}_value`] = this.state.selected_source_value;
        data[`source_${this.state.current}_value_store`] = this.state.selected_source_value_store;
        data[`destination_${this.state.current}`] = this.state.selected_destination;
        data[`destination_${this.state.current}_value`] = this.state.selected_destination_value;
        data[`destination_${this.state.current}_value_store`] = this.state.selected_destination_value_store;
        data[`date_${this.state.current}`] = (this.state.selected_date);

        sessionStorage.setItem('multicitydata', JSON.stringify({ ...data }));
        console.log(JSON.parse(sessionStorage.getItem('multicitydata')), data, JSON.parse(sessionStorage.getItem('data')));
        this.setState({ [`fetching_${this.state.current}`]: true });
        this.fetchData(this.state.current);
        // this.setState({ [`fetching_${this.state.current}`]: true });
    }
    checkOverlap = (a, b, c, d) => {
        if (!(this.state.result_0.results != undefined || this.state.result_1.results != undefined || this.state.result_2.results != undefined || this.state.result_3.results != undefined)) {
            return false;
        }
        if (!this.state.fetching_0 && !this.state.fetching_1 && this.state.result_0.results != undefined && this.state.result_1.results != undefined) {
            let first = this.getFlightById(this.state.selected_0_id);
            let second = this.getFlightById(this.state.selected_1_id);
            console.log(first);
            if (new Date(first.itineraries[0].outbound.flights[0].arrives_at) > new Date(second.itineraries[0].outbound.flights[second.itineraries[0].outbound.flights.length - 1].departs_at)) {
                // this.setState({overlap:true});
                return false
            }
            if (this.state.add - 1 >= 2) {
                if (!this.state.fetching_2 && !this.state.fetching_1 && this.state.result_2.results != undefined && this.state.result_1.results != undefined) {
                    let second = this.getFlightById(this.state.selected_1_id);
                    let third = this.getFlightById(this.state.selected_2_id);
                    console.log(second, third);
                    if (new Date(second.itineraries[0].outbound.flights[0].arrives_at) > new Date(third.itineraries[0].outbound.flights[third.itineraries[0].outbound.flights.length - 1].departs_at)) {
                        return false
                    }
                }
            }
            if (this.state.add > 3) {
                if (!this.state.fetching_3 && !this.state.fetching_2 && this.state.result_3.results != undefined && this.state.result_2.results != undefined) {
                    let third = this.getFlightById(this.state.selected_2_id);
                    let fourth = this.getFlightById(this.state.selected_3_id);
                    if (new Date(third.itineraries[0].outbound.flights[0].arrives_at) > new Date(fourth.itineraries[0].outbound.flights[fourth.itineraries[0].outbound.flights.length - 1].departs_at)) {
                        return false
                    }
                }
            }
        }

        return true;
    }
    componentWillMount = () => {
        let d = this.state;
        this.changeFlightData(0)
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        this.setState({ add: data.add });

        this.setState({ date_0: data.date_0 });
        this.setState({ date_1: data.date_1 });
        this.setState({ date_2: data.date_2 });
        this.setState({ date_3: data.date_3 });

        this.setState({ adult: data.adult });
        this.setState({ child: data.child });
        this.setState({ infant: data.infant });
        this.setState({ class: data.class });



        this.fetchData(0);
        this.fetchData(1);
        console.log('add', data.add);
        for (let i = 2; i <= data.add - 1; i++) {
            this.fetchData(i);
        }

    }
    componentDidMount = () => {
        //console.log(this.state);
        this.changeFlightData(0);
    }
    handleFilterClick = () => {
        if (this.state.filters === 0) {
            this.setState({ filters: 1 });
        }
        if (this.state.filters === 1) {
            this.setState({ filters: 0 });
        }
    }
    fetchData = (id) => {
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        console.log(id);
        let api = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${data[`source_${id}`].iata_code}&destination=${data[`destination_${id}`].iata_code}&departure_date=${this.FormatDate(data[`date_${id}`])}&currency=INR&travel_class=${'ECONOMY'}`;
        console.log(api);
        console.log(data[`date_${id}`]);
        let url = 'https://api.myjson.com/bins/1b5ik1';
        fetch(api).then((res) => res.json()).then((res) => {
            console.log(res);

            if (res.results) {
                res.results.map((val, index) => {
                    val.id = `result_${id}_${index}`;
                    return val;
                });
                this.setState({ [`result_${id}`]: res });
                console.log(res);
                if (parseInt(res.results[0].fare.total_price) < this.state.min_price || this.state.min_price == 0) {
                    this.setState({ min_price: res.results[0].fare.total_price });
                    // console.log(this.state.min_price);
                }
                if (this.state.max_price < res.results[res.results.length - 1].fare.total_price) {
                    // console.log(this.state.max_price);
                    this.setState({ max_price: res.results[res.results.length - 1].fare.total_price });
                    this.setState({ range: res.results[res.results.length - 1].fare.total_price });

                }
            }

            this.setState({ [`fetching_${id}`]: false });


        });
    }
    changeDate = () => {
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        this.setState({ selected_date: (data[`date_${this.state.current}`]) });
    }
    changeFlightData = (id) => {
        //console.log("working"); 
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        console.log(this.state.current, data[`date_${this.state.current}`]);
        this.changeDate();
        this.setState({ selected_source: data[`source_${id}`] });
        this.setState({ selected_date: (data[`date_${this.state.current}`]) });

        this.setState({ selected_source_value: data[`source_${id}_value`] });
        this.setState({ selected_source_value_store: data[`source_${id}_value_store`] });
        this.setState({ selected_destination: data[`destination_${id}`] });
        this.setState({ selected_destination_value: data[`destination_${id}_value`] });
        this.setState({ selected_destination_value_store: data[`destination_${id}_value_store`] });
        console.log(data[`date_${this.state.current}`]);
    }
    changeFlight = (e, outbound, id) => {
        console.log(e, outbound, id);
        this.setState({ [`selected_${this.state.current}_id`]: outbound });
    }
    nextFlight = () => {
        //console.log(this.state.data.add,this.state.current);
        let c = this.state.current;

        if (this.state.current >= this.state.add - 1) {
            return false;
        }
        this.setState({ current: this.state.current + 1 });
        this.changeFlightData(this.state.current + 1);

    }
    previousFlight = () => {
        if (this.state.current == 0) {
            return false;
        }
        this.changeFlightData(this.state.current - 1);
        this.setState({ current: this.state.current - 1 });
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
    FormatDate = (depart_date) => {
        depart_date = new Date(depart_date);
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
    changeLocation = (location, flag) => {

        if (flag) {
            this.setState({ selected_source: location });
            this.setState({ data: { ...this.state.data, [`source_${this.state.current}`]: location } });

            this.setState({ placeholder_source: 'Select Source' });

        }
        else {
            this.setState({ selected_destination: location });
            this.setState({ data: { ...this.state.data, [`destination_${this.state.current}`]: location } });

            this.setState({ placeholder_destination: 'Select Destination' });


        }

    }
    changeSourceValue = (value) => {
        // //console.log(value);
        this.setState({ selected_source_value: value });
        this.setState({ data: { ...this.state.data, [`source_${this.state.current}_value`]: value } });
    }


    changeDestinationValue = (value) => {
        // //console.log(value);

        this.setState({ selected_destination_value: value });
        this.setState({ data: { ...this.state.data, [`destination_${this.state.current}_value`]: value } });
    }
    changeSourceStoreValue = (value) => {

        this.setState({ selected_source_value_store: value });

    }
    changeDestinationStoreValue = (value) => {
        this.setState({ selected_destination_value_store: value });
    }

    swapCity = () => {
        if (this.state.selected_source === '' && this.state.selected_destination === '') {
            return false;
        }
        let temp = this.state.selected_source;
        this.setState({ selected_source: this.state.selected_destination });
        this.setState({ selected_destination: temp });
        temp = this.state.selected_source_value;
        this.setState({ selected_source_value: this.state.selected_destination_value });
        this.setState({ selected_destination_value: temp });
        temp = this.state.selected_source_value_store;
        this.setState({ source_value_store: this.state.selected_destination_value_store });
        this.setState({ selected_destination_value_store: temp });
        //console.log("swap");

    }
    getCityObject(code) {
        let suggestion = AirportList.find((element) => {
            return element.iata_code === code;
        });
        return suggestion;
    }
    getFlightById = (id) => {
        let arr = id.split('_');
        let ele = this.state[`result_${arr[1]}`].results.find(val => {
            return val.id == id;
        });
        return ele;
    }
    //~~~~~~~~~~~~~~~~~~~~~~~~filterstart~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    rangeFilter = (val) => {
        this.setState({ range: val });
    }
    nonStop = () => {
        let s = this.state.non_stop;

        if (s) {
            this.setState({ non_stop: false });
            this.setState({ zero_stop: true });
            this.setState({ morethanone_stop: true });
        }




    }
    zeroStop = () => {
        let s = this.state.zero_stop;


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

        }


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
    //~~~~~~~~~~~~~~~~~~~~~~~~filterend~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //~~~~~~~~~~~~~~~~~~~~~~sorting start~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    sortPrice = (e) => {
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
        let list = sortByPrice(this.state[`result_${this.state.current}`].results, this.state.sort_price);
        this.setState({
        [`result_${this.state.current}`]: {
            ...this.state[`result_${this.state.current}`],
            results: list
        }
        });
        this.setState({ sort_price: !this.state.sort_price });

    }
    sortDuration = (e) => {
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
        let list = sortByDuration(this.state[`result_${this.state.current}`].results, this.state.sort_duration);
        this.setState({
        [`result_${this.state.current}`]: {
            ...this.state[`result_${this.state.current}`],
            results: list
        }
        });
        this.setState({ sort_duration: !this.state.sort_duration });


    }
    sortDepart = () => {
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
        let list = sortByDepart(this.state[`result_${this.state.current}`].results, this.state.sort_depart);
        this.setState({
        [`result_${this.state.current}`]: {
            ...this.state[`result_${this.state.current}`],
            results: list
        }
        });
        this.setState({ sort_depart: !this.state.sort_depart });

    }
    //~~~~~~~~~~~~~~~~~~~~~~sorting End~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    HandleBooking = () => {
        sessionStorage.setItem('multicitybooking', JSON.stringify(this.state));
        this.props.history.push('multicitybooking');
    }
    render() {
        let data = JSON.parse(sessionStorage.getItem('multicitydata'));
        var source = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={true} id="1" ClearCity={this.ClearCity} oneway_value={this.state.selected_source_value} changeValue={this.changeSourceValue} changeStoreValue={this.changeSourceStoreValue} />;
        var destination = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={false} id="2" ClearCity={this.ClearCity} oneway_value={this.state.selected_destination_value} changeValue={this.changeDestinationValue} changeStoreValue={this.changeDestinationStoreValue} />;
        let list = this.state[`result_${this.state.current}`].results;
        if (!this.state[`fetching_${this.state.current}`] && list != undefined) {
            list = this.state[`result_${this.state.current}`].results.filter((val, index) => {

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


                }).map(val => val);
            //     console
            console.log("check", list);
        }
        let showFilters = null;
        if (this.state.filters === 1) {
            showFilters = <FilterBarRound departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} min_price={this.state.min_price} max_price={this.state.max_price} />
        }
        if (this.state.filters === 0) {
            showFilters = null;
        }
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
            <div id="multicityresultpage" className="row grey lighten-4" style={{margin: 0}}>
                <div id="remove_padding" className="col s12 m12 l12">
                    <div className="row indigo darken-4" style={{margin: 0}}>
                        <form id="form" className="col s12 m12 l12">
                            <div id="row2" className="row">
                                <div className="col s12 m5 l2">
                                    <h6 className="white-text">From</h6>
                                    {/*<input placeholder="Enter city or airport" type="text" className="s12 m12 l12" />*/}
                                    {/*/*{(this.state.swap)?source:destination}*/}
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
                                        <h6 className="white-text">Depart Date</h6>
                                        <input placeholder="Select a depart date" className="white-text" min={(this.state.current == 0) ? this.FormatDate(new Date()) : this.FormatDate(this.state[`date_${this.state.current - 1}`])} type="date" value={this.FormatDate(this.state[`date_${this.state.current}`])} onChange={(event) => { this.setState({ [`date_${this.state.current}`]: new Date(event.target.value) }) }} />
                                    </div>
                                    <div className="col s6 m6 l6">
                                        <h6 className="white-text">Class</h6>
                                        <select className="browser-default" defaultValue={this.state.class} onChange={(event) => { this.setState({ class: event.target.value }) }} >
                                            <option value="ECONOMY">Economy</option>
                                            <option value="BUSINESS">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col s12 m7 l4">
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Adult(12+ yr)</h6>
                                        <select className="browser-default" defaultValue={this.state.adult} onChange={(event) => { this.setState({ adult: event.target.value }) }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </div>
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Child(2-12 yr)</h6>
                                        <select className="browser-default" defaultValue={this.state.child} onChange={(event) => { this.setState({ child: event.target.value }) }} >
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
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Infant(0-2 yr)</h6>
                                        <select className="browser-default" defaultValue={this.state.infant} onChange={(event) => { this.setState({ infant: event.target.value }) }} >
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
                    <div className="col l12 hide-on-med-and-down">
                        <FilterBarRound departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} min_price={this.state.min_price} max_price={this.state.max_price} />
                    </div>
                    <div className="OneWayResult">
                        <div className="row">
                            <div id="filter_button" className="col s12 m12 hide-on-large-only">
                                <div className="row"><div className="col s12 m12"><a className="waves-effect waves-light btn col s12 m12 indigo darken-4" onClick={this.handleFilterClick}>Filters<i className="material-icons right">arrow_drop_down</i></a></div></div>
                            </div>
                            <div className="hide-on-large-only">
                                {showFilters}
                            </div>
                            <div id="remove_margin_card_row" className="row">
                                <div className="col s12 m12 l12">
                                    
                                    <div className="card-panel">
                                        <div className="row" style={{ margin: 0 }}>
                                            {(!this.checkOverlap(this.state.selected_0_id, this.state.selected_1_id, this.state.selected_2_id, this.state.selected_3_id) && (this.state.result_0.results != undefined || this.state.result_1.results != undefined || this.state.result_2.results != undefined || this.state.result_3.results != undefined)) ? <div className="row" style={{ marginTop: 0, marginLeft: 0, marginRight: 0, width: '100%' }}>
                                                <div className="col m12 s12 l12" style={{ backgroundColor: "#fff7dc" }}>
                                                    <p style={{ color: '#ff8500' }} className="valign-center"><i class="material-icons" style={{ fontSize: '14px' }}>error</i>  Hey, these flights overlaps, please change the timings.</p>
                                                </div>

                                            </div> : ''}
                                            <div className="col s12 m12 l12">
                                                <div className="col s12 m12 l12"><b>Selected Flights</b></div>
                                                <div className="row" style={{ margin: 0 }}>
                                                    {(!this.state.fetching_0 ) ? <SelectedCard flag={this.state.result_0.results != undefined} flight={(this.state.result_0.results != undefined)?this.getFlightById(this.state.selected_0_id):''} src={data[`source_${0}`].iata_code} dest={data[`destination_${0}`].iata_code} /> : ''}
                                                    {(!this.state.fetching_1 ) ? <SelectedCard  flag={this.state.result_1.results != undefined} flight={(this.state.result_1.results != undefined)?this.getFlightById(this.state.selected_1_id):''} src={data[`source_${1}`].iata_code} dest={data[`destination_${1}`].iata_code} /> : ''}
                                                    {(!this.state.fetching_2 ) ? (this.state.add >= 2) ? <SelectedCard flag={this.state.result_2.results != undefined} flight={(this.state.result_2.results != undefined)?this.getFlightById(this.state.selected_2_id):''}  src={data[`source_${2}`].iata_code} dest={data[`destination_${2}`].iata_code} /> : '' : ''}
                                                    {(!this.state.fetching_3 ) ? (this.state.add > 3) ? <SelectedCard flag={this.state.result_3.results != undefined} flight={(this.state.result_3.results != undefined)?this.getFlightById(this.state.selected_3_id):''}  src={data[`source_${3}`].iata_code} dest={data[`destination_${3}`].iata_code} /> : '' : ''}
                                                </div>
                                            </div>
                                            <div className="col s12 m12 l12">
                                                <button disabled={!this.checkOverlap(this.state.selected_0_id, this.state.selected_1_id, this.state.selected_2_id, this.state.selected_3_id)} onClick={this.HandleBooking} className="col s12 m12 l12 waves-effect waves-light btn indigo darken-4 right">Book</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m12 l12">
                                <div className="row">
                                    <div className="col s12 m12 l12 indigo lighten-4 z-depth-1">
                                        <div className="row" style={{ margin: 0 }}>
                                            <div className="left">
                                                {(this.state.current != 0) ? <p className="valign-wrapper" onClick={this.previousFlight} style={{cursor: "pointer"}}><i className="material-icons">keyboard_arrow_left</i> Previous</p> : ''}
                                            </div>
                                            <div className="right">
                                                {(this.state.current < this.state.add - 1) ? <p className="valign-wrapper" onClick={this.nextFlight} style={{cursor: "pointer"}}>Next <i className="material-icons">keyboard_arrow_right</i></p> : ''}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 m12 l12">
                                    <ul id="ul_search" className="col s12 m12 l12">
                                        <li className="card-panel indigo lighten-4">
                                            <div className="row" style={{ margin: 0 }}>
                                                <div className="col s12 m12 l12">
                                                    <div className="col s7 m8 l8">
                                                        <p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.state.selected_source.iata_code}</b></p><i className="material-icons col s4 m4 l4">arrow_forward</i><p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.state.selected_destination.iata_code}</b></p>
                                                    </div>
                                                    <div className="col s5 m4 l3 right"><p className="col s12 m12 l12" style={{ margin: 0 }}>{new Date(this.state[`date_${this.state.current}`]).toDateString()}</p></div>
                                                </div>
                                                <div id="sort_bar" className="col s12 m12 l12 grey lighten-3 z-depth-1 valign-wrapper">
                                                    <div className="col s6 m2 l3 center"><p style={{ margin: 0 }}>SortBy:</p></div>
                                                    <div id="sort_price_btn" onClick={(event) => { this.sortDepart("outbound") }} className="col s6 m4 l3"><p style={{ margin: 0 }}>{sort_btn_depart}</p></div>
                                                    <div id="sort_price_btn" className="col s6 m4 l3" onClick={(event) => { this.sortDuration(event) }}><p style={{ margin: 0 }}>{sort_btn_duration}</p></div>
                                                    <div id="sort_price_btn" className="col s6 m2 l3" onClick={(event) => { this.sortPrice(event) }}><p style={{ margin: 0 }}>{sort_btn_price}</p></div>
                                                </div>
                                            </div>
                                        </li>
                                        <form >


                                            {(!this.state[`fetching_${this.state.current}`] && this.state[`result_${this.state.current}`].results != undefined) ? <SearchResultMulticity flight={{ ...this.state[`result_${this.state.current}`], results: list }} {...this.state} name={`result_${this.state.current}`} changeFlight={this.changeFlight} selected_flight={this.state[`selected_${this.state.current}_id`]} total_passenger={parseInt(this.state.adult) + parseInt(this.state.child) + parseInt(this.state.infant)} />
                                                : (!this.state[`fetching_${this.state.current}`] && this.state[`result_${this.state.current}`].results == undefined) ? <h4 className="col s12 m12 l12 center">No Flights Available</h4> : <Spinner />}
                                        </form>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default withRouter(MulticityResult);