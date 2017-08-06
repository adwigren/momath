import _ from 'lodash';
export const COOKIE_CALORIES = 25;

export default class CookieMonster {
  eatenCookies = 1;
  currentCookies = 1;

  get tail()      { return this._tail || 0 } set tail(v) { this._tail = v }
  get location()  { return this._location } set location(v) { this._location = v }
  get tailLocation()  { return this._tailLocation } set tailLocation(v) { this._tailLocation = v }

  constructor(x, y) {
    const a = {x, y};
    // console.log('constructor');
    // console.log(a);
    this.location = [];
    this.location.push(a);
      this.tailLocation = [];
    this.tailLocation.push(a);
    // console.log(this.location);
  }

  radius = () => {
    return this.currentCookies * COOKIE_CALORIES;
  }

  radiusTail = (index) => {
    return this.fibonacci(index) * COOKIE_CALORIES;
  }

  eatOne = () => {
    this.eatenCookies++;
    this.currentCookies++;
    if (this.currentCookies > this.fibonacci(this.tail)) {
      this.startNextTail();
    }
  }

  startNextTail = () => {
      this.tail++;
      this.currentCookies = 1;
  }

  move = (x, y) => {
    this.location.push({x, y});
    if (_.size(this.location) > this.tail+1) {
      this.location.shift();
    }
    // else {
    //   console.log(this.location);
    //   for(var i = 0; i<this.location.length-1; i++) {
    //     this.dragSegment(i+1, this.location[i].x, this.location[i].y);
    //   }
    // }
  }

  fibonacci = (number) => {
    if (number <= 1) return 1;

    return this.fibonacci(number - 1) + this.fibonacci(number - 2);
  }

}
