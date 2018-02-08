import React, { Component } from 'react';
import '../css/RoundTripResult.css';
import AirportInput from '../../../FlightSearch/AirportDropdown/js/AirportInputResultPage';
import FilterBarRound from '../../FilterBar/js/FilterBarRound.js';
import SearchResultInbound from '../../SearchResultsRound/js/SearchResultsInbound.js';
import SearchResultOutbound from '../../SearchResultsRound/js/SearchResultsOutbound.js';
import AirportList from '../../../FlightSearch/AirportDropdown/js/AirportList';
import { key } from '../../../../../apikey';
import { result, resultReturn } from './sampleData';
import { calulateMinutes } from '../../../OneWayBooking/HelpingFunctions/durationCalulator';
import SelectedCard from './selectedCard';
import Spinner from '../../spinner/js/spinner';
import { FormatDate } from '../../../FlightSearch/RoundTrip/js/RoundTrip';
import { storeRoundTripInbound, storeRoundTripOutbound } from '../../../../state/action/FlightSearchAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { sortByAirline, sortByArrival, sortByDepart, sortByDuration, sortByPrice } from './Sorting';
import RoundResult from './RoundResult';
var inbound_store = [];
var outbound_store = [];
var best_outbound = 'outbound_0';
var best_inbound = 'inbound_0';

class RoundTripResult extends Component {
    constructor(props) {
        super(props);
        this.state = {

            total_passenger: 1,
            min_price: 0,
            max_price: 0,

            selected_outbound: '',
            selected_inbound: '',

            result_outbound: result,
            result_inbound: resultReturn,
            result_outbound: [],
            result_inbound: [],
            status: '',
            filters: 0,

            // fetching_outbound: false,
            // fetching_inbound: false ,

            fetching_outbound: true,
            fetching_inbound: true,


            out_sort_price: false,
            out_sort_depart: false,
            out_sort_arrival: false,
            out_sort_duration: false,
            out_sort_airline: false,

            in_sort_price: false,
            in_sort_depart: false,
            in_sort_arrival: false,
            in_sort_duration: false,
            in_sort_airline: false,

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
            return_date: new Date(this.props.match.params.return_date),
            class: this.props.match.params.class,
            adult: this.props.match.params.adult,
            child: this.props.match.params.child,
            infant: this.props.match.params.infant,
            error: false,

            best_outbound: 'outbound_0',
            best_inbound: 'inbound_0',

            no_flights_outbound: false,
            no_flights_inbound: false,
            finding_best: true,

            sort_depart_btn: 0,
            sort_duration_btn: 0,
            sort_price_btn: 1,

            sort_depart_btn1: 0,
            sort_duration_btn1: 0,
            sort_price_btn1: 1



        }
        // this.getBestFlights = this.getBestFlights.bind(this);

    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    //~~~~~~~~~~~~~~~~~~~~~sorting Strart~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``
    sortPrice = (path) => {
        if (path == 'outbound') {
            let click = 1;
            this.setState({ sort_depart_btn: 0 });
            this.setState({ sort_duration_btn: 0 });
            if (this.state.sort_price_btn === 0 && click === 1) {
                this.setState({ sort_price_btn: 1 });
                click = 0;
            }
            if (this.state.sort_price_btn === 1 && click === 1) {
                this.setState({ sort_price_btn: 2 });
                click = 0;
            }
            if (this.state.sort_price_btn === 2 && click === 1) {
                this.setState({ sort_price_btn: 1 });
                click = 0;
            }
            let arr = sortByPrice(this.state.result_outbound, this.state.out_sort_price);
            this.setState({ result_outbound: arr });
            this.setState({ out_sort_price: !this.state.out_sort_price });
        }
        if (path == 'inbound') {
            let click = 1;
            this.setState({ sort_depart_btn1: 0 });
            this.setState({ sort_duration_btn1: 0 });
            if (this.state.sort_price_btn1 === 0 && click === 1) {
                this.setState({ sort_price_btn1: 1 });
                click = 0;
            }
            if (this.state.sort_price_btn1 === 1 && click === 1) {
                this.setState({ sort_price_btn1: 2 });
                click = 0;
            }
            if (this.state.sort_price_btn1 === 2 && click === 1) {
                this.setState({ sort_price_btn1: 1 });
                click = 0;
            }
            let list = sortByPrice(this.state.result_inbound, this.state.in_sort_price);
            this.setState({ result_inbound: list });
            this.setState({ in_sort_price: !this.state.in_sort_price });
        }
    }
    sortDuration = (path) => {
        console.log("working");
        if (path == 'outbound') {
            let click = 1;
            this.setState({ sort_price_btn: 0 });
            this.setState({ sort_depart_btn: 0 });
            if (this.state.sort_duration_btn === 0 && click === 1) {
                this.setState({ sort_duration_btn: 1 });
                click = 0;
            }
            if (this.state.sort_duration_btn === 1 && click === 1) {
                this.setState({ sort_duration_btn: 2 });
                click = 0;
            }
            if (this.state.sort_duration_btn === 2 && click === 1) {
                this.setState({ sort_duration_btn: 1 });
                click = 0;
            }
            let arr = sortByDuration(this.state.result_outbound, this.state.out_sort_duration);
            this.setState({ result_outbound: arr });
            this.setState({ out_sort_duration: !this.state.out_sort_duration });
        }
        if (path == 'inbound') {
            let click = 1;
            this.setState({ sort_price_btn1: 0 });
            this.setState({ sort_depart_btn1: 0 });
            if (this.state.sort_duration_btn1 === 0 && click === 1) {
                this.setState({ sort_duration_btn1: 1 });
                click = 0;
            }
            if (this.state.sort_duration_btn1 === 1 && click === 1) {
                this.setState({ sort_duration_btn1: 2 });
                click = 0;
            }
            if (this.state.sort_duration_btn1 === 2 && click === 1) {
                this.setState({ sort_duration_btn1: 1 });
                click = 0;
            }
            let list = sortByDuration(this.state.result_inbound, this.state.in_sort_duration);
            this.setState({ result_inbound: list });
            this.setState({ in_sort_duration: !this.state.in_sort_duration });
        }
    }
    sortDepart = (path) => {
        console.log("working");
        if (path == 'outbound') {
            let click = 1;
            this.setState({ sort_price_btn: 0 });
            this.setState({ sort_duration_btn: 0 });
            if (this.state.sort_depart_btn === 0 && click === 1) {
                this.setState({ sort_depart_btn: 1 });
                click = 0;
            }
            if (this.state.sort_depart_btn === 1 && click === 1) {
                this.setState({ sort_depart_btn: 2 });
                click = 0;
            }
            if (this.state.sort_depart_btn === 2 && click === 1) {
                this.setState({ sort_depart_btn: 1 });
                click = 0;
            }
            let arr = sortByDepart(this.state.result_outbound, this.state.out_sort_duration);
            this.setState({ result_outbound: arr });
            this.setState({ out_sort_duration: !this.state.out_sort_duration });
        }
        if (path == 'inbound') {
            let click = 1;
            this.setState({ sort_price_btn1: 0 });
            this.setState({ sort_duration_btn1: 0 });
            if (this.state.sort_depart_btn1 === 0 && click === 1) {
                this.setState({ sort_depart_btn1: 1 });
                click = 0;
            }
            if (this.state.sort_depart_btn1 === 1 && click === 1) {
                this.setState({ sort_depart_btn1: 2 });
                click = 0;
            }
            if (this.state.sort_depart_btn1 === 2 && click === 1) {
                this.setState({ sort_depart_btn1: 1 });
                click = 0;
            }
            let list = sortByDepart(this.state.result_inbound, this.state.in_sort_duration);
            this.setState({ result_inbound: list });
            this.setState({ in_sort_duration: !this.state.in_sort_duration });
        }
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~sortingend~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    getBestFlights(val = 0) {

        //  this.state.result_outbound.map((val,index_out)=>{
        //     this.state.result_inbound.map((data,index_in)=>
        //     {
        //         let arrive=new Date(val.itineraries[0].outbound.flights[val.itineraries[0].outbound.flights.length-1].arrives_at);
        //         let depart=new Date(data.itineraries[0].outbound.flights[0].departs_at);

        //     if(depart> arrive)
        //     {
        //         this.setState({best_outbound:`outbound_${index_out}`});
        //         this.setState({best_inbound:`inbound_${index_in}`});

        //     }
        //     });

        // }) 
        // // console.log("best");
        // let inbound = '';
        // let x = 0;
        // let outbound = this.state.result_outbound[x];

        // while (true && !this.state.fetching_inbound && !this.state.fetching_outbound && this.state.result_inbound.length != 0 && this.state.result_outbound.length != 0) {
        //     let r = outbound.itineraries[0].outbound.flights[outbound.itineraries[0].outbound.flights.length - 1].arrives_at;
        //     let flag = true;
        //     this.state.result_inbound.map((val, index) => {

        //         if (flag) {
        //             if ((new Date(val.itineraries[0].outbound.flights[0].departs_at) > new Date(r)) && (calulateMinutes(new Date(val.itineraries[0].outbound.flights[0].departs_at), new Date(r)) >= 2)) {

        //                 flag = false;
        //                 inbound = `inbound_${index}`;
        //             }
        //         }
        //     });
        //     // console.log(inbound=='' && val==this.state.result_outbound.length,val);
        //     if (inbound != '') {
        //         break;
        //     }
        //     // if (x >= this.state.result_outbound.length - 1) {
        //     //     return false;
        //     // }
        //     if (inbound == '' && x == this.state.result_outbound.length) {

        //         // console.log('Working');
        //         this.getBestFlights(val + 1);


        //     }
        //     x++;
        // }

        // if (this.state.finding_best) {
        //     this.setState({ finding_best: false });
        //     this.setState({ best_outbound: `outbound_${x}` });
        //     this.setState({ best_inbound: inbound });
        // }
        // // console.log(this.state.best_outbound,this.state.best_inbound);

    }
    getCityPlaceholder = (code) => {
        let suggestion = AirportList.find((element) => {
            return element.iata_code === code;
        });
        return suggestion.location + ' (' + suggestion.iata_code + ') ,IN';
    }
    changeFlight = (event, outbound) => {

        //    console.log(event.target.id);
        if (outbound) {
            this.setState({ selected_outbound: event.target.id });
            this.setState({ best_outbound: event.target.id });
        }
        else {
            this.setState({ selected_inbound: event.target.id });
            this.setState({ best_inbound: event.target.id });
        }

    }
    getFlightbyId = (id) => {
        console.log(id);
        let arr = id.split('_');
        if (this.state.result_inbound != undefined && this.state.result_outbound != undefined) {



            if (arr[0] == 'inbound') {
                // console.log(this.state.result_inbound[parseInt(arr[1])]);
                console.log(arr);
                let best = this.state.result_inbound.find(val => {
                    return val.id == id;

                });
                console.log(best);
                return best;

            }
            if (arr[0] == 'outbound') {
                console.log('outboundworking');

                let best = this.state.result_outbound.find(val => {
                    return val.id == id;
                });
                console.log(best);

                return best;
                // return this.state.result_outbound[parseInt(arr[1])];
            }
            // console.log(id.split('_'));
            return false;
        }
    }
    checkOverlap = (inb = '', outb = '') => {
        inb = this.state.best_inbound;
        outb = this.state.best_outbound;
        console.log(inb, outb);

        if (this.state.result_inbound != undefined && this.state.result_outbound != undefined) {

            if (this.state.result_inbound.length > 0 && this.state.result_outbound.length > 0) {
                if (inb != '' && outb != '' && inb != undefined && outb != undefined) {
                    console.log(this.getFlightbyId(outb));
                    let outbound = this.getFlightbyId(outb).itineraries[0].outbound.flights;
                    let inbound = this.getFlightbyId(inb).itineraries[0].outbound.flights;
                    if (outbound[outbound.length - 1].arrives_at < inbound[0].departs_at && calulateMinutes(outbound[0].arrives_at, inbound[0].departs_at) >= 2) {


                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }



        return true;


    }
    HandleBook = (event) => {
        this.props.storeRoundTripInbound(this.getFlightbyId(this.state.best_inbound));
        this.props.storeRoundTripOutbound(this.getFlightbyId(this.state.best_outbound));
        sessionStorage.setItem('inbound', JSON.stringify(this.getFlightbyId(this.state.best_inbound)));
        sessionStorage.setItem('outbound', JSON.stringify(this.getFlightbyId(this.state.best_outbound)));

        this.props.history.push(`/roundflightdetail/${this.props.match.params.src}/${this.props.match.params.dest}/${FormatDate(this.state.depart_date)}/${FormatDate(this.state.return_date)}/${this.state.class}/${this.state.adult}/${this.state.child}/${this.state.infant}`);
    }
    componentDidMount() {

        let api1 = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${this.props.match.params.src}&destination=${this.props.match.params.dest}&departure_date=${this.props.match.params.dept_date}&currency=INR&travel_class=${this.props.match.params.class}`
        // console.log(api1);
        fetch(api1).then(res => res.json()).then(res => {

            if (res.results != undefined) {
                res.results.map((val, index) => {
                    val.id = `outbound_${index}`;
                    return val;
                });
                this.setState({
                    result_outbound: res.results
                });
                outbound_store = res.results;
                if (parseFloat(res.results[0].fare.total_price) < this.state.min_price || this.state.min_price == 0) {
                    this.setState({ min_price: res.results[0].fare.total_price });
                    // console.log(this.state.min_price);
                }
                if (this.state.max_price < res.results[res.results.length - 1].fare.total_price) {
                    // console.log(this.state.max_price);
                    this.setState({ max_price: res.results[res.results.length - 1].fare.total_price });
                    this.setState({ range: res.results[res.results.length - 1].fare.total_price });

                }
            }
            if (res.results == undefined) {
                this.setState({ no_flights_outbound: true });
            }
            this.setState({
                fetching_outbound: false
            });
            this

        });
        let api2 = `https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${key}&origin=${this.props.match.params.dest}&destination=${this.props.match.params.src}&departure_date=${this.props.match.params.return_date}&currency=INR&travel_class=${this.props.match.params.class}`
        console.log(api1);
        fetch(api2).then(res => res.json()).then(res => {

            if (res.results != undefined) {
                res.results.map((val, index) => {
                    val.id = `inbound_${index}`;
                    return val;
                });
                this.setState({ result_inbound: res.results });
                inbound_store = res.results;
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

            if (res.results == undefined) {
                this.setState({ no_flights_inbound: true });
            }
            this.setState({
                fetching_inbound: false
            });


        });

        // window.setTimeout(()=>{
        //     this.getBestFlights();
        // },3000);

    }
    changeSourceValue = (value) => {
        // console.log(value);
        this.setState({ source_value: value });
    }


    changeDestinationValue = (value) => {
        // console.log(value);

        this.setState({ destination_value: value })
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
        // console.log("working",location);
        if (flag) {
            this.setState({ source: location });
            this.setState({ placeholder_source: 'Select Source' });


        }
        else {
            this.setState({ destination: location });
            this.setState({ placeholder_destination: 'Select Destination' });


        }

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
    changeSourceStoreValue = (value) => {

        this.setState({ source_value_store: value });

    }
    changeDestinationStoreValue = (value) => {
        this.setState({ destination_value_store: value });
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
        // if(this.state.depart_date<new Date())
        // {
        //     alert("Depart date cannot be less than current date.");
        //     return false;
        // }
        // if(this.state.depart_date > new Date(this.props.maxdate))
        // {
        //     alert("Depart date cannot be more than a year from current date.");
        //     return false;
        // }
        // if(this.state.return_date<new Date())
        // {
        //     alert("Return date cannot be less than current date.");
        //     return false;
        // }
        // if(this.state.return_date > new Date(this.props.maxdate))
        // {
        //     alert("Return date cannot be more than a year from current date.");
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
        this.props.history.push(`/roundtripsearch/${this.state.source.iata_code}/${this.state.destination.iata_code}/${FormatDate(this.state.depart_date)}/${FormatDate(this.state.return_date)}/${this.state.class}/${this.state.adult}/${this.state.child}/${this.state.infant}`);

        // this.setState(this.baseState);
        this.resetState();
        window.location.reload();
        inbound_store = [];
        outbound_store = [];
        // this.FetchData();
        this.componentDidMount();
        // this.forceUpdate();
    }
    resetState = () => {
        this.state.result_inbound = '';
        this.state.result_outbound = '';

        this.setState({ result_outbound: '' });
        this.setState({ result_inbound: '' });

        this.setState({ best_inbound: '' });
        this.setState({ best_outbound: '' });
        this.setState({ fetching_inbound: true });
        this.setState({ fetching_outbound: true });
    }
    changeDepartDate = (event) => {
        this.setState({ depart_date: new Date(event.target.value) });

        if (new Date(event.target.value) > this.state.depart_date) {
            this.setState({ return_date: new Date(event.target.value) });
        }
        this.changeReturnDate('a');

    }
    changeReturnDate = (val) => {
        if (this.state.return_date < this.state.depart_date) {
            this.setState({ return_date: this.state.depart_date });
        }
    }
    handleFilterClick = () => {
        if (this.state.filters === 0) {
            this.setState({ filters: 1 });
        }
        if (this.state.filters === 1) {
            this.setState({ filters: 0 });
        }
    }
    render() {
        let date = new Date();
        let year = parseInt(date.getFullYear()) + 1;
        let month = date.getMonth();
        let date1 = date.getDate();
        let maxdate = new Date(year, month, date1).toISOString().split('T')[0];
        // console.log(this.props.match.params.dept_date);
        var source = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={true} id="1" ClearCity={this.ClearCity} oneway_value={this.state.source_value} changeValue={this.changeSourceValue} changeStoreValue={this.changeSourceStoreValue} />;
        var destination = <AirportInput className="white-text" placeholder="Select City" changeLocation={this.changeLocation} source={false} id="2" ClearCity={this.ClearCity} oneway_value={this.state.destination_value} changeValue={this.changeDestinationValue} changeStoreValue={this.changeDestinationStoreValue} />;

        let showFilters = null;
        if (this.state.filters === 1) {
            showFilters = <FilterBarRound departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} min_price={this.state.min_price} max_price={this.state.max_price} />
        }
        if (this.state.filters === 0) {
            showFilters = null;
        }
        let sort_btn_depart, sort_btn_duration, sort_btn_price;
        if (this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 1) {
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_up</i></div>;
        }
        if (this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 2) {
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_down</i></div>;
        }
        if (this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 1 && this.state.sort_price_btn === 0) {
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn === 0 && this.state.sort_duration_btn === 2 && this.state.sort_price_btn === 0) {
            sort_btn_depart = <div>DEPARTURE</div>;
            sort_btn_duration = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn === 1 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 0) {
            sort_btn_depart = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn === 2 && this.state.sort_duration_btn === 0 && this.state.sort_price_btn === 0) {
            sort_btn_depart = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_duration = <div>DURATION</div>;
            sort_btn_price = <div>PRICE</div>;
        }

        let sort_btn_depart1, sort_btn_duration1, sort_btn_price1;
        if (this.state.sort_depart_btn1 === 0 && this.state.sort_duration_btn1 === 0 && this.state.sort_price_btn1 === 1) {
            sort_btn_depart1 = <div>DEPARTURE</div>;
            sort_btn_duration1 = <div>DURATION</div>;
            sort_btn_price1 = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_up</i></div>;
        }
        if (this.state.sort_depart_btn1 === 0 && this.state.sort_duration_btn1 === 0 && this.state.sort_price_btn1 === 2) {
            sort_btn_depart1 = <div>DEPARTURE</div>;
            sort_btn_duration1 = <div>DURATION</div>;
            sort_btn_price1 = <div className="valign-wrapper">PRICE<i className="material-icons">keyboard_arrow_down</i></div>;
        }
        if (this.state.sort_depart_btn1 === 0 && this.state.sort_duration_btn1 === 1 && this.state.sort_price_btn1 === 0) {
            sort_btn_depart1 = <div>DEPARTURE</div>;
            sort_btn_duration1 = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_price1 = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn1 === 0 && this.state.sort_duration_btn1 === 2 && this.state.sort_price_btn1 === 0) {
            sort_btn_depart1 = <div>DEPARTURE</div>;
            sort_btn_duration1 = <div className="valign-wrapper">DURATION<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_price1 = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn1 === 1 && this.state.sort_duration_btn1 === 0 && this.state.sort_price_btn1 === 0) {
            sort_btn_depart1 = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_up</i></div>;
            sort_btn_duration1 = <div>DURATION</div>;
            sort_btn_price1 = <div>PRICE</div>;
        }
        if (this.state.sort_depart_btn1 === 2 && this.state.sort_duration_btn1 === 0 && this.state.sort_price_btn1 === 0) {
            sort_btn_depart1 = <div className="valign-wrapper">DEPARTURE<i className="material-icons">keyboard_arrow_down</i></div>;
            sort_btn_duration1 = <div>DURATION</div>;
            sort_btn_price1 = <div>PRICE</div>;
        }

        return (
            <div id="onewayresultpage" className="row grey lighten-4">
                {(!this.state.fetching_inbound && !this.state.fetching_outbound && this.state.result_inbound) ? this.getBestFlights() : ''}
                <div id="remove_padding" className="col s12 m12 l12">
                    <div id="roundtripsearchbar" className="row indigo darken-4">
                        <form id="form" className="col s12 m12 l12" >
                            <div id="row2" className="row">
                                <div className="col s12 m5 l2">
                                    <h6 className="white-text">From</h6>
                                    {source}
                                </div>
                                <div className="col s12 m2 l1 center" >
                                    <div id="swap_icon" className="row"><i id="swap_icon_main" className="material-icons white-text col s12 m12 l12" onClick={this.swapCity}>swap_vertical_circle</i></div>
                                </div>
                                <div className="col s12 m5 l2">
                                    <h6 className="white-text">To</h6>
                                    {destination}
                                </div>
                                <div className="col s12 m5 l3">
                                    <div className="col s6 m4 l4">
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Depart Date</h6>
                                        <input min={new Date().toISOString().split('T')[0]} max={maxdate} className="white-text" type="date" value={FormatDate(this.state.depart_date)} onChange={this.changeDepartDate} />
                                    </div>
                                    <div className="col s6 m4 l4">
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Return Date</h6>
                                        <input min={this.state.depart_date.toISOString().split('T')[0]} max={maxdate} className="white-text" type="date" value={FormatDate(this.state.return_date)} onChange={(event) => { this.setState({ return_date: new Date(event.target.value) }) }} />
                                    </div>
                                    <div className="col s12 m4 l4">
                                        <h6 className="white-text">Class</h6>
                                        <select className="browser-default" defaultValue={this.props.match.params.class} onChange={(event) => { this.setState({ class: event.target.value }) }} >
                                            <option value="ECONOMY">Economy</option>
                                            <option value="BUSINESS">Business</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col s12 m7 l4">
                                    <div className="col s4 m3 l3">
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Adult(12+ yr)</h6>
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
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Child(2-12 yr)</h6>
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
                                        <h6 className="white-text" style={{ whiteSpace: "nowrap" }}>Infant(0-2 yr)</h6>
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
                    <div className="col l12 hide-on-med-and-down">
                        <FilterBarRound departureFilter={this.departureFilter} nonStop={this.nonStop} zeroStop={this.zeroStop} moreThanOneStop={this.moreThanOneStop} rangeFilter={this.rangeFilter}  {...this.state} airlineFilter={this.airlineFilter} min_price={this.state.min_price} max_price={this.state.max_price} />
                    </div>
                    <div className="RoundtripResult">
                        <div className="row">
                            <div id="filter_button" className="col s12 m12 hide-on-large-only">
                                <div className="row"><div className="col s12 m12"><a className="waves-effect waves-light btn col s12 m12 indigo darken-4" onClick={this.handleFilterClick}>Filters<i className="material-icons right">arrow_drop_down</i></a></div></div>
                            </div>
                            <div className="hide-on-large-only">
                                {showFilters}
                            </div>
                            <div className="row">
                                <div className="col s12 m12 l12">

                                    <div id="remove_margin_card_row" className="row">
                                        <div className="col s12 m12 l12">
                                            <div className="card-panel" style={{ margin: 0 }}>
                                                {(!this.state.fetching_inbound && !this.state.fetching_outbound && this.checkOverlap() && this.state.result_inbound.length != 0 && this.state.result_outbound.length != 0) ?
                                                    <div className="row" style={{ marginTop: 0, marginLeft: 0, marginRight: 0, width: '100%' }}>
                                                        <div className="col m12 s12 l12" style={{ backgroundColor: "#fff7dc" }}>
                                                            <p style={{ color: '#ff8500' }} className="valign-center"><i class="material-icons" style={{ fontSize: '14px' }}>error</i>  Hey, these flights overlaps, please change the timings.</p>
                                                        </div>

                                                    </div> : ''}
                                                {/*<div>{(this.checkOverlap(this.state.best_inbound,this.state.best_outbound) && this.state.result_inbound!=undefined && this.state.result_outbound!=undefined)?<p>Hey, these flights overlaps, please change the timings.</p>:''}</div>*/}
                                                <div className="row" style={{ margin: 0 }}>
                                                    <div className="col s12 m12 l12"><b>Selected Flights</b></div>
                                                    {(!this.state.fetching_outbound && !this.state.fetching_inbound && this.state.result_outbound != undefined && this.state.result_inbound != undefined) ?

                                                        <div>
                                                            
                                                            <SelectedCard flight={this.getFlightbyId(this.state.best_outbound)} src={this.props.match.params.src} dest={this.props.match.params.dest}/>
                                                            <SelectedCard flight={this.getFlightbyId(this.state.best_inbound)} dest={this.props.match.params.src} src={this.props.match.params.dest} />
                                                        </div> : ''}
                                                    <div className="col s12 m12 l2">
                                                        <button className="col s12 m12 l12 waves-effect waves-light btn indigo darken-4 right" disabled={this.checkOverlap()} onClick={this.HandleBook}>Book</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m12 l12">
                                <ul id="ul_search" className="col s12 m6 l6">
                                    <li className="card-panel indigo lighten-4">
                                        <div className="row" style={{ margin: 0 }}>
                                            <div className="col s12 m12 l12">
                                                <div className="col s8 m8 l8">
                                                    <p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.props.match.params.src}</b></p><i className="material-icons col s4 m4 l4">arrow_forward</i><p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.props.match.params.dest}</b></p>
                                                </div>
                                                <div className="col s4 m4 l3 right"><p className="col s12 m12 l12" style={{ margin: 0 }}>{this.props.match.params.dept_date}</p></div>
                                            </div>
                                            <div id="sort_bar" className="col s12 m12 l12 grey lighten-3 z-depth-1 valign-wrapper">
                                                <div className="col s6 m6 l3 center"><p style={{ margin: 0 }}>SortBy:</p></div>
                                                <div id="price_sort" onClick={(event) => { this.sortDepart("outbound") }} className="col s6 m6 l3"><p style={{ margin: 0 }}>{sort_btn_depart}</p></div>
                                                <div id="price_sort" className="col s6 m6 l3" onClick={(event) => { this.sortDuration("outbound") }}><p style={{ margin: 0 }}>{sort_btn_duration}</p></div>
                                                <div id="price_sort" className="col s6 m6 l3" onClick={(event) => { this.sortPrice("outbound") }}><p style={{ margin: 0 }}>{sort_btn_price}</p></div>


                                            </div>
                                        </div>
                                    </li>
                                    {(!this.state.fetching_outbound && this.state.result_outbound) ?

                                        <RoundResult {...this.state} result_outbound={this.state.result_outbound} changeFlight={(event) => { this.changeFlight(event, true) }} outbound={true} checked_id={this.state.best_outbound} name="outbound" best={this.state.best_outbound} />
                                        : ((this.state.fetching_outbound) ? <Spinner /> : '')
                                    }
                                    {(this.state.fetching_outbound == false && (this.state.result_outbound.length == 0) && this.state.result_outbound != undefined) ? '' : ''}

                                </ul>
                                <ul id="ul_search" className="col s12 m6 l6">
                                    <li className="card-panel indigo lighten-4">
                                        <div className="row" style={{ margin: 0 }}>
                                            <div className="col s12 m12 l12">
                                                <div className="col s8 m8 l8">
                                                    <p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.props.match.params.dest}</b></p><i className="material-icons col s4 m4 l4">arrow_forward</i><p className="col s4 m4 l4" style={{ margin: 0 }}><b>{this.props.match.params.src}</b></p>
                                                </div>
                                                <div className="col s4 m4 l3 right"><p className="col s12 m12 l12" style={{ margin: 0 }}>{this.props.match.params.return_date}</p></div>
                                            </div>
                                            <div id="sort_bar" className="col s12 m12 l12 grey lighten-3 z-depth-1 valign-wrapper">
                                                <div className="col s6 m6 l3 center"><p style={{ margin: 0 }}>SortBy:</p></div>
                                                <div id="price_sort" onClick={(event) => { this.sortDepart("inbound") }} className="col s6 m6 l3"><p style={{ margin: 0 }}>{sort_btn_depart1}</p></div>
                                                <div id="price_sort" onClick={(event) => { this.sortDuration("inbound") }} className="col s6 m6 l3"><p style={{ margin: 0 }}>{sort_btn_duration1}</p></div>
                                                <div id="price_sort" onClick={(event) => { this.sortPrice("inbound") }} className="col s6 m6 l3"><p style={{ margin: 0 }}>{sort_btn_price1}</p></div>
                                            </div>
                                        </div>
                                    </li>
                                    {(!this.state.fetching_inbound && this.state.result_inbound) ?

                                        <RoundResult {...this.state} result_outbound={this.state.result_inbound} changeFlight={(event) => { this.changeFlight(event, false) }} outbound={false} checked_id={this.state.best_inbound} name="inbound" best={this.state.best_inbound} />


                                        : ((this.state.fetching_inbound) ? <Spinner /> : '')

                                    }
                                    {(this.state.fetching_inbound == false && this.state.result_inbound.length == 0 && this.state.result_inbound != undefined) ? '' : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
const mapStateToProps = (state) => {
    return {
        roundin: state.RoundTripResultInbound,
        roundout: state.RoundTripResultOutbound,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeRoundTripInbound: (obj) => {
            dispatch(storeRoundTripInbound(obj));
        },
        storeRoundTripOutbound: (obj) => {
            dispatch(storeRoundTripOutbound(obj));
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RoundTripResult));