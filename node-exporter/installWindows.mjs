import { Service } from "node-windows";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const myArgs = process.argv.slice(2);
var svc = new Service({
  name: "Orcs Service",
  description: "Orcs Service is running",
  nodeOptions: [
    "--harmony",
    "--max_old_space_size=4096",
    "--experimental-modules",
  ],
  script: __dirname + "\\src\\index.mjs",
});
svc.on("uninstall", function () {
  svc.stop();
});
svc.on("install", function () {
  svc.start();
});

if (myArgs[0] == "install") {
  svc.install();
} else {
  svc.uninstall();
}
