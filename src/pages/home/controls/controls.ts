import { Component, Input, Output, EventEmitter } from '@angular/core';

import { faPlay, faPause, faStopwatch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'controls',
  templateUrl: 'controls.html'
})
export class Controls {
  @Input() counterTime;
  @Input() isPlaying;
  @Output() playToggled = new EventEmitter<boolean>();
  @Output() timeAdded = new EventEmitter<number>();
  @Output() deletedAll = new EventEmitter();
  faPlay = faPlay;
  faPause = faPause;
  faStopWatch = faStopwatch;
  faTrash = faTrashAlt;

  constructor() {

  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.playToggled.emit(this.isPlaying);
  }

  takeTime() {
    this.timeAdded.emit(this.counterTime);
  }

  deleteAll() {
    this.deletedAll.emit();
  }

}
