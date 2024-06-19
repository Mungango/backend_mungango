"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Icons", "name", {
			type: Sequelize.STRING(20),
		});

		await queryInterface.sequelize.query(`
			UPDATE "Icons"
			SET "name" = 'icon'
			WHERE "name" IS NULL;
		  `);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Icons", "name");
	},
};
