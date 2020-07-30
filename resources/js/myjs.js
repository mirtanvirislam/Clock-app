function initialize() {
    show('clock');

    clock = new Clock();
    timer = new Timer();
    eventloop();
}

function eventloop() {
    document.getElementById('clock-value').innerHTML = clock.display();
    document.getElementById('timer-value').innerHTML = timer.display();
    if(timer.active == true) {
        document.title = timer.display();
    }

    setTimeout(eventloop, 500);
}

function show(div_id) {
    document.getElementById('clock').style.visibility = 'hidden';
    document.getElementById('countdown').style.visibility = 'hidden';
    document.getElementById('timer').style.visibility = 'hidden';
    elements = document.getElementsByClassName('nav-item'); 
    Array.prototype.forEach.call(elements, element => element.style.opacity = 0.5  )

    document.getElementById('btn-'+div_id).style.opacity = 1;
    document.getElementById(div_id).style.visibility = 'visible';
}

function Clock() {

}

Clock.prototype.display = function() {
    const current_time = new Date();
    hour = current_time.getHours() % 12;
    minute = current_time.getMinutes();
    second = current_time.getSeconds();
    if (minute < 10) {minute = "0" + minute;}
    if (second < 10) {second = "0" + second;}
    am_pm = hour > 11 ? 'PM' : 'AM';
    return '<h1>' + hour + ':' + minute + '</h1> <h3>' + second + '</h3> <h5>' + am_pm + '</h5>';
}


function Timer() {
    this.active = false;
    this.start_time = null;
    this.history = 0;
}

Timer.prototype.start = function() {
    if(this.active == false) {
        this.active = true;
        this.start_time = new Date();
    }
}

Timer.prototype.display = function() {
    var diff = this.history;
    if(this.active == true) {
        const current_time = new Date();
        diff += ((current_time.getTime() - this.start_time.getTime()) / 1000)
    }
    var diff_hour = Math.floor(diff / 3600);
    diff = diff % 3600;
    var diff_minute = Math.floor(diff / 60);
    var diff_second = Math.floor(diff % 60);

    if (diff_minute < 10) {diff_minute = "0" + diff_minute;}
    if (diff_second < 10) {diff_second = "0" + diff_second;}
    if (diff_hour > 0) {
        return  diff_hour + 'h :' + diff_minute + 'm : ' + diff_second + 's';
    }
    else {
        return diff_minute + 'm : ' + diff_second + 's';
    }
}

Timer.prototype.pause = function() {
    if(this.active == true) {
        const current_time = new Date();
        this.history += ((current_time.getTime() - this.start_time.getTime()) / 1000);
        this.active = false;
    }
}

