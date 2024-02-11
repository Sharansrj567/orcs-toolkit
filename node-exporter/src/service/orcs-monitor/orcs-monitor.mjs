import WindowsMonitorService from "./services/WindowsService.js";
import LinuxMonitorService from "./services/LinuxService.js";
import MacMonitorService from "./services/MacService.js";
import { Spinner } from "cli-spinner";
import process from "process";
export default class OrcsMonitor {
  osType = { win32: "WINDOWS", linux: "LINUX", darwin: "MAC" };
  constructor(banList, intervalTimeInMiliSeconds) {
    this.detectOS();
    this.createPlaformInstance(banList, intervalTimeInMiliSeconds);
  }
  detectOS() {
    this.os = this.osType[process.platform];
  }
  createPlaformInstance(banList, intervalTimeInMiliSeconds) {
    const spinner = new Spinner("ORCS MONITORING DAEMON %s");
    // spinner.setSpinnerString(20);
    // spinner.start();
    switch (this.os) {
      case "WINDOWS":
        this.platformService = new WindowsMonitorService(
          banList,
          intervalTimeInMiliSeconds
        );
        break;
      case "LINUX":
        this.platformService = new LinuxMonitorService(
          banList,
          intervalTimeInMiliSeconds
        );
        break;
      case "MAC":
        this.platformService = new MacMonitorService(
          banList,
          intervalTimeInMiliSeconds
        );
        break;
      default:
    }
  }
  updateBanList(banList) {
    this.platformService.updateBanList(banList);
  }
  updateRoutineIntervalTime(time) {
    this.platformService.updateRoutineIntervalTime(time);
  }
}
