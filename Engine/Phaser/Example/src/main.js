const g_oConfig = {
	type: Phaser.AUTO,
	backgroundColor: "#000000",

	scale: {
		width: 1920,
		height: 1280,

		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},

	physics: {
		default: "arcade",
		
		arcade: {
			debug: false
		}
	},

	scene: [CManager_TitleScene, CManager_PlayScene]
};

const g_oGame = new Phaser.Game(g_oConfig)
