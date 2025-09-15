/* eslint-disable no-console */
'use strict';

const { sequelize } = require('./db');

async function syncDb() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection established');

    await sequelize.sync({ forse: true });
    console.log('✅ Tables synchronized');
  } catch (error) {
    console.error('❌ Error syncing DB:', error);
  } finally {
    await sequelize.close();
  }
}

syncDb();
