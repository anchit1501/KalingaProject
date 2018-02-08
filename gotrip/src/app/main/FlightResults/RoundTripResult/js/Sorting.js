 export const sortByDepart=(list,sort_depart)=> {
        // let list = this.state.result;
        if(list==undefined)
        {
            return false;
        }
        if (sort_depart) {
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
        
       return list;
    }
export const sortByArrival=(list,sort_arrival)=> {
        // let list = this.state.result;
        if(list==undefined)
        {
            return false;
        }
        if (sort_arrival) {
            list.sort((a, b) => {
                let index1=Object.keys(a.itineraries[0].outbound.flights).length;
                let index2=Object.keys(b.itineraries[0].outbound.flights).length;  
                let date1=new Date(a.itineraries[0].outbound.flights[index1-1].departs_at);
                date1=new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()).getTime();
                
                let date2=(new Date(b.itineraries[0].outbound.flights[index2-1].departs_at));
                date2=new Date(date2.getFullYear(),date2.getMonth(),date2.getDate()).getTime();
                              
                if (new Date(a.itineraries[0].outbound.flights[index1-1].arrives_at).getTime()-date1 > new Date(b.itineraries[0].outbound.flights[index2-1].arrives_at).getTime()-date2) {
                    return 1;
                }
                if (new Date(a.itineraries[0].outbound.flights[index1-1].arrives_at).getTime()-date1 < new Date(b.itineraries[0].outbound.flights[index2-1].arrives_at).getTime()) {
                    return -1;
                }
                return 0;
            });
        } else {

            list.sort((a, b) => {
                let index1=Object.keys(a.itineraries[0].outbound.flights).length;
                let index2=Object.keys(b.itineraries[0].outbound.flights).length;
                let date1=new Date(a.itineraries[0].outbound.flights[index1-1].departs_at);
                date1=new Date(date1.getFullYear(),date1.getMonth(),date1.getDate()).getTime();
                
                let date2=(new Date(b.itineraries[0].outbound.flights[index2-1].departs_at));
                date2=new Date(date2.getFullYear(),date2.getMonth(),date2.getDate()).getTime();
                if (new Date(a.itineraries[0].outbound.flights[index1-1].arrives_at).getTime()-date1 > new Date(b.itineraries[0].outbound.flights[index2-1].arrives_at).getTime()-date2) {
                    return -1;
                }
                if (new Date(a.itineraries[0].outbound.flights[index1-1].arrives_at).getTime()-date1 < new Date(b.itineraries[0].outbound.flights[index2-1].arrives_at).getTime()-date2) {
                    return 1;
                }
                return 0;
            });

        }
        return list;

    }

export const sortByPrice=(list,sort_price)=> {
        console.log(list);
        // let list = this.state.result;
        if(list==undefined)
        {
            return false;
        }
        let v=list;
        if(sort_price){
            v.sort((a, b) => {
                return (parseFloat(a.fare.total_price) - parseFloat(b.fare.total_price));
            });
        } 
       
        else {
            list.sort((a, b) => {
                return (parseFloat(b.fare.total_price) - parseInt(a.fare.total_price));
            });

        }
        return list;
    }
export const sortByAirline=(list,sort_airline)=> {
        // let list = this.state.result;
        if(list==undefined)
        {
            return false;
        }
        if (sort_airline) {
            list.sort((a, b) => {
               var nameA = a.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase
                var nameB = b.itineraries[0].outbound.flights[0].marketing_airline.toUpperCase(); // ignore upper and lowercase

                if(nameA=='9W')
                {
                    nameA="JET";
                }
                if(nameB=='9W')
                {
                    nameB="JET";
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
                 if(nameA=='9W')
                {
                    nameA="JET";
                }
                if(nameB=='9W')
                {
                    nameB="JET";
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
        return list;
    }
export const sortByDuration=(list,sort_duration)=>{
        
        // let list = this.state.result;
        if(list==undefined)
        {
            return false;
        }
        if (sort_duration) {
            list.sort((a, b) => {
                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let dt1 = new Date(a.itineraries[0].outbound.flights[0].departs_at);
                let dt2 = new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at);
                let dt3 = new Date(b.itineraries[0].outbound.flights[0].departs_at);
                let dt4 = new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at);
                return diff_minutes(dt1, dt2) - diff_minutes(dt3, dt4);
            });
        } else {
            list.sort((a, b) => {

                let index1 = Object.keys(a.itineraries[0].outbound.flights).length;
                let index2 = Object.keys(b.itineraries[0].outbound.flights).length;
                let dt1 = new Date(a.itineraries[0].outbound.flights[0].departs_at);
                let dt2 = new Date(a.itineraries[0].outbound.flights[index1 - 1].arrives_at);
                let dt3 = new Date(b.itineraries[0].outbound.flights[0].departs_at);
                let dt4 = new Date(b.itineraries[0].outbound.flights[index2 - 1].arrives_at);
                return diff_minutes(dt3, dt4) - diff_minutes(dt1, dt2);
            });

        }
        return list;
    }

export const diff_minutes=(dt2, dt1)=>{

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));

    }   