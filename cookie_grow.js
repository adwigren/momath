/* MoMath Math Square Behavior
 *
 *        Title: Fibonacci Cookie Hunt
 *  Description: Chase after cookies and see your cookie tail grow according to Fibonacci sequence
 * Scheduler ID:
 *    Framework: P5
 *       Author: Adam Wigren and Lisa Li
 *      Created: 2017-08-05
 *       Status: 
 */

import _ from 'lodash';
import P5Behavior from 'p5beh';
import CookieTable, {MAX_COOKIES} from 'models/CookieTable';
import CookieMonster from 'models/CookieMonster';
import CookieMonsterComponent from 'components/CookieMonsterComponent';
import CookieTableComponent from 'components/CookieTableComponent';

const pb = new P5Behavior();
const table = new CookieTable();
const monsters = {};

var pb.cookieImage;


// for WEBGL: pb.renderer = 'webgl';

pb.preload = function (p) {
  this.cookieImage = p.loadImage('images/cookie.png');
  /* this == pb.p5 == p */
  // ...
}

pb.setup = function (p) {
  /* this == pb.p5 == p */
  /* P5Behavior already calls createCanvas for us */
  // setup here...
};

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */
  // draw here...
  this.clear();

  const tableComponent = new CookieTableComponent(table);
  tableComponent.render(p);

  _.each(floor.users, user => {
    const monster = monsters[user.id];
    const headLocation = monster.headLocation();
    if (table.hadCookie(headLocation.x, headLocation.y, monster.radius())) {
      monster.eatOne();
    }
    console.log(headLocation);
    console.log(monster);
    monster.move(user.x, user.y);

    const monsterComponent = new CookieMonsterComponent(monster);
    monsterComponent.render(p);
  }

};

function dragSegment(monster, p) {
  var alpha = 0;
  var size = 0;
  var sizeInterval;
  var alphaInterval = 0.5/monster.location.length;

  p.noStroke()
  for(var i = 1; i < monster.location.length-1; i++){
    p.fill(80);
    p.ellipse(monster.location[i].x-size, monster.location[i].y-size, 2, 2);
    alpha += alphaInterval;
    size +=  monster.radiusTail(i-1);;
  }
}

function update(newUsers, deletedUsers, otherUsers) {
  _.each(newUsers, user => {
    monsters[user.id] = new CookieMonster(user.x, user.y, user.id);
    table.MAX_COOKIES++;
  }

  _.each(deletedUsers, user => {
    table.MAX_COOKIES--;
  }

}

export const behavior = {
  title: "Fibonacci Cookie Hunt (P5)",
  init: pb.init.bind(pb),
  frameRate: 20,
  render: pb.render.bind(pb),
  numGhosts: 0,
  userUpdate: update,
};
export default behavior
