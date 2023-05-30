export class Log {
  static info(message) {
    return console.info(`ℹ `, message);
  }

  static success(message) {
    return console.info(`✓ Success at ${new Date()}:\n`, message);
  }

  static warn(message) {
    return console.warn(`⚠ Warning at ${new Date()}:\n`, message);
  }

  static error(message) {
    return console.error(`✗ Error at ${new Date()}:\n`, message);
  }
}
