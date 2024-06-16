"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.sequelize.query(`
			UPDATE "Users"
			SET "image" = 'https://res.cloudinary.com/ddhbhbxcs/image/upload/qpgpbfl307pxx8wu3hpy?_a=BAMABmLR0'
			WHERE "image" IS NULL;
		  `);

		await queryInterface.changeColumn("Users", "image", {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue:
				"https://res.cloudinary.com/ddhbhbxcs/image/upload/qpgpbfl307pxx8wu3hpy?_a=BAMABmLR0",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Users", "image", {
			type: Sequelize.STRING,
			allowNull: true,
			defaultValue: "default_value",
		});
	},
};
