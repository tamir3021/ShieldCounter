import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  templateUrl: 'counter.html'
})
export class counter {
  @Input() counterTime;
  @Input() isPlaying;

  constructor() {

  }

}
