var timer_start_time = -1;
var timer_running = false;
var current_time;
var current_time_formatted;
var timer_time_formatted;

var title = 'clock';

function initialize() {
	displayClock();
	updateTitle();
}

function displayClock() {
	var today = new Date();
	var hour_in_24hr = today.getHours();
	var hour_in_12hr = hour_in_24hr % 12;
	var minute = today.getMinutes();
	var second = today.getSeconds();
	var am_pm = hour_in_24hr > 11 ? 'pm' : 'am';
	minute = checkTime(minute);
	second = checkTime(second);
	document.getElementById('clock').innerHTML = hour_in_12hr + ':' + minute + ':' + second + ' ' + am_pm;
	document.getElementById('clock_fullscreen').innerHTML = hour_in_12hr + ':' + minute + ':' + second + ' <small>' + am_pm + '</small>';
	current_time_formatted = hour_in_12hr + ' : ' + minute + ' ' + am_pm;

	var t = setTimeout(displayClock, 500);
}

function updateTitle() {
	console.log('Update title');

	if (title == 'clock') {
		document.title = current_time_formatted;
	} else if (title == 'timer') {
		document.title = timer_time_formatted;
	}
	var t = setTimeout(updateTitle, 500);
}

function checkTime(input) {
	if (input < 10) {
		input = '0' + input;
	} // add zero in front of numbers < 10
	return input;
}

function startTimer() {
	title = 'timer';
	timer_running = true;

	if (timer_start_time < 0) {
		console.log('set timer_start_time');
		timer_start_time = new Date();
	}

	var current_time = new Date();

	//console.log(current_time + ' ' + timer_start_time);

	var res = Math.abs(current_time - timer_start_time) / 1000;

	// get total days between two dates
	var days = Math.floor(res / 86400);
	//console.log('<br>Difference (Days): ' + days);

	// get hours
	var hours = Math.floor(res / 3600) % 24;
	//console.log('<br>Difference (Hours): ' + hours);

	// get minutes
	var minutes = Math.floor(res / 60) % 60;
	//console.log('<br>Difference (Minutes): ' + minutes);

	// get seconds
	var seconds = Math.floor(res % 60);
	//console.log('<br>Difference (Seconds): ' + seconds);

	document.getElementById('timer').innerHTML = hours + ' h : ' + minutes + ' m : ' + seconds + ' s';

	document.getElementById('timer_fullscreen').innerHTML = hours + ' <small>h</small> : ' + minutes + ' <small>m</small> : ' + seconds + ' <small>s</small>';

	document.getElementById('timer_mini_view').innerHTML = hours + ' h : ' + minutes + ' m : ' + seconds + ' s';

	timer_time_formatted = hours + ' h : ' + minutes + ' m : ' + seconds + ' s';

	if (timer_running == true) {
		var t2 = setTimeout(startTimer, 500);
	}
}

function pauseTimer() {
	timer_running = false;
}

/* Get the element you want displayed in fullscreen mode (a video in this example): */

/* When the openFullscreen() function is executed, open the video in fullscreen.
                             Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
function openFullscreen() {
	fullscreen('clock_fullscreen_div');

	var elem = document.getElementById('StopwatchModal');

	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.mozRequestFullScreen) {
		/* Firefox */
		elem.mozRequestFullScreen();
	} else if (elem.webkitRequestFullscreen) {
		/* Chrome, Safari and Opera */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		/* IE/Edge */
		elem.msRequestFullscreen();
	}
}

function diff_minutes(date2, date1) {
	var res = Math.abs(date1 - date2) / 1000;

	// get total days between two dates
	var days = Math.floor(res / 86400);
	console.log('<br>Difference (Days): ' + days);

	// get hours
	var hours = Math.floor(res / 3600) % 24;
	console.log('<br>Difference (Hours): ' + hours);

	// get minutes
	var minutes = Math.floor(res / 60) % 60;
	console.log('<br>Difference (Minutes): ' + minutes);

	// get seconds
	var seconds = res % 60;
	console.log('<br>Difference (Seconds): ' + seconds);
}

function fullscreen(target) {
	document.getElementById('main').style.display = 'none';
	document.getElementById(target).style.display = 'block';
}

document.onkeydown = function keyPress(e) {
	if (e.key === 'Escape') {
		document.getElementById('main').style.display = 'block';
		document.getElementById('clock_fullscreen_div').style.display = 'none';
		document.getElementById('timer_fullscreen_div').style.display = 'none';
	}
};
