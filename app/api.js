const express = require('express');
const requireAuth = require('./auth.js');
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
  res.json({ data: equipment, error: null });
});

// Returns a filtered set of all equipment in the TUTV inventory (search for a string and/or filter
// by date)
api.get('/equipment/search', (req, res) => {
  let items = equipment.map((item) => ({ ...item, available_count: item.total_count }));
  const { q, startDate, endDate, category } = req.query;

  // Filtering by date - change available_count
  if (startDate || endDate) { // ?startDate=anything&endDate=anything
    items = items
      .map((item) => ({ ...item, available_count: Math.round(Math.random() * item.total_count) }))
      .filter(({ available_count }) => available_count > 0);
  }
  // Text search (search category and name for a match)
  if (q) { // ?q=camera
    items = items.filter(
      ({ name: n, category: c }) => (n + c.name + c.display_name).toLowerCase().includes(q.toLowerCase())
    );
  }
  if (category) { // ?category=microphone
    items = items.filter(({ category: c }) => c.slug === category);
  }

  return res.json({ data: items, error: null });
});



/**
 * User routes
 *
 * These routes return information specific to the authenticated user.
 * Admin priviliges are not required for these routes.
 */

// Returns info about the authenticated user
api.get('/user/', requireAuth(), (req, res) => {
  res
    .status(req.authPassed ? 200 : 403)
    .json({
      data: {
        username: req.userInfo.sub,
        name: req.userInfo.name
      },
      error: req.errorMessage
    });
});

// Returns a summary of all user requests current and past
api.get('/user/requests/overview/', requireAuth('user'), (req, res) => {
  const overview = userRequests.map(({ name, id, start_date, end_date, equipment }) => ({
    name,
    id,
    start_date,
    end_date,
    equipment_count: equipment.length,
  }));

  return res
    .status(req.authPassed ? 200 : 403)
    .json({
      data: overview,
      error: req.errorMessage,
    });
});

// Returns info about a specific item request
api.get('/user/requests/:id/', requireAuth('user'), (req, res) => {
  return res
    .status(req.authPassed ? 200 : 403)
    .json({
      data: { id: req.params.id },
      error: req.errorMessage,
    });
});

module.exports = api;
