var startTmpl = require('../../views/partials/stageStart.handlebars');
var surgeryTmpl = require('../../views/partials/stageSurgery.handlebars');
var completeTmpl = require('../../views/partials/stageComplete.handlebars');

var shareTmpls = {
  capture: require('../../views/partials/share/capture.handlebars'),
  wait: require('../../views/partials/share/wait.handlebars'),
  share: require('../../views/partials/share/share.handlebars')
};

var procedures = [
  {
    name: 'icosahedron',
    label: 'Procedure A',
    active: true
  },
  {
    name: 'triangle',
    label: 'Procedure B'
  }
];

var countStr = function() {
  window.csConfig.count++;
  var count = '00' + window.csConfig.count;
  count = count.substr(count.length - 3);
  return count;
};


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
      count: countStr(),
      procedures: procedures
    });
  },
  showShare: function(view, opts) {
    view = view || 'capture';
    var shareEl = document.querySelector('.share');
    shareEl.innerHTML = shareTmpls[view](opts);
  },
  hideShare: function() {
    var shareEl = document.querySelector('.share');
    shareEl.innerHTML = '';
  },
  showComplete: function() {
    stageEl.innerHTML = completeTmpl();
  }
};
