import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { TimerPipe } from '../../pipes/timeTransform';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  records = [];
  counterTime: Date;
  isPlaying = false;
  timerSubscription: Subscription;
  startTime: number;
  savedTime: number;
  currentTime: number = 0;
  constructor(private timeTransformer: TimerPipe) {

  }

  togglePlay() {
    this.isPlaying = ! this.isPlaying;
    if(this.isPlaying) {
      this.startTime = new Date().getTime();
      this.timerSubscription = timer(0, 1000)
        .subscribe(() => this.setCounterTime());
    }
    else {
      this.savedTime = this.currentTime;
      this.timerSubscription.unsubscribe();
    }
  }

  setCounterTime() {
    const updatedTime = new Date().getTime();
    if(this.savedTime) {
      this.currentTime = (updatedTime - this.startTime) + this.savedTime;
    }
    else {
      this.currentTime = updatedTime - this.startTime;
    }
  }

  addRecord(time: number) {
    const transformedTime = this.timeTransformer.transform(time);
    this.records.push(transformedTime);
  }

}
