import { 
    trigger,
    state,
    animate,
    transition,
    style,
    keyframes,
    group
   } from '@angular/animations';
  
  const deteleAnimation =  [
    trigger('list', [
        transition("void => *", [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          animate(300)
        ]),
        transition('* => void', [
          animate(1000, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]),
  ]
  
  export { deteleAnimation }