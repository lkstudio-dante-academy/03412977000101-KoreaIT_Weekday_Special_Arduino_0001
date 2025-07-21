/**
 * 장애물
 */
class CObstacle extends Phaser.GameObjects.Container  {
	/** 생성자 */
	constructor(a_oScene, a_fPos_X, a_fPos_Y) {
		super(a_oScene, a_fPos_X, a_fPos_Y);
		this.scene.add.existing(this);

		this.m_bIsEnable_AcquireScore = true;
	}

	/** 초기화 */
	init(a_oGroup_Collider) {
		var fRate_SafeArea = 0.3;
		var fRate_Obstacle = 1.0 - fRate_SafeArea;

		var fRate_UpObstacle = Phaser.Math.FloatBetween(0.1, 0.9);
		var fRate_DownObstacle = 1.0 - fRate_UpObstacle;

		// 상단 장애물을 설정한다 {
		this.m_oSprite_UpObstacle = a_oGroup_Collider.create(0.0, 0.0, "Img_Obstacle");
		this.m_oSprite_UpObstacle.setOrigin(0.5, 0.0);
		this.m_oSprite_UpObstacle.setDepth(1);

		this.m_oSprite_UpObstacle.setScale(1.0, fRate_UpObstacle * fRate_Obstacle);
		this.m_oSprite_UpObstacle.setImmovable(true);
		// 상단 장애물을 설정한다 }

		// 하단 장애물을 설정한다 {
		this.m_oSprite_DownObstacle = a_oGroup_Collider.create(0.0, 0.0, "Img_Obstacle");
		this.m_oSprite_DownObstacle.setPosition(0.0, this.scene.scale.height - 225.0);
		
		this.m_oSprite_DownObstacle.setOrigin(0.5, 1.0);
		this.m_oSprite_DownObstacle.setDepth(1);

		this.m_oSprite_DownObstacle.setScale(1.0, fRate_DownObstacle * fRate_Obstacle);
		this.m_oSprite_DownObstacle.setImmovable(true);
		// 하단 장애물을 설정한다 }
		
		this.add(this.m_oSprite_UpObstacle);
		this.add(this.m_oSprite_DownObstacle);
	}
};
