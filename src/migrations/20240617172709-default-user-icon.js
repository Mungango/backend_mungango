"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.sequelize.query(`
			UPDATE "Users"
			SET "icon" = 'http://res.cloudinary.com/ddhbhbxcs/image/upload/v1718593942/fwrscthpnmx4u3dz1gzo.svg';
		  `);
		// Remove a coluna userId da tabela Icons
		await queryInterface.removeColumn("Icons", "userId");
	},

	down: async (queryInterface, Sequelize) => {
		// Adiciona a coluna userId de volta à tabela Icons no caso de rollback
		await queryInterface.addColumn("Icons", "userId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Users", // Nome da tabela Users
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},
};
