import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  animate,
  transition,
  style,
  keyframes,
  group,
  query
} from '@angular/animations';

@Component({
  selector: 'app-car-animation',
  templateUrl: './car-animation.component.html',
  styleUrls: ['./car-animation.component.css'],
  animations: [trigger('car', [
    transition("void => *", [
      animate(1500, keyframes([
        style({
          transform: 'translateX(-100px)',
          opacity: 0
        }),
        style({
          transform: 'translateX(-50px)',
          opacity: 0.5
        }),
        style({
          transform: 'translateX(-20px)',
          opacity: 0.7
        }),
        style({
          transform: 'translateX(0)',
          opacity: 1
        })
      ]))
    ]),
    transition("* => void", [
      animate(2000, keyframes([
        style({
          transform: 'translateX(0)',
          opacity: 1
        }),
        style({
          transform: 'translateX(250px)',
          opacity: 0.8
        }),
        style({
          transform: 'translateX(500px)',
          opacity: 0.5
        }),
        style({
          transform: 'translateX(700px)',
          opacity: 0
        })
      ]))
    ])
  ])]
})
export class CarAnimationComponent implements OnInit {
  hasCar: boolean = true;

  constructor() { }

  ngOnInit() {
    if (this.hasCar) {     
      setTimeout(() => {
        this.hasCar = false;
      }, 1500)
    }
  }
}
