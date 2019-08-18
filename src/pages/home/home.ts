import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { TimerPipe } from '../../pipes/timeTransform';

class savedCounterData {
  isPlaying: boolean;
  records: any[];
  currentTime: number;
  timestamp: number;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  records = [];
  savedCounterTime: number;
  isPlaying = false;
  timerSubscription: Subscription;
  startTime: number;
  savedTime: number;
  currentTime: number = 0;

  constructor(private timeTransformer: TimerPipe) {

  }

  ionViewDidLoad() {
    let savedData = localStorage.getItem('timerData');
    if(savedData) {
      const dataObj: savedCounterData = JSON.parse(savedData);
      this.isPlaying = dataObj.isPlaying;
      this.records = dataObj.records;
      if(this.isPlaying) {
        //If counter was playing, keep its value
        this.currentTime = dataObj.currentTime + (new Date().getTime() - dataObj.timestamp);
        this.savedTime = this.currentTime;
      }
      else {
        this.currentTime = dataObj.currentTime;
      }
      this.togglePlay(this.isPlaying);
    }
  }

  togglePlay(isPlaying? :boolean) {
    //Toggle playing by click or get it from saved data upon component load
    this.isPlaying = isPlaying !== undefined ? isPlaying : !this.isPlaying;
    if(this.isPlaying) {
      this.startTime = new Date().getTime();
      this.timerSubscription = timer(0, 1000)
        .subscribe(() => this.setCounterTime());
    }
    else {
      this.savedTime = this.currentTime;
      if(this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.updateLocalStorage();
    }
  }

  //Update current time for displaying in the counter every 1 sec
  setCounterTime() {
    const updatedTime = new Date().getTime();
    if(this.savedTime) {
      this.currentTime = (updatedTime - this.startTime) + this.savedTime;
    }
    else {
      this.currentTime = updatedTime - this.startTime;
     
    }
    this.updateLocalStorage();
  }

  addRecord(time: number) {
    if(timer) {
      const transformedTime = this.timeTransformer.transform(time, true);
      this.records.push(transformedTime);
      this.updateLocalStorage();
    }
  }

  removeRecord(index: number) {
    this.records.splice(index, 1);
    this.updateLocalStorage();
  }

  deleteAll() {
    this.records = [];
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.isPlaying = false;
    this.savedTime = 0;
    this.currentTime = 0;
    this.updateLocalStorage();
  }

  //Store the current app data for keeping it even after refresh
  updateLocalStorage() {
    localStorage.setItem('timerData', JSON.stringify({
      currentTime: this.currentTime, 
      isPlaying: this.isPlaying,
      records: this.records,
      timestamp: new Date().getTime(),
    }));
  }

}
