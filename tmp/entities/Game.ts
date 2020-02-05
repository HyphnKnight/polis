import { Scenario } from "./Scenario";


export class Game {
  animationId?: number;

  delta: number = 0;
  lastFrame: number = 0;

  constructor(
    readonly scenario: Scenario,
  ) { }

  start() {
    this.loop();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private loop() {
    this.animationId = requestAnimationFrame(() => {
      const thisFrame = Date.now();
      this.delta = thisFrame - this.lastFrame;
      this.scenario.update(this.delta);
      this.lastFrame = thisFrame;
      this.loop();
    });
  }
}