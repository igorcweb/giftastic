(function() {
  const buttons = $('#buttons');
  let topics = ['dog', 'car', 'happy', 'turtle'];
  const gifs = $('#gifs');
  let newTopic;
  let storedTopics;
  function renderButtons() {
    storedTopics = JSON.parse(localStorage.getItem('storedTopics'));
    if (storedTopics) {
      topics = storedTopics;
    }

    $.each(topics, function(index, topic) {
      let data = topic.replace(' ', '+');
      $('#buttons')
        .append(
          `<button class="btn btn-outline-primary m-2" data-topic=${data}>${topic}</button>`
        )
        .attr('class', 'm-2');
    });
  }

  function addButton(e) {
    e.preventDefault();
    let topicInput = $('.topic');
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
  }
  function getGifs() {
    let srcStill;
    let srcAnimate;
    $.get(url)
      .then(res => {
        $.each(res.data, function(index) {
          srcStill = res.data[index].images.fixed_height_still.url;
          srcAnimated = res.data[index].images.fixed_height.url;
          gifs.prepend(
            `<img src=${srcStill} class="img m-3" data-still=${srcStill} data-animated=${srcAnimated} data-state='still'>`
          );
        });
        gifs.on('click', '.img', function() {
          let $this = $(this);
          if ($this.data('state') === 'still') {
            $this.data('state', 'animated');
            $this.attr('src', $this.data('animated'));
            console.log($this.data('state'));
            console.log($this.attr('src'));
          } else {
            $this.data('state', 'still');
            $this.attr('src', $this.data('still'));
            console.log($this.data('state'));
            console.log($this.attr('src'));
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  $('.go').on('click', addButton);
  $('.clear-topics').on('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    topics = [];
    buttons.empty();
    renderButtons();
  });
  $('.clear-gifs').on('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    gifs.empty();
  });
  renderButtons();
  const api_key = () => {
    return 'XzaARDwSgwOpZyQ8n6ZV2X61Cn5EkkRX';
  };
  let url;
  buttons.on('click', '.btn', function() {
    const query = this.dataset.topic;
    url = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=10&api_key=${api_key()}`;
    console.log(url);
    getGifs();
  });
})();
