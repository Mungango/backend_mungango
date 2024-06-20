"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Hashtags", "postId");
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Hashtags", "postId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Posts",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},
};
