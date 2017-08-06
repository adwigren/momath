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
  }

}
