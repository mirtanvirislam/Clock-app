
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

clock = new Clock();
console.log(clock.display());