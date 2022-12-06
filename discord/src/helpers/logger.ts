export class Logger {
  private  tag: string;
  constructor() {}

  private updateTimestamp() {
    this.tag = new Date().getTime().toString(16);
  }

  start() {
    this.updateTimestamp();
    console.log(`==================== [${this.tag}] EVENT START ====================`);
  }

  end() {
    console.log(`==================== [${this.tag}] EVENT END ======================`);
  }

  log(message: string): void {
    console.log(`[${this.tag}]\t ${message}`)
  }
}