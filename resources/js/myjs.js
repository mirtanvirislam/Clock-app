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
    am_pm = current_time.getHours() > 11 ? 'PM' : 'AM';
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
        return  diff_hour + ':' + diff_minute + ':' + diff_second;
    }
    else {
        return diff_minute + ':' + diff_second;
    }
}

Timer.prototype.pause = function() {
    if(this.active == true) {
        const current_time = new Date();
        this.history += ((current_time.getTime() - this.start_time.getTime()) / 1000);
        this.active = false;
    }
}

function fullscreen(element_id) {
    var elem = document.getElementById(element_id);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function toggleFullscreen() {
    var element = document.body;
  
    var isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
  
    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function () { return false; };
    document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function () { return false; };
  
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  }

document.addEventListener('keypress', logKey);

function logKey(e) {
    switch(e.code) {
        case 'KeyF':
            toggleFullscreen();
            break;
        case 'Space':
            if(timer.active == true) {
                timer.pause()
            } else {
                timer.start()
            }
            break;
    }
}