import { Client } from "ssh2";

const sshHost = process.env.SSH_HOST;
const sshPort = 22;
const sshUser = process.env.SSH_USER;
const sshKey = process.env.SSH_KEY;

export function sshExec(command: string) {
  return new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            console.error(`sshRequest() conn.exec() ${err}`);
            return reject(err);
          }
          const output = {
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
      .on("error", (err) => {
        console.error(`sshRequest() conn() ${err}`);
        return reject(err);
      })
      .connect({
        host: sshHost,
        port: sshPort,
        username: sshUser,
        privateKey: sshKey,
      });
  });
}
