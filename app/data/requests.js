const { equipment } = require('./equipment-list');
const days = n => n * 1000 * 60 * 60 * 24;

module.exports.userRequests = [
  {
    name: "A Lover's Quarrel",
    id: 't5ljqk',
    start_date: new Date(Date.now() + days(4)), // starts 4 days from now
    end_date: new Date(Date.now() + days(8)),   // ends 8 days from now
    passed: false,
    fulfilled: false,
    equipment: [equipment[0], equipment[2]].map(e => ({ ...e, count_requested: Math.floor(Math.random() * e.total_count) })),
  },
  {
    name: 'Athena Project',
    id: 's9eq6z',
    start_date: new Date(Date.now() - days(2)), // started 2 days ago
    end_date: new Date(Date.now() + days(1)),   // ends tomorrow
    passed: true,
    fulfilled: true,
    equipment: [equipment[1], equipment[3], equipment[4]].map(e => ({ ...e, count_requested: Math.floor(Math.random() * e.total_count) })),
  },
  {
    name: 'Bosfeed',
    id: 'lnj1e7',
    start_date: new Date(Date.now() - days(60)), // started 2 months ago
    start_date: new Date(Date.now() - days(57)), // ended a few days later
    passed: true,
    fulfilled: true,
    equipment: [equipment[3], equipment[5]].map(e => ({ ...e, count_requested: Math.floor(Math.random() * e.total_count) })),
  },
];
