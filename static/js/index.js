setInterval(setTime, 1000);
function setTime(){
    let time = new Date().toLocaleTimeString();
    document.getElementById('time').innerHTML = time;

    if(time === "12:00:00 AM"){
        let date = new Date().toLocaleDateString('uk');
        document.getElementById('date').innerHTML = date;
    }
}

let date = new Date().toLocaleDateString('uk');
document.getElementById('date').innerHTML = date;