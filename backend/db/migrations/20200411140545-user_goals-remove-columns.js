'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    
      return queryInterface.removeColumn(
        'user_goals',
        'updated_at'
      );
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
