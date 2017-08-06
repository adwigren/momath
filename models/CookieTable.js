import _ from 'lodash';
import { width, height } from 'display';

export const MAX_COOKIES = 4;
export const COOKIE_RADIUS = 10;
export const REFILL_INTERVAL = 1000;

export default class CookieTable {
  cookieLocations = [];

  constructor() {
    setInterval(this.refillCookies, REFILL_INTERVAL);
  }

  refillCookies = () => {
    if (_.size(this.cookieLocations) < MAX_COOKIES) {
      this.addCookie();
    }
  }

  addCookie = () => {
    const x = _.random(0, width);
    const y = _.random(0, height);
    this.cookieLocations.push({x, y});
  }

  hadCookie = (x, y, r) => {
    return _.some(this.cookieLocations, cookie => {
      return this.consumeCookie(cookie, x, y, r);
    });
  }

  consumeCookie = (cookie, x, y, r) => {
    if (this.cookieInReach(cookie, x, y, r)) {
      _.remove(this.cookieLocations, location => location === cookie);
      return true;
    }
  }

  cookieInReach = (cookie, x, y, r) => {
    const leastDistance = r + COOKIE_RADIUS;
    const distance = Math.sqrt(Math.pow(x - cookie.x, 2) + Math.pow(y - cookie.y, 2));
    return distance <= leastDistance);
  }

}
