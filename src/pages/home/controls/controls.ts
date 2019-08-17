import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'controls',
  templateUrl: 'controls.html'
})
export class Controls {
  @Input() counterTime;
  @Input() isPlaying;
  @Output() playToggled = new EventEmitter<boolean>();
  @Output() timeAdded = new EventEmitter<number>();

  constructor() {

  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.playToggled.emit(this.isPlaying);
  }

  takeTime() {
    this.timeAdded.emit(this.counterTime);
  }

}
