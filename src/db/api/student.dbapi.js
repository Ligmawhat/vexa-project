const path = require('path');

const modelsPath = path.join(process.env.PWD, 'src', 'db', 'models');

const {
  UserType, User, University, Country,
} = require(modelsPath);

const weeks = [{
  goals: 'Week 1 goals',
  notes: 'Week 1 notes',
  additionalFiles: [{
    name: 'foo1 name',
    path: 'foo1.pdf',
  }, {
    name: 'bar1 name',
    path: 'bar1.zip',
  }],
  events: 'Week 1 events',
  phaseNumber: 1,
}, {
  goals: 'Week 2 goals',//TODO;
  notes: 'Week 2 notes',
  additionalFiles: [{
    name: 'foo2 name',
    path: 'foo2.pdf',
  }],
  events: [{
    title: 'vid1_1 title',
    path: 'vid1_1.mp4',
    thumbnail: 'img1.jpg',
    duration: 154000,
  }, {
    title: 'vid1_2 title',
    path: 'vid1_2.mp4',
    thumbnail: 'img2.jpg',
    duration: 184000,
  }],
  phaseNumber: 1,
}, {
  goals: 'Week 3 goals',
  notes: 'Week 3 notes',
  additionalFiles: [{
    name: 'foo3 name',
    path: 'foo3.pdf',
  }],
  events: 'Week 3 events',
  phaseNumber: 2,
}, {
  goals: 'Week 4 goals',
  notes: 'Week 4 notes',
  events: 'Week 4 events',
  phaseNumber: 2,
}, {
  goals: 'Week 5 goals',
  notes: 'Week 5 notes',
  events: 'Week 5 events',
  phaseNumber: 3,
}, {
  goals: 'Week 6 goals',
  notes: 'Week 6 notes',
  events: 'Week 6 events',
  phaseNumber: 3,
}];

const obj = {};

module.exports = obj;
