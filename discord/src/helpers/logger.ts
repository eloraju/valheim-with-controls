export class Logger {
  private readonly tag: string;
  constructor() {
    this.tag = new Date().getTime().toString(16);
  }

  start() {
    console.log(`==================== [${this.tag}] EVENT START ====================`);
  }

  end() {
    console.log(`==================== [${this.tag}] EVENT END ======================`);
  }

  log(message: string): void {
    console.log(`[${this.tag}]\t ${message}`)
  }
}