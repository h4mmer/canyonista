import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({standalone: true, selector: '[swipe]'})
export class SwipeDirective {

  @Output() up = new EventEmitter<void>();
  @Output() down = new EventEmitter<void>();
  @Output() fullUp = new EventEmitter<void>();
  @Output() fullDown = new EventEmitter<void>();
  @Output() centerUp = new EventEmitter<void>();
  @Output() centerDown = new EventEmitter<void>();

  swipeCoord = [0, 0];
  swipeTime = new Date().getTime();
  screenHeight=window.innerHeight;
  constructor() { }

  @HostListener('touchstart', ['$event']) onSwipeStart($event: TouchEvent) {
    this.onSwipe($event, 'start');
  }

  @HostListener('touchend', ['$event']) onSwipeEnd($event: TouchEvent) {
    this.onSwipe($event, 'end');
  }

  onSwipe(e: TouchEvent, when: string) {
    this.swipe(e, when);
  }

  swipe(e: TouchEvent, when: string): void {

    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      const distance = Math.abs(direction[1] /this.screenHeight);
      const swipeDir = direction[1] < 0 ? 'up' : 'down';
      const startY = this.swipeCoord[1]/this.screenHeight
      const swipeStart = startY < .3? 'top': ( startY > .7?'bottom':(startY < .6 && startY > .4?'center':undefined));
      //console.log(`duration: ${duration} distance: ${distance} dir: ${swipeDir} started: ${swipeStart}`);
      if (duration < 1000 //
        && distance > 0.1 // Long enough
        && Math.abs(direction[1]) > Math.abs(direction[0] * 3)) { // Horizontal enough
        switch (swipeStart){
          case "bottom":
            if(swipeDir === 'up'){
              if(distance > 0.4){
                this.fullUp.emit();
              }else{
                this.up.emit();
              }
            }
            break;
          case "top":
            if(swipeDir === 'down'){
              if(distance > 0.4){
                this.fullDown.emit();
              }else{
                this.down.emit();
              }
            }
            break;
          case "center":
            if(swipeDir === 'up'){
              this.centerUp.emit();
            }else{
              this.centerDown.emit();
            }
            break;
          default:
            console.log('illegal swipe start point')
        }
      }
    }
  }
}
