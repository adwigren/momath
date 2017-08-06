import _ from 'lodash';
export const COOKIE_CALORIES = 25;

export default class CookieMonster {
  eatenCookies = 1;
  currentCookies = 1;

  get tail()      { return this._tail || 0 } set tail(v) { this._tail = v }
  get location()  { return this._location } set location(v) { this._location = v }
  get id()        { return this._id } set id(v) { this._id = v }

  constructor(x, y, id) {
    const a = {x, y};
    this.location = [];
    this.location.push(a);
    this.id = id;
  }

  radius = () => {
    console.log(`radius returns ${this.currentCookies * COOKIE_CALORIES}`);
    return this.currentCookies * COOKIE_CALORIES;
  }

  radiusTail = (index) => {
    console.log(`radiusTail returns ${this.fibonacci(index) * COOKIE_CALORIES}`);
    return this.fibonacci(index) * COOKIE_CALORIES;
  }

  eatOne = () => {
    this.eatenCookies++;
    this.currentCookies++;
    if (this.currentCookies > this.fibonacci(this.tail)) {
      this.startNextTail();
    }
    console.log('Ate one');
    console.log(this));
  }

  headLocation = () => {
    return this.location[this.location.length - 1];
  }

  startNextTail = () => {
      this.tail++;
      this.currentCookies = 1;
  }

  move = (x, y) => {
    if (this.inReach(x, y)) {
      return this.updateMove(x, y);
    }
    this.moveNext(x, y);
  }

  updateMove = (x, y) => {
    const location = this.headLocation();
    location.x = x;
    location.y = y;
  }

  moveNext = (x, y) => {
    this.location.push({x, y});
    if (_.size(this.location) > this.tail+1) {
      this.location.shift();
    }
  }

  moveTail = (x, y) => {
      _.eachRight(this.location, (location, i) => {
        console.log("eachRight " + i);
        if (i < 0 && !this.tailTooClose(i)) {
          const locationInfront = this.location[i-1];
          location = this.getXY(locationInfront.x, locationInfront.y,
            location.x, location.y, this.radiusTail(i));
        }
      }
  }

  inReach = (x, y) => {
    if (this.location.length <= 1) return false;
    const tail = this.location[this.location.length - 2];
    const distance = Math.sqrt(Math.pow(x - tail.x, 2) + Math.pow(y - tail.y, 2));

    return distance < this.radius();
  }


  tailTooClose = (i) => {
    const dist = getDistance(this.location[i].x, this.location[i].y,
        this.location[i-1].x, this.location[i-1].y);
    const radius = i == this.location.length - 1 ? this.radius() : this.radiusTail(i);
    return dist < radius + this.radiusTail(i-1);
  }


  getXY = (moveX, moveY, originX, originY, distance) => {
    const slope = Math.abs((originY - moveY)/(originX - moveX));
    const b = moveY - (slope * moveX);

    // only care about positive
    const x = moveX + (distance / Math.sqrt(1 - Math.pow(slope, 2)));
    const y = slope * x + b;

    return {x, y};
  }

  getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  fibonacci = (number) => {
    if (number <= 1) return 1;

    return this.fibonacci(number - 1) + this.fibonacci(number - 2);
  }

}
