import _ from 'lodash';
import { width, height } from 'display';

export const MAX_COOKIES = 8;
export const COOKIE_RADIUS = 20;
export const MOVE_COOKIE_RADIUS = 20;
export const MOVE_COOKIE_INTERVAL = 20;
export const REFILL_INTERVAL = 1000;

export default class CookieTable {
  get cookieLocations()  { return this._cookieLocations }
  set cookieLocations(v) { this._cookieLocations = v }

  constructor() {
    this.cookieLocations = [];
    setInterval(this.refillCookies, REFILL_INTERVAL);
    setInterval(this.moveCookies, REFILL_INTERVAL);
  }

  refillCookies = () => {
    if (_.size(this.cookieLocations) < MAX_COOKIES) {
      this.addCookie();
    }
  }

  moveCookies = () => {
    _.each(this.cookieLocations, cookie => {
      this.moveCookie(cookie);
    });
  }

  moveCookie = (cookie) => {
    cookie.x += _.random(- MOVE_COOKIE_RADIUS, MOVE_COOKIE_RADIUS);
    cookie.y += _.random(- MOVE_COOKIE_RADIUS, MOVE_COOKIE_RADIUS);
    if (!this.onTable(cookie)) {
      _.remove(this.cookieLocations, (location) => location === cookie);
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

  onTable = (location) => {
    return location.x <= width && location.x >= 0
      && location.y <= height && location.y >= 0;
  }

}
