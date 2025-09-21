'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  return await queryInterface.bulkInsert('Todos', [
    {
      title: 'Complete coding challenge',
      description: 'Build a full-stack todo application for Industrix',
      completed: false,
      category_id: 2,
      priority: 'high',
      due_date: new Date('2024-08-03T23:59:59Z'),
      created_at: new Date('2025-07-31T10:00:00Z'),
      updated_at: new Date('2025-07-31T10:00:00Z')
    },
    {
      title: 'Buy groceries',
      description: null,
      completed: false,
      category_id: 1,
      priority: 'medium',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Prepare presentation for team meeting',
      description: 'Create slides for the upcoming project review',
      completed: false,
      category_id: 1,
      priority: 'high',
      due_date: new Date('2025-10-15T23:59:59Z'),
      created_at: new Date('2025-07-31T10:00:00Z'),
      updated_at: new Date()
    },
    {
      title: 'Schedule dentist appointment',
      description: null,
      completed: false,
      category_id: 1,
      priority: 'medium',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Read a book',
      description: 'Finish reading "The Great Gatsby"',
      completed: false,
      category_id: 3,
      priority: 'low',
      due_date: new Date('2025-10-01T23:59:59Z'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Clean the house',
      description: null,
      completed: false,
      category_id: 1,
      priority: 'medium',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Finish project report',
      description: 'Compile data and write the final report',
      completed: false,
      category_id: 2,
      priority: 'high',
      due_date: new Date('2025-10-30T23:59:59Z'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Plan weekend trip',
      description: null,
      completed: false,
      category_id: 3,
      priority: 'low',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Attend yoga class',
      description: 'Join the evening class at the community center',
      completed: false,
      category_id: 1,
      priority: 'medium',
      due_date: new Date('2025-10-22T18:00:00Z'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Grocery shopping',
      description: 'Buy ingredients for the week',
      completed: false,
      category_id: 1,
      priority: 'medium',
      due_date: new Date('2025-10-25T23:59:59Z'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Update resume',
      description: null,
      completed: false,
      category_id: 2,
      priority: 'high',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Watch a documentary',
      description: 'Learn about climate change',
      completed: false,
      category_id: 3,
      priority: 'low',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Organize files',
      description: null,
      completed: false,
      category_id: 2,
      priority: 'medium',
      due_date: new Date('2025-10-28T23:59:59Z'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Practice coding',
      description: 'Solve problems on LeetCode',
      completed: false,
      category_id: 3,
      priority: 'high',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Practice karate',
      description: 'Punch and kick.',
      completed: true,
      category_id: 3,
      priority: 'high',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      title: 'Cook Spaghetti',
      description: null,
      completed: true,
      category_id: 1,
      priority: 'low',
      due_date: null,
      created_at: new Date(),
      updated_at: new Date()
    }
  ], {});
}

export async function down(queryInterface, Sequelize) {
  return await queryInterface.bulkDelete('Todos', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }, {});

}
