(function() {
  const buttons = $('#buttons');
  let topics = [
    'dog',
    'car',
    'happy',
    'turtle',
    'sad',
    'adventure',
    'hiking',
    'biking',
    'music',
    'technology'
  ];
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
          `<button class="btn btn-outline-primary m-md-2 my-2 mr-3" data-topic=${data}>${topic}</button>`
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
    let srcAnimated;
    let rating;
    $.get(url)
      .then(res => {
        $.each(res.data, function(index) {
          srcStill = res.data[index].images.fixed_height_still.url;
          srcAnimated = res.data[index].images.fixed_height.url;
          rating = res.data[index].rating.toUpperCase();
          console.log('Rating: ', rating);
          gifs.prepend(
            // `<div class='img d-inline-block'>
            //   <p class="rating">Rating: ${rating}</p>
            //   <img src=${srcStill} class="img m-3" data-still=${srcStill} data-animated=${srcAnimated} data-state='still'>
            //   <i class="fas fa-times"></i>
            // </div>`
            `<div class="card img d-inline-block m-3">
              <div class="card-body py-1 bg-light">
                <p class="card-text rating text-center">Rating: ${rating}</p>
              </div>
                <img src=${srcStill} class="card-img-bottom img" data-still=${srcStill} data-animated=${srcAnimated} data-state='still'>
                 <i class="fas fa-times"></i>
             </div>`
          );
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  gifs.on('click', '.img', function() {
    let $this = $(this);
    if ($this.data('state') === 'still') {
      $this.data('state', 'animated');
      $this.attr('src', $this.data('animated'));
      console.log('state: ', $this.data('state'));
      console.log('src: ', $this.attr('src'));
    } else {
      $this.data('state', 'still');
      $this.attr('src', $this.data('still'));
      console.log('state:', $this.data('state'));
      console.log('src: ', $this.attr('src'));
    }
  });

  gifs.on('mouseover', 'div.img', function() {
    $(this)
      .find('i')
      .addClass('isShowing');
  });
  gifs.on('mouseout', 'div.img', function() {
    $(this)
      .find('i')
      .removeClass('isShowing');
  });

  gifs.on('click', 'i', function(e) {
    e.stopPropagation();
    $(this)
      .parent()
      .removeClass('d-inline-block')
      .addClass('d-none');
    console.log($(this).parent());
  });

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
    getGifs();
  });
})();
