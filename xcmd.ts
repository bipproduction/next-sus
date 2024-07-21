import yargs from "yargs";
import { spawn } from "child_process";
import "colors";

yargs()
  .command("push", "push command", (yargs) => yargs, push)
  .recommendCommands()
  .demandCommand(1)
  .parse(process.argv.slice(2));

async function push() {
  const currentBranch = await new Promise<string | null>((resolve, reject) => {
    const child = spawn("/bin/bash", ["-c", "git rev-parse --abbrev-ref HEAD"]);
    child.stdout.on("data", (data) => {
      resolve(data.toString().trim());
    });

    child.stderr.on("data", (data) => {
      reject(null);
    });
  });

  const chlid = spawn("/bin/bash", [
    "-c",
    `git add -A && git commit -m "${currentBranch}" && git push origin ${currentBranch}`,
  ]);
  chlid.stdout.on("data", (data) => {
    console.log(data.toString().green);
  });
  chlid.stderr.on("data", (data) => {
    console.log(data.toString().red);
  });
}
