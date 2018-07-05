(function() {
  const buttons = $('#buttons');
  let topics = [
    'dog',
    'cat',
    'car',
    'happy',
    'adventure',
    'hiking',
    'funny',
    'biking',
    'music',
    'technology'
  ];
  let favorites = [];
  let firstFavAdded = false;
  const gifs = $('#gifs');
  let newTopic;
  let storedTopics;
  function renderButtons() {
    buttons.empty();
    storedTopics = JSON.parse(localStorage.getItem('storedTopics'));
    if (storedTopics) {
      topics = storedTopics;
    }

    $('#buttons')
      .prepend(
        `<button class="favorites btn d-none btn-outline-success m-md-2 my-2 mr-3">Favorites</button>`
      )
      .attr('class', 'm-2');

    if (favorites.length) {
      $('.btn.favorites').addClass('d-inline-block');
    } else {
      $('.btn.favorites').removeClass('d-inline-block');
    }

    $.each(topics, function(index, topic) {
      let data = topic.replace(' ', '+');
      $('#buttons')
        .append(
          `<button class="topic btn btn-outline-primary m-md-2 my-2 mr-3" data-topic=${data}>${topic}</button>`
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
          gifs.prepend(`<div class="card img d-inline-block m-3">
              <div class="card-body py-1 bg-light">
                <p class="card-text rating text-center">Rated ${rating}</p>
              </div>
                <i class="fas fa-check isUnchecked"></i>
                <img src=${srcStill} class="card-img-bottom img" data-still=${srcStill} data-animated=${srcAnimated} data-state='still'> 
                <i class="fas fa-times"></i>
             </div>`);
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
    } else {
      $this.data('state', 'still');
      $this.attr('src', $this.data('still'));
    }
  });

  gifs.on('mouseover', 'div.img', function() {
    $(this)
      .find('.fas')
      .addClass('d-block');
  });
  gifs.on('mouseout', 'div.img', function() {
    $(this)
      .find('.fas')
      .removeClass('d-block');
  });

  gifs.on('click', '.fa-times', function(e) {
    e.stopPropagation();
    $(this)
      .parent()
      .removeClass('d-inline-block')
      .addClass('d-none');
  });

  gifs.on('click', '.fa-check', function(e) {
    e.stopPropagation();
    let $this = $(this);
    $this.toggleClass('isChecked isUnchecked');

    if ($this.hasClass('isChecked')) {
      console.log($this.next()[0]);
      favorites.push($this.next()[0]);
    } else {
      favorites.splice(favorites.indexOf($this.next()[0]), 1);
    }
    console.log(favorites);
    if (!firstFavAdded) {
      firstFavAdded = true;
      renderButtons();
    } else {
      firstFavAdded = false;
      renderButtons();
    }
    console.log('favorites: ', favorites);
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
  buttons.on('click', '.btn.topic', function() {
    const query = $(this).data('topic');
    url = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=10&api_key=${api_key()}`;
    getGifs();
  });
})();
