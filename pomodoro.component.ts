import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnDestroy {
  workDuration = 25 * 60;   // 25 minutes
  breakDuration = 5 * 60;   // 5 minutes
  remainingTime = this.workDuration;
  isWorkSession = true;
  isRunning = false;
  intervalId: any;

  get minutes(): string {
    return Math.floor(this.remainingTime / 60).toString().padStart(2, '0');
  }

  get seconds(): string {
    return (this.remainingTime % 60).toString().padStart(2, '0');
  }

  start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = setInterval(() => {
      this.remainingTime--;

      if (this.remainingTime <= 0) {
        this.switchSession();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  reset() {
    this.pause();
    this.remainingTime = this.isWorkSession ? this.workDuration : this.breakDuration;
  }

  switchSession() {
    this.pause();
    this.isWorkSession = !this.isWorkSession;
    this.remainingTime = this.isWorkSession ? this.workDuration : this.breakDuration;
    this.start(); // auto start next session
  }

  ngOnDestroy() {
    this.pause();
  }
}
