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


/*

userTailNum should map userID to current total of cookies eaten
[userid] -> 15

tailArea should map a total number of cookies eaten to its corresponding fib sequence
[15] -> [3, 5, 3, 2, 1, 1]

[12] -> [5, 3, 2, 1, 1]


*/

var userTailNum = [];
var tailArea = [];

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

  // if(indexes[user.id]) {
  //   //TODO - replace this so that area of circle is a function of time
  //   indexes[user.id] = indexes[user.id]+1;
  //   console.log("still here");
  //   // this.p5.noFill();
  //   // this.p5.stroke(68);
  //   // this.p5.strokeWeight(1);
  //   // this.p5.ellipse(user.x, user.y, 31);
  // }
  // else {
  //   this.p5.fill(user.id >= 0 ? Display.teamColors[user.id%Display.teamColors.length] : 255);
  //   this.p5.noStroke();
  //   indexes[user.id] = 1;
  // }
  // this.p5.ellipse(user.x, user.y, indexes[user.id]);

}

//calculate the fib seq array for a total number of blobs eaten and save in global variable tailArea
pb.calculateTailArea = function(index) {

  if(tailArea[index] != undefined) {
    return tailArea[index];
  }

  if(index == 1) {
    tailArea[index] = [1];
    return tailArea[index];
  }
  if(index == 2) {
    tailArea[index] = [1, 1];
    return tailArea[index];
  }
  if(index == 3) {
    tailArea[index] = [1, 1, 1];
    return tailArea[index];
  }

  var prevArray = pb.calculateTailArea(index-1);
  console.log(index, prevArray);
  if(prevArray[0]+1 <= prevArray[1] + prevArray[2]) {
    prevArray[0] = prevArray[0]+1;
    tailArea[index] = prevArray;
  }
  else tailArea[index] = [1].concat(prevArray);

  return tailArea[index];

}

pb.drawUserTail = function(user) {
  var tailArray;

  //this should always have value - new users should be set to 1
  var userTailIndex = userTailNum[user.id];

  if(userTailIndex != undefined) {
    //try to see if array for this number already calculated
    //if undefined, need to calculate/create it

    tailArray = tailArea[userTailIndex];

    if(tailArray == undefined) {
      //calculate the fib seq array for a total number of cookies eaten
      tailArray = pb.calculateTailArea(userTailIndex);
    }

    var xCoords = [];
    
    xCoords[0] = user.x;
    this.p5.fill(255);
    this.p5.ellipse(xCoords[0], user.y, 20*tailArray[0]);

    for(var i = 1; i < tailArray.length; i++) {
      var offset = (10*tailArray[i-1])+(10*tailArray[i]);
      xCoords[i] = xCoords[i-1]+offset;
      this.p5.fill(Display.teamColors[i%Display.teamColors.length]);
      this.p5.ellipse(xCoords[i], user.y, 20*tailArray[i]);

    }
  }

}

pb.draw = function (floor, p) {
  /* this == pb.p5 == p */
  // draw here...
  this.clear();

  for (let u of floor.users) {
    //need an updateUserTailNum method
    //need to update tailArea when new one encountered
    pb.drawUserTail(u);
  }

  this.ellipse(100, 30, 10);
  pb.drawSensors(floor.sensors);
};

function update(newUsers, deletedUsers, otherUsers) {
  for(var user of newUsers) {
    //console.log(user.id);
    if(userTailNum[user.id] == undefined) {
      //TODO - stub
      if(user.id == 1) {
        userTailNum[user.id] = 1;
      }
      else if(user.id == 2) {
        userTailNum[user.id] = 2;
      }
      else if(user.id == 3) {
        userTailNum[user.id] = 3;
      }
      else if(user.id == 4) {
        userTailNum[user.id] = 4;
      }
      else if(user.id == 5) {
        userTailNum[user.id] = 5;
      }
      else if(user.id == 6) {
        userTailNum[user.id] = 6;
      }
      else if(user.id == 7) {
        userTailNum[user.id] = 7;
      }
      else if(user.id == 8) {
        userTailNum[user.id] = 8;
      }
      else userTailNum[user.id] = 1;
    }
    //console.log(userTailNum[user.id]);
  }

  for(var user of deletedUsers) {
    if(userTailNum[user.id] != undefined) {
      userTailNum[user.id] = null;
    }
  }
  
  // for(var user of deletedUsers) {
  //   indexes[user.id] = null;
  // }
}

export const behavior = {
  title: "Sensor Debug (P5)",
  init: pb.init.bind(pb),
  frameRate: 'sensors',
  render: pb.render.bind(pb),
  numGhosts: 0,
  userUpdate: update,
};
export default behavior
