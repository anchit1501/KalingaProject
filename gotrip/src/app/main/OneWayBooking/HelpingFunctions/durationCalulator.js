export const DurationCalculate=(dt2, dt1)=>{
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return `${parseInt(Math.abs(Math.round(diff))/60)}h ${Math.abs(Math.round(diff))%60}min`;

}
export const calulateMinutes=(dt2, dt1)=>{
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return parseInt(Math.abs(Math.round(diff))/60);
}


