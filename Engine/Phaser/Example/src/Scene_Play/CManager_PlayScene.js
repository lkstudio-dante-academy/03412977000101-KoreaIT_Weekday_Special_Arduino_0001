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
	}

	/** 초기화 */
	preload() {
		this.State = CManager_PlayScene.STATE_READY;
		this.m_nScore = 0;

		this.m_fSpeed_Move = 250.0;
		this.m_fSkipTime_Obstacle = Number.MAX_SAFE_INTEGER;

		this.m_oListSprites_BG = [];
		this.m_oListObstacles = [];

		this.m_oGroup_Obstacle = this.physics.add.group();
		this.m_oGroup_Bounding = this.physics.add.staticGroup();

		this.load.image("Img_BG", "resources/Img_BG.png");
		this.load.image("Img_Player", "resources/Img_Player.png");
		this.load.image("Img_Obstacle", "resources/Img_Obstacle.png");
	}

	/** 생성 되었을 경우*/
	create() {
		this.setupBG();
		this.setupUIs();
		this.setupBounding();

		this.m_oKey_Esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
		this.m_oKey_Space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

		this.m_oSprite_Player = this.physics.add.sprite(250.0, this.scale.height / 2.0 - 350.0, "Img_Player");
		this.m_oSprite_Player.setCollideWorldBounds(true);

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
	update(a_nTime, a_nTime_Delta) {
		// 재시작 가능 할 경우
		if (Phaser.Input.Keyboard.JustDown(this.m_oKey_Esc) && this.State == CManager_PlayScene.STATE_GAME_OVER) {
			this.scene.restart();
		}

		// 상태 갱신이 불가능 할 경우
		if (this.State != CManager_PlayScene.STATE_PLAY) {
			return;
		}

		this.updateState_BG(a_nTime, a_nTime_Delta);
		this.updateState_UIs(a_nTime, a_nTime_Delta);
		this.updateState_Obstacle(a_nTime, a_nTime_Delta);

		// 스페이스를 눌렀을 경우
		if (Phaser.Input.Keyboard.JustDown(this.m_oKey_Space)) {
			this.m_oSprite_Player.setVelocity(0.0, -750.0);
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

	/** UI 를 설정한다 */
	setupUIs() {
		// 점수 텍스트를 설정한다 {
		this.m_oUIText_Score = this.add.text(this.scale.width / 2.0, 0.0, "0", {
			fontSize: "68px",
			fontFamily: "NanumGothic",
			fontStyle: "Bold",
			color: "#ffffff",
			stroke: "#000000",
			strokeThickness: 12.5
		});

		this.m_oUIText_Score.setDepth(128 * 1);
		this.m_oUIText_Score.setOrigin(0.5, 0.0);
		// 점수 텍스트를 설정한다 }

		// 게임 오버 텍스트를 설정한다 {
		this.m_oUIText_GameOver = this.add.text(this.scale.width / 2.0, this.scale.height / 2.0, "Game Over", {
			fontSize: "158px",
			fontFamily: "NanumGothic",
			fontStyle: "Bold",
			color: "#ffffff",
			stroke: "#000000",
			strokeThickness: 12.5
		});

		this.m_oUIText_GameOver.setDepth(128 * 3);
		this.m_oUIText_GameOver.setOrigin(0.5, 0.5);
		// 게임 오버 텍스트를 설정한다 }

		// 블라인드 이미지를 설정한다 {
		this.m_oUIImg_Blind = this.add.image(this.scale.width / 2.0, this.scale.height / 2.0, "Img_BG");
		this.m_oUIImg_Blind.setTint(0x000000);
		this.m_oUIImg_Blind.setAlpha(0.85);

		this.m_oUIImg_Blind.setDepth(128 * 2);
		// 블라인드 이미지를 설정한다 }

		this.m_oUIText_GameOver.setVisible(false);
		this.m_oUIImg_Blind.setVisible(false);
	}

	/** 경계를 설정한다 */
	setupBounding() {
		var oSprite_Bottom = this.m_oGroup_Bounding.create(this.scale.width / 2.0, this.scale.height - (225.0 / 2.0), null);
		oSprite_Bottom.setSize(this.scale.width, 225.0);
		oSprite_Bottom.setVisible(false);
	}

	/** UI 상태를 갱신한다 */
	updateState_UIs(a_nTime, a_nTime_Delta) {
		this.m_oUIText_Score.setText(String(this.m_nScore));
	}

	/** 배경 상태를 갱신한다 */
	updateState_BG(a_nTime, a_nTime_Delta) {
		for (var i = 0; i < this.m_oListSprites_BG.length; ++i) {
			var oSprite_BG = this.m_oListSprites_BG[i];
			oSprite_BG.setX(oSprite_BG.x + (this.m_fSpeed_Move * -1.0 * a_nTime_Delta / 1000.0));
		}

		// 위치 갱신이 필요 할 경우
		if (this.m_oListSprites_BG[0].x <= -this.scale.width) {
			var oSprite_BG = this.m_oListSprites_BG.shift();
			oSprite_BG.setX(this.m_oListSprites_BG[this.m_oListSprites_BG.length - 1].x + this.scale.width);

			this.m_oListSprites_BG.push(oSprite_BG);
		}
	}

	/** 장애물을 상태를 갱신한다 */
	updateState_Obstacle(a_nTime, a_nTime_Delta) {
		this.m_fSkipTime_Obstacle += a_nTime_Delta / 1000.0;

		for (var i = 0; i < this.m_oListObstacles.length; ++i) {
			this.m_oListObstacles[i].update(a_nTime, a_nTime_Delta);
		}

		for (var i = 0; i < this.m_oListObstacles.length; ++i) {
			var oObstacle = this.m_oListObstacles[i];
			oObstacle.setX(oObstacle.x + (this.m_fSpeed_Move * -1.0 * a_nTime_Delta / 1000.0));

			// 점수 획득이 가능 할 경우
			if (oObstacle.m_bIsEnable_AcquireScore && oObstacle.x <= this.m_oSprite_Player.x) {
				this.m_nScore += 1;
				oObstacle.m_bIsEnable_AcquireScore = false;
			}
		}

		// 장애물 생성이 가능 할 경우
		if (this.m_fSkipTime_Obstacle >= 2.5) {
			this.m_fSkipTime_Obstacle = 0.0;

			var oObstacle = new CObstacle(this, this.scale.width + 150.0, 0.0);
			oObstacle.init(this.m_oGroup_Obstacle);

			this.m_oListObstacles.push(oObstacle);
		}
	}

	/** 충돌 시작을 처리한다 */
	handleOnCollision_Enter(a_oSender, a_oTarget) {
		this.State = CManager_PlayScene.STATE_GAME_OVER;

		this.m_oUIText_GameOver.setVisible(true);
		this.m_oUIImg_Blind.setVisible(true);

		this.m_oSprite_Player.setGravity(0.0, 0.0);
		this.m_oSprite_Player.setVelocity(0.0, 0.0);
	}
};
