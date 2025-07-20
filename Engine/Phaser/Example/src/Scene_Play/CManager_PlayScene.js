/**
 * 플레이 씬 관리자
 */
class CManager_PlayScene extends Phaser.Scene {
	/**
	 * 상태
	 */
	static STATE_READY = 0;
	static STATE_PLAY = 1;
	static STATE_GAME_OVER = 2;

	/** 생성자 */
	constructor() {
		super("Scene_Play");

		this.State = CManager_PlayScene.STATE_READY;
		this.m_oListSprites_BG = [];
	}

	/** 초기화 */
	preload() {
		this.load.image("Img_BG", "resources/Img_BG.png");
		this.load.image("Img_Player", "resources/Img_Player.png");

		this.m_oGroup_Obstacle = this.physics.add.group();
		this.m_oGroup_Bounding = this.physics.add.staticGroup();
	}

	/** 생성 되었을 경우*/
	create() {
		this.setupBG();
		this.setupBounding();

		this.m_oUIText_Score = this.add.text(this.scale.width / 2.0, 0, "0", {
			fontSize: "68px",
			fontFamily: "NanumGothic",
			fontStyle: "Bold",
			color: "#ffffff",
			stroke: "#000000",
			strokeThickness: 7.5
		});

		this.m_oUIText_Score.setDepth(1);
		this.m_oUIText_Score.setOrigin(0.5, 0.0);

		this.m_oSprite_Player = this.physics.add.sprite(250.0, this.scale.height / 2.0 - 350.0, "Img_Player");
		this.m_oSprite_Player.setCollideWorldBounds(true);

		this.m_oCursor_Keyboard = this.input.keyboard.createCursorKeys();

		this.physics.add.collider(this.m_oSprite_Player,
			this.m_oGroup_Obstacle, this.handleOnCollision_Enter, null, this);

		this.physics.add.collider(this.m_oSprite_Player,
			this.m_oGroup_Bounding, this.handleOnCollision_Enter, null, this);

		this.time.delayedCall(750, () => {
			this.State = CManager_PlayScene.STATE_PLAY;
			this.m_oSprite_Player.setGravity(0.0, 980.0 * 2.0);
		}, [], this);
	}

	/** 상태를 갱신한다 */
	update(a_fTime, a_fTime_Delta) {
		// 상태 갱신이 불가능 할 경우
		if (this.State != CManager_PlayScene.STATE_PLAY) {
			return;
		}

		for (var i = 0; i < this.m_oListSprites_BG.length; ++i) {
			var oSprite_BG = this.m_oListSprites_BG[i];
			oSprite_BG.setX(oSprite_BG.x + (250.0 * -1.0 * a_fTime_Delta / 1000.0));
		}

		// 스페이스를 눌렀을 경우
		if (this.m_oCursor_Keyboard.space.isDown) {
			this.m_oSprite_Player.setVelocity(0.0, -750.0);
		}

		// 위치 갱신이 필요 할 경우
		if (this.m_oListSprites_BG[0].x <= -this.scale.width) {
			var oSprite_BG = this.m_oListSprites_BG.shift();
			oSprite_BG.setX(this.m_oListSprites_BG[this.m_oListSprites_BG.length - 1].x + this.scale.width);

			this.m_oListSprites_BG.push(oSprite_BG);
		}
	}

	/** 배경을 설정한다 */
	setupBG() {
		var oSprite_BG_A = this.add.sprite(0.0, this.scale.height / 2.0, "Img_BG");
		oSprite_BG_A.setOrigin(0.0, 0.5);

		var oSprite_BG_B = this.add.sprite(this.scale.width, this.scale.height / 2.0, "Img_BG");
		oSprite_BG_B.setOrigin(0.0, 0.5);

		this.m_oListSprites_BG.push(oSprite_BG_A);
		this.m_oListSprites_BG.push(oSprite_BG_B);
	}

	/** 경계를 설정한다 */
	setupBounding() {
		var oSprite_Bottom = this.m_oGroup_Bounding.create(this.scale.width / 2.0, this.scale.height, null);
		oSprite_Bottom.setVisible(false);

		oSprite_Bottom.setSize(this.scale.width, 450.0);
		oSprite_Bottom.setOrigin(0.5, 1.0);
	}

	/** 충돌 시작을 처리한다 */
	handleOnCollision_Enter(a_oSender, a_oTarget) {
		this.State = CManager_PlayScene.STATE_GAME_OVER;
	}
};
