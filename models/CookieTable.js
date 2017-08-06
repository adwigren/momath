import _ from 'lodash';
import { width, height } from 'display';

export const MAX_COOKIES = 4;
export const COOKIE_RADIUS = 20;
export const REFILL_INTERVAL = 1000;

export default class CookieTable {
  get cookieLocations()  { return this._cookieLocations }
  set cookieLocations(v) { this._cookieLocations = v }

  constructor() {
    this.cookieLocations = [];
    setInterval(this.refillCookies, REFILL_INTERVAL);
  }

  refillCookies = () => {
    if (_.size(this.cookieLocations) < MAX_COOKIES) {
      this.addCookie();
    }
  }

  addCookie = () => {
    const x = _.random(COOKIE_RADIUS, width-COOKIE_RADIUS);
    const y = _.random(COOKIE_RADIUS, height-COOKIE_RADIUS);
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
