/* MoMath Math Square Behavior
 *
 *        Title: P5 Example
 *  Description: Display user blobs and sensors (same as debug)
 * Scheduler ID:
 *    Framework: P5
 *       Author: Dylan Simon <dylan@dylex.net>
 *      Created: 2017-04
 *       Status: works
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
    const headLocation = monster.location[0];
    if (table.hadCookie(headLocation.x, headLocation.y, monster.radius())) {
      monster.eatOne();
    }
    monster.move(user.x, user.y);
    //dragSegment(monster, p);
    // for(var i = 0; i<monster.location.length-1; i++) {
    //   dragSegment(p, i+1, monster.location[i].x, monster.location[i].y, monster.location[i+1].x, monster.location[i+1].y);
    //   p.strokeWeight(9);
    //   p.stroke(255, 100);
    // }

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
  //
  // for(var i = 0; i<monster.tailLocation.length-1; i++) {
  //   var xii = monster.tailLocation[i+1].x;
  //   var yii = monster.tailLocation[i+1].y;
  //   var xin = monster.tailLocation[i].x;
  //   var yin = monster.tailLocation[i].y;
  //   var dx = xin - xii;
  //   var dy = yin - yii;
  //   var angle = Math.atan2(dy, dx);
  //   xii = xin - Math.cos(angle) * monster.tailLocation.length;
  //   yii = yin - Math.sin(angle) * monster.tailLocation.length;
  //   segment(p, xii, yii, angle);
  //   // dragSegment(p, i+1, monster.location[i].x, monster.location[i].y, monster.location[i+1].x, monster.location[i+1].y);
  //   p.strokeWeight(9);
  //   p.stroke(255, 100);
  // }
}

// function dragSegment (p, i, xin, yin, xii, yii) {
//   var dx = xin - xii;
//   var dy = yin - yii;
//   var angle = Math.atan2(dy, dx);
//   xii = xin - Math.cos(angle) * 18;
//   yii = yin - Math.sin(angle) * 18;
//   segment(p, xii, yii, angle);
// }

function segment (p, x, y, a){
  p.push();
  p.translate(x, y);
  p.rotate(a);
  p.line(0, 0, 18, 0);
  p.pop();
}

function update(newUsers, deletedUsers, otherUsers) {
  _.each(newUsers, user => {
    monsters[user.id] = new CookieMonster(user.x, user.y);
    table.MAX_COOKIES++;
  }

  _.each(deletedUsers, user => {
    table.MAX_COOKIES--;
  }

  // for(var user of deletedUsers) {
  //   if(userTailNum[user.id] != undefined) {
  //     userTailNum[user.id] = null;
  //   }
  // }

  // for(var user of deletedUsers) {
  //   indexes[user.id] = null;
  // }
}

export const behavior = {
  title: "Sensor Debug (P5)",
  init: pb.init.bind(pb),
  frameRate: 20,
  render: pb.render.bind(pb),
  numGhosts: 0,
  userUpdate: update,
};
export default behavior
