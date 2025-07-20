/**
 * 물리 씬 관리자
 */
class CManager_PhysicsScene extends Phaser.Scene {
	/** 생성자 */
	constructor() {
		super("Scene_Physics");
	}

	/** 초기화 */
	preload() {
		this.m_oListNames_Img = [
			"Img_Obj_01",
			"Img_Obj_02",
			"Img_Obj_03",
			"Img_Obj_04",
			"Img_Obj_05",
			"Img_Obj_06"
		];

		for (var i = 0; i < this.m_oListNames_Img.length; ++i) {
			var oName = this.m_oListNames_Img[i];
			this.load.image(oName, "resources/" + oName + ".png");
		}
	}

	/** 생성 되었을 경우 */
	create() {
		this.m_oListSprites = [];
		this.m_oKey_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.m_oGroup_Physics = this.physics.add.group();
		this.physics.add.collider(this.m_oGroup_Physics);
	}

	/** 상태를 갱신한다 */
	update() {
		// 스페이스를 눌렀을 경우
		if (Phaser.Input.Keyboard.JustDown(this.m_oKey_Space)) {
			var nIdx = Phaser.Math.Between(1, this.m_oListNames_Img.length - 1);

			var oSprite = this.m_oGroup_Physics.create(this.scale.width / 2.0,
				this.scale.height / 2.0, this.m_oListNames_Img[nIdx]);

			oSprite.setBounce(0.5);
			oSprite.setCollideWorldBounds(true);
			oSprite.body.setGravity(0.0, 980.0 * 2.0);
		}
	}
};
