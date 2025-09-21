'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Categories', [
    { name: 'Work', color: '#ff0000', created_at: new Date(), updated_at: new Date() },
    { name: 'Home', color: '#00ff00', created_at: new Date(), updated_at: new Date() },
    { name: 'Other', color: '#0000ff', created_at: new Date(), updated_at: new Date() }
  ], {});
}
export async function down(queryInterface, Sequelize) {
  return await queryInterface.bulkDelete('Categories', { id: [1, 2, 3] }, {});
}
