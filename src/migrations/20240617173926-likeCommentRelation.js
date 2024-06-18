"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeConstraint(
			"LikesComments",
			"LikesComments_ownerId_fkey"
		);
		await queryInterface.addConstraint("LikesComments", {
			fields: ["ownerId"],
			type: "foreign key",
			references: {
				table: "Comments", // nova tabela referenciada
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint(
			"LikesComments",
			"LikesComments_ownerId_fkey"
		);
		await queryInterface.addConstraint("LikesComments", {
			fields: ["ownerId"],
			type: "foreign key",
			references: {
				table: "Posts", // tabela original referenciada
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
	},
};
