var startTmpl = require('../../views/partials/stageStart.handlebars');
var surgeryTmpl = require('../../views/partials/stageSurgery.handlebars');
var completeTmpl = require('../../views/partials/stageComplete.handlebars');

var procedures = [
  {
    name: 'icosahedron',
    label: 'Procedure A',
    active: true
  },
  {
    name: 'test',
    label: 'Procedure B'
  }
];

var stageEl = document.getElementById('stage');

module.exports = {
  addState: function(state) {
    document.body.className += ' ' + state;
  },
  removeState: function(state) {
    document.body.className = document.body.className.replace(state, '');
  },
  showStart: function() {
    stageEl.innerHTML = startTmpl();
  },
  showSurgery: function() {
    stageEl.innerHTML = surgeryTmpl({
      count: window.csConfig.count,
      procedures: procedures
    });
  },
  showComplete: function() {
    stageEl.innerHTML = completeTmpl();
  }
};
