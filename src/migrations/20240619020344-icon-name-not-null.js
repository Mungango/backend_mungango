"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Icons", "name", {
			type: Sequelize.STRING, // Certifique-se de usar o tipo de dado correto
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("Icons", "name", {
			type: Sequelize.STRING, // Certifique-se de usar o tipo de dado correto
			allowNull: true,
		});
	},
};
