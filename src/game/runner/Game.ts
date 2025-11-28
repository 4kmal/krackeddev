import * as Phaser from "phaser";
import { RunnerScene } from "./RunnerScene";

export function createRunnerGame(parent: HTMLElement): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    parent,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: "#0a0a0f",
    physics: {
      default: "arcade",
      arcade: {
        gravity: { x: 0, y: 800 },
        debug: false,
      },
    },
    input: {
      keyboard: {
        target: window,
      },
    },
    scene: [RunnerScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };

  return new Phaser.Game(config);
}

