import _ from 'lodash';
import CookieTable, { COOKIE_RADIUS } from 'models/CookieTable';

export default class CookieTableComponent {

  constructor(table) {
    this.table = table;
  }

  render(p) {
    _.each(this.table.cookieLocations, location => {
      this.renderCookie(p, location);
    })
  }

  renderCookie = (p, location) => {
    p.fill(255);
    //p.ellipse(location.x, location.y, COOKIE_RADIUS);
    // var cookieImage = p.loadImage('images/meteor.png');
    p.image(p.cookieImage, location.x, location.y, COOKIE_RADIUS, COOKIE_RADIUS, 0, 0);
  }

}
