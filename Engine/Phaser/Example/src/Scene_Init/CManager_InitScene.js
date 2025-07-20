/**
 * 초기화 씬 관리자
 */
class CManager_InitScene extends Phaser.Scene {
	/** 생성자 */
	constructor() {
		super("Scene_Main");
	}

	/** 초기화 */
	preload() {
		this.load.image("Img_BG", "resources/Img_BG.png");
	}

	/** 생성 되었을 경우*/
	create() {
		// 텍스트를 설정한다 {
		this.m_oUIText_Title = this.add.text(this.scale.width / 2.0, this.scale.height / 2.0, "Flappy Bird", {
			fontSize: "158px",
			fontFamily: "NanumGothic",
			fontStyle: "Bold",
			color: "#ffffff",
			stroke: "#000000",
			strokeThickness: 12.5
		});

		this.m_oUIText_Title.setDepth(1);
		this.m_oUIText_Title.setOrigin(0.5, 0.5);
		// 텍스트를 설정한다 }

		// 스프라이트를 설정한다 {
		this.m_oSprite_BG = this.add.sprite(this.scale.width / 2.0, this.scale.height / 2.0, "Img_BG");

		this.m_oSprite_BG.setInteractive();
		this.m_oSprite_BG.on("pointerdown", this.handleOnTouch_BGSprite, this);
		// 스프라이트를 설정한다 }
	}

	/** 배경 스프라이트 클릭을 처리한다 */
	handleOnTouch_BGSprite(a_oSender) {
		this.scene.switch("Scene_Play");
	}
};
