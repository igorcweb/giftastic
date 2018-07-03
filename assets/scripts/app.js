(function() {
  const topics = ['cat', 'dog', 'mouse', 'rabbit'];
  function renderButtons() {
    topics.forEach(function(topic) {
      $('#buttons').append('<button>' + topic + '</button>');
    });
  }
  renderButtons();
})();
