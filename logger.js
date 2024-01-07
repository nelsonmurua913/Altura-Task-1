const chalk = require("chalk");

const info = (log) => {
  console.log(
    chalk.blue(`[${new Date().toLocaleString()}][INFO]`),
    typeof log === "string" ? chalk.blueBright(log) : log
  );
}

const warn = (log) => {
  console.log(
    chalk.yellow(`[${new Date().toLocaleString()}][WARN]`),
    typeof log === "string" ? chalk.yellowBright(log) : log
  );
}

const error = (log) => {
  console.log(
    chalk.red(`[${new Date().toLocaleString()}][ERROR]`),
    typeof log === "string" ? chalk.redBright(log) : log
  );
}

module.exports = {
  info,
  warn,
  error
}