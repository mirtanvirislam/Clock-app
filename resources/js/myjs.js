
// const book1 = {
//     title: 'Book One',
//     getDisplay : function() {
//         return `This book's title is ${this.title}`
//     }
// }

// console.log(book1.getDisplay())
// console.log(book1)
// console.log(Object.keys(book1))
// console.log(Object.values(book1))

// function Human(name, age, sex) {
//     this.name = name;
//     this.age = age;
//     this.sex = sex;
// }

// Human.prototype.getDisplay =  function() {
//     return `This human's name is ${this.name}`;
// }

// const c1 = new Human('Carl', 7, 'M');
// const c2 = new Human('Vanessa', 14, 'F');

// console.log(c1);
// console.log(c1.getDisplay());
// console.log(c2.getDisplay());


function Clock() {

}

Clock.prototype.display = function() {
    const current_time = new Date();
    hour = current_time.getHours() % 12;
    minute = current_time.getMinutes();
    second = current_time.getSeconds();
    am_pm = hour > 11 ? 'pm' : 'am';
    return hour + ':' + minute + ':' + second + ' ' + am_pm;
}


function Timer() {
    this.active = false;
    this.start_time = null;
    this.history = 30;
}

Timer.prototype.start = function() {
    if(this.active == false) {
        this.active = true;
        this.start_time = new Date();
    }
}

Timer.prototype.active = function() {
    return this.active;
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

    if (diff_hour < 10) {diff_hour = "0" + diff_hour;}
    if (diff_minute < 10) {diff_minute = "0" + diff_minute;}
    if (diff_second < 10) {diff_second = "0" + diff_second;}
    if (diff_hour > 0) {
        return diff_hour + ':' + diff_minute + ':' + diff_second;
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


clock = new Clock();
console.log(clock.display());

timer = new Timer();
timer.start();
console.log(timer.display());