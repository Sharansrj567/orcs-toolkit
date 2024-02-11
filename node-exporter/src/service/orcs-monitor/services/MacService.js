import find from "find-process";
import ps from "ps-node";
import notifier from 'node-notifier';
export default class MacMonitorService {
  constructor(banList, intervalTimeInMiliSeconds) {
    this.banList = banList;
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    this.routine();
  }
  async pskill(processName) {
    find("name", processName.toLowerCase(), true).then(function (list) {
      if(list.length != 0){
        notifier.notify({
          title: 'Warning !',
          message: list[0].name + ' is a restricted program please do not use! Program will be terminated',
          timeout:5
        });     
        }
      list.forEach(async (process) => {
        ps.kill(process.pid), function( err ) {
          if (err) {
              throw new Error( err );
          }
          else {
              console.log( 'Process %s has been killed!', pid );
          }
      }
      });
    });
  }
  routine() {
    const killProcesses = () => {
      this.banList.forEach((process) => {
        this.pskill(process);
      });
    };
    this.currentRoutine = setInterval(killProcesses, this.routineIntervalTime);
  }
  updateBanList(banList) {
    this.banList = banList;
  }
  updateRoutineIntervalTime(intervalTimeInMiliSeconds) {
    this.routineIntervalTime = intervalTimeInMiliSeconds;
    clearInterval(this.currentRoutine);
    this.routine();
  }
}
