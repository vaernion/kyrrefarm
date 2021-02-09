import { Client } from "ssh2";

const sshKey = process.env.SSH_KEY;
const sshUser = process.env.SSH_USER;
const sshPath = process.env.SSH_PATH;

export function sshExec(command: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            console.error(`sshRequest() conn.exec() error: ${err}`);
            return reject(err);
          }
          let output = {
            stdout: "",
            stderr: "",
          };
          stream
            .on("close", (code: any, signal: any) => {
              // console.log(
              //   "Stream :: close :: code: " + code + ", signal: " + signal
              // );
              conn.end();
              resolve(output);
            })
            .on("data", (data: any) => {
              //   console.log(`STDOUT: ${data}`);
              output.stdout += data;
            })
            .stderr.on("data", (data: any) => {
              //   console.log(`STDERR: ${data}`);
              output.stderr += data;
            });
        });
      })
      .connect({
        host: sshPath,
        port: 22,
        username: sshUser,
        privateKey: sshKey,
      });
  });
}
