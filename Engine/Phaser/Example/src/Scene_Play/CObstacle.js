/**
 * 장애물
 */
class CObstacle extends Phaser.GameObjects.GameObject {
	/** 생성자 */
	constructor(a_oScene) {
		this.scene = Phaser.Scene(a_oScene);
	}

	/** 초기화 */
	preload() {
		this.scene.load.image("Img_Obstacle", "resources/Img_Obstacle.png");
	}
};
