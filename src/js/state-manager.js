var stageMap = {
  start: require('../../views/partials/stageStart.handlebars'),
  surgery: require('../../views/partials/stageSurgery.handlebars'),
  complete: require('../../views/partials/stageComplete.handlebars')
};

var stageEl = document.getElementById('stage');

module.exports = {
  addState: function(state) {
    document.body.className += ' ' + state;
  },
  removeState: function(state) {
    document.body.className = document.body.className.replace(state, '');
  },
  setStage: function(stage) {
    stageEl.innerHTML = stageMap[stage]({
      count: window.csConfig.count
    });
  }
};
