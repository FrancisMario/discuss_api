'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.TEXT
      },
      user: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      upvote: {
        type: Sequelize.INTEGER,
        default: 0
      },
      downvote: {
        type: Sequelize.INTEGER,
        default: 0
      },
      domain_id: {
        type: Sequelize.INTEGER
      },
      is_reply: {
        type: Sequelize.BOOLEAN,
        default: false
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      created_date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      modified_date_time: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};