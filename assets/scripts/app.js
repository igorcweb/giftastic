(function() {
  const buttons = $('#buttons');
  let topics = ['dog', 'cat', 'mouse', 'rabbit'];
  const gifs = $('#gifs');
  let newTopic;
  let storedTopics;
  function renderButtons() {
    storedTopics = JSON.parse(localStorage.getItem('storedTopics'));
    console.log('stored: ', storedTopics);
    if (storedTopics) {
      topics = storedTopics;
    }
    // topics.forEach(function(topic) {
    $.each(topics, function(index, topic) {
      let data = topic.replace(' ', '+');
      $('#buttons')
        .append(
          `<button class="btn btn-outline-primary m-2" data-topic=${data}>${topic}</button>`
        )
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
  $('.clear').on('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    topics = [];
    buttons.empty();
    renderButtons();
  });
  renderButtons();
  const api_key = () => {
    return '5n53cDRx0FU49ewKdFwuBjKCTqy8XNip&limit=5';
  };
  let url;
  buttons.on('click', '.btn', function() {
    const query = this.dataset.topic;
    url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key()}`;
    getGif();
  });
  function getGif() {
    $.get(url)
      .then(res => {
        let src = res.data[0].images.original.url;
        gifs.append(`<img src=${src}>`);
      })
      .catch(err => {
        console.log(err);
      });
  }
})();
