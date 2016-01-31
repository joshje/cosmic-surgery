module.exports = {
  addState: function(state) {
    document.body.className += ' ' + state;
  },
  removeState: function(state) {
    document.body.className = document.body.className.replace(state, '');
  }
};
