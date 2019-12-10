const express = require('express');
const { equipment } = require('./data/equipment-list');
const { userRequests } = require('./data/requests');

const api = express.Router({ strict: true });

api.get('/', (req, res) => { res.json({ status: 'ok' }); });


/**
 * General routes
 *
 * These routes do not require authenitcation and return general public information about the TUTV
 * catalog and other public, non-user-specific info
 */

// Returns a summary of all equipment in the TUTV inventory
api.get('/equipment/', (req, res) => {
  res.json(equipment);
});

// Returns a filtered set of all equipment in the TUTV inventory (search for a string and/or filter
// by date)
api.get('/equipment/search', (req, res) => {
  let items = equipment.map((item) => ({ ...item, available_count: item.total_count }));
  const { q, startDate, endDate } = req.query;

  // Filtering by date - change available_count
  if (startDate || endDate) {
    items = items
      .map((item) => ({ ...item, available_count: Math.round(Math.random() * item.total_count) }))
      .filter(({ available_count }) => available_count > 0);
  }
  // Text search (search category and name for a match)
  if (q) {
    items = items.filter(
      ({ name: n, category: c }) => (n + c.name + c.display_name).toLowerCase().includes(q.toLowerCase())
    );
  }

  return res.json(items);
});



/**
 * User routes
 *
 * These routes return information specific to the authenticated user.
 * Admin priviliges are not required for these routes.
 */

// Returns info about the authenticated user
 api.get('/user/', (req, res) => {
  res.json({ username: 'test' });
 });

// Returns a summary of all user requests current and past
api.get('/user/requests/overview/', (req, res) => {
  const overview = userRequests.map(({ name, id, start_date, end_date, equipment }) => ({
    name,
    id,
    start_date,
    end_date,
    equipment_count: equipment.length,
  }));
  return res.json(overview);
});

// Returns info about a specific item request
api.get('/user/requests/:id/', (req, res) => {
  return res.json({ id: req.params.id });
});

module.exports = api;
