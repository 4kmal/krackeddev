import * as Phaser from "phaser";

export class RunnerPlayer extends Phaser.Physics.Arcade.Sprite {
  private initialJumpForce = -280;
  private boostForce = -25;
  private maxBoostTime = 300; // max ms to boost
  private boostTimer = 0;
  private isJumping = false;
  private isHoldingJump = false;
  private canBoost = false;
  private mustReleaseBeforeJump = false; // Prevents jumping again until key is released

  constructor(scene: Phaser.Scene, x: number, y: number) {
    // Create a texture for the player using graphics (no background)
    if (!scene.textures.exists("runner-char")) {
      const graphics = scene.add.graphics();
      
      // Draw a simple pixel art dev character (16x16)
      // Body (hoodie)
      graphics.fillStyle(0x1a1a2e);
      graphics.fillRect(4, 6, 8, 8);
      
      // Head (skin tone)
      graphics.fillStyle(0xffdbac);
      graphics.fillRect(4, 2, 8, 5);
      
      // Hair
      graphics.fillStyle(0x2d2d2d);
      graphics.fillRect(4, 1, 8, 2);
      
      // Eyes
      graphics.fillStyle(0x00ff00);
      graphics.fillRect(5, 4, 2, 1);
      graphics.fillRect(9, 4, 2, 1);
      
      // Legs
      graphics.fillStyle(0x4a4a6a);
      graphics.fillRect(4, 14, 3, 2);
      graphics.fillRect(9, 14, 3, 2);
      
      // Generate texture from graphics
      graphics.generateTexture("runner-char", 16, 16);
      graphics.destroy();
    }

    super(scene, x, y, "runner-char");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setSize(14, 14);
    this.setOffset(1, 2);
    this.setGravityY(800);
  }

  jump(): boolean {
    // Must release key before jumping again
    if (this.mustReleaseBeforeJump) {
      return false;
    }

    const body = this.body as Phaser.Physics.Arcade.Body;
    const onGround = body.blocked.down || body.touching.down;

    if (onGround) {
      // Initial jump impulse
      this.setVelocityY(this.initialJumpForce);
      this.isJumping = true;
      this.isHoldingJump = true;
      this.canBoost = true;
      this.boostTimer = 0;
      this.mustReleaseBeforeJump = true; // Must release key before next jump
      return true;
    }

    return false;
  }

  releaseJump(): void {
    this.isHoldingJump = false;
    this.canBoost = false;
    this.mustReleaseBeforeJump = false; // Can jump again after releasing
  }

  updateJump(delta: number): void {
    const body = this.body as Phaser.Physics.Arcade.Body;
    const onGround = body.blocked.down || body.touching.down;

    // Apply continuous boost while holding jump
    if (this.isHoldingJump && this.canBoost && this.isJumping) {
      this.boostTimer += delta;
      
      if (this.boostTimer < this.maxBoostTime) {
        // Apply boost force - stronger at start, weaker over time
        const boostStrength = 1 - (this.boostTimer / this.maxBoostTime) * 0.5;
        const currentVelY = body.velocity.y;
        this.setVelocityY(currentVelY + this.boostForce * boostStrength);
      } else {
        // Max boost time reached
        this.canBoost = false;
      }
    }

    // Reset when landing
    if (onGround) {
      this.isJumping = false;
      this.canBoost = false;
      this.boostTimer = 0;
    }
  }

  isOnGround(): boolean {
    const body = this.body as Phaser.Physics.Arcade.Body;
    return body.blocked.down || body.touching.down;
  }
}

