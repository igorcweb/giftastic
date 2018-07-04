(function() {
  const buttons = $('#buttons');
  let topics = ['cat', 'dog', 'mouse', 'rabbit'];
  const gifs = $('#gifs');
  let newTopic;
  let storedTopics;
  function renderButtons() {
    storedTopics = JSON.parse(localStorage.getItem('storedTopics'));
    console.log('stored: ', storedTopics);
    if (storedTopics) {
      topics = storedTopics;
    }
    console.log('topics; ', topics);
    topics.forEach(function(topic) {
      $('#buttons')
        .append(`<button class="btn btn-outline-primary m-2">${topic}</button>`)
        .attr('class', 'm-2');
    });
  }
  $('.go').on('click', function(e) {
    e.preventDefault();
    let topicInput = $('.topic');
    console.log(topicInput.val());
    newTopic = topicInput.val().trim();
    topicInput.val('');
    if (topics.includes(newTopic.toLowerCase())) {
      alert(`${newTopic} has already been added`);
    } else if (newTopic) {
      topics.push(newTopic.toLowerCase());

      localStorage.setItem('storedTopics', JSON.stringify(topics));

      buttons.empty();
      renderButtons();
    }
  });
  $('.clear').on('click', function() {
    localStorage.clear();
    topics = [];
    buttons.empty();
    renderButtons();
  });
  renderButtons();
})();
