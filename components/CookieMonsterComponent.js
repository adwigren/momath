import _ from 'lodash';
import * as Display from 'display';
import {teamColors} from 'threectx';
import CookieMonster from 'models/CookieMonster';

export default class CookieMonsterComponent {


  constructor(monster) {
    this.monster = monster;
  }

  render(p) {
    for (let i = 0; i < this.monster.tail; i++) {
      this.renderTail(p, i)
    }
    this.renderHead(p);
  }

  renderTail = (p, i) => {
    const location = this.monster.location[i];
    p.fill(Display.teamColors[i%Display.teamColors.length]);
    p.noStroke();
    p.ellipse(location.x, location.y, this.monster.radiusTail(i));

    p.noFill();
    p.stroke(68);
    p.strokeWeight(1);
    p.ellipse(location.x, location.y, this.monster.radiusTail(i)+5);
    //dragSegment(p, i+1, this.monster.location[i].x, this.monster.location[i].y);
  }

  renderHead = (p) => {
    const location = this.monster.headLocation();
    p.fill(Display.teamColors[this.monster.id%Display.teamColors.length]);
    p.noStroke();
    p.ellipse(location.x, location.y, this.monster.radius());

    p.noFill();
    p.stroke(68);
    p.strokeWeight(1);
    p.ellipse(location.x, location.y, this.monster.radius()+5);
    // this.dragSegment(p, 0, this.monster.location[0].x, this.monster.location[0].y);
  }

  // dragSegment = (p, i, xin, yin) => {
  //   var dx = xin - this.monster.location[i].x;
  //   var dy = yin - this.monster.location[i].y;
  //   var angle = Math.atan2(dy, dx);
  //   this.monster.location[i].x = xin - Math.cos(angle) * 20;
  //   this.monster.location[i].y = yin - Math.sin(angle) * 20;
  //   segment(p, this.monster.location[i].x, this.monster.location[i].y, angle);
  // }
  //
  // function segment (p, x, y, a){
  //   p.push();
  //   p.translate(x, y);
  //   p.rotate(a);
  //   p.line(0, 0, 20, 0);
  //   p.pop();
  // }

}
