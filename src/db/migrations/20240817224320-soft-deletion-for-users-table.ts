"use strict";

import { QueryInterface, DataTypes } from "sequelize";
import { Migration } from "sequelize-cli";

export default {
  async up(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.addColumn(
        "users",
        "deletedAt",
        {
          type: DataTypes.DATE,
          allowNull: true,
        },
        { transaction },
      );
    });
  },

  async down(queryInterface: QueryInterface) {
    queryInterface.sequelize.transaction((transaction) => {
      return queryInterface.removeColumn("users", "deletedAt", { transaction });
    });
  },
} as Migration;
