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

import P5Behavior from 'p5beh';
import * as Display from 'display';
import {teamColors} from 'threectx';

const pb = new P5Behavior();


var indexes = [];

// for WEBGL: pb.renderer = 'webgl';

pb.preload = function (p) {
  /* this == pb.p5 == p */
  // ...
}

pb.setup = function (p) {
  /* this == pb.p5 == p */
  /* P5Behavior already calls createCanvas for us */
  // setup here...
};

//new drawUser
pb.drawUserNew = function (user) {

  if(indexes[user.id] == null) {
    this.p5.fill(user.id >= 0 ? Display.teamColors[user.id%Display.teamColors.length] : 255);
    this.p5.noStroke();
    indexes[user.id] = 1;
    // this.p5.noFill();
    // this.p5.stroke(68);
    // this.p5.strokeWeight(1);
    // this.p5.ellipse(user.x, user.y, 31);
  }
  else {
    indexes[user.id] = indexes[user.id]+1;
    console.log("still here");
  }
  this.p5.ellipse(user.x, user.y, indexes[user.id]);

}

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */
  // draw here...
  this.clear();
  for (let u of floor.users) {
    pb.drawUserNew(u);
  }
  this.fill(128, 128, 128, 128);
  this.noStroke();
  pb.drawSensors(floor.sensors);
};

function update(newUsers, deletedUsers, otherUsers) {
  // console.log("deleted"+deletedUsers);
  // console.log("new"+newUsers);
  // console.log("other"+otherUsers);

  for (let uid of indexes) {
    if(uid in deletedUsers) {
      indexes[uid] = null;
    }
  }

}

export const behavior = {
  title: "Sensor Debug (P5)",
  init: pb.init.bind(pb),
  frameRate: 'sensors',
  render: pb.render.bind(pb),
  numGhosts: 1
  userUpdate: update,
};
export default behavior
