"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "isTermAccepted", {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Users", "isTermAccepted");
	},
};
