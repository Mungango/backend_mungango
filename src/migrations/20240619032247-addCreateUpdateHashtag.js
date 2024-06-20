"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Hashtags", "createdAt", {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.fn("NOW"),
		});
		await queryInterface.addColumn("Hashtags", "updatedAt", {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.fn("NOW"),
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Hashtags", "createdAt");
		await queryInterface.removeColumn("Hashtags", "updatedAt");
	},
};
