setInterval(updateMeetingTime, 1000);

let sec = 0;
let min = 0;
function updateMeetingTime(){
    sec++;
    if(sec===60){
        sec = 0;
        min++;
    }
    let secText = sec<10 ? ("0"+sec) : sec;
    let minText = min<10 ? ("0"+min) : min;
    document.getElementById('meeting_time').innerHTML = minText +":"+secText;

}
