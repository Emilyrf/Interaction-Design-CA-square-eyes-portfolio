//BANNER-FORM VALIDATION
const email = document.getElementById("email");
const banner = document.querySelector(".banner-container")
const form = document.getElementById("form")
form.addEventListener('submit', (e) => {
  checkInputs();
  e.preventDefault();
});

function checkInputs() {
  const emailValue = email.value;

  if (emailValue === "") {
    setErrorFor(email, "Email is required.");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Please insert a valid email.");
  } else {
    setSuccessFor(email);

  }
  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className == "form-control success";
  });

  if (formIsValid) {
    banner.innerHTML = `<h1>You are in!</h1>
    <span class="cen"> Thank you for joining our community.<br> We will send you an email with <b>the discount code!</b></span>`

  } else {
    console.log("Form is invalid");
  }

}
function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  alert(message);
  formControl.className = "form-control error";
};

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}


//REQUESTING API
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'api_key=2f4a48866ae68cfd8cf4b5e25a04575b';
const API_URL = BASE_URL + '/discover/movie?' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

const moviesContainer = document.querySelector(".movies-container");

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const tagsEl = document.getElementById("tags")


fetchMovies(API_URL);

function fetchMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    if (data.results.length != 0) {
      displayMovies(data.results);
    } else {
      moviesContainer.innerHTML = '<h2>No movies found!</h2>'
    }

  })
}

function displayMovies(data) {
  moviesContainer.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, vote_average } = movie;
    moviesContainer.innerHTML += ` <div class="movie"> 
        <a href="details.html?id=${movie.id}" class="movie-click">
        <img src="${poster_path ? IMG_URL + poster_path : src = "assets/missingPoster.png"}"  alt="${title}">
        <span class="movietitle">${title} </span>
        <span class="vote"><i class="fa-solid fa-star"></i> ${vote_average}</span>
        </a>
       </div>`;
  });
}


var selectedGenre = []
setGenreTag();
function setGenreTag() {
  tagsEl.innerHTML = '';
  genres.forEach(genre => {
    const tag = document.createElement('div');
    tag.classList.add('tag');
    tag.id = genre.id;
    tag.innerText = genre.name;
    tag.addEventListener('click', () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          })
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre)
      fetchMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
      highlightSelectedTag()
    })
    tagsEl.append(tag);
  })
};

function highlightSelectedTag() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlighted')
  })
  clearBtn();
  if (selectedGenre.length != 0) {
    selectedGenre.forEach(id => {
      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add('highlighted')
    })
  }
};

function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if(clearBtn) {
    clearBtn.classList.add('highlighted')
  } else {
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlighted');
    clear.id = 'clear';
    clear.innerText = 'Clear selection x';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenreTag();            
      fetchMovies(API_URL);
  })
    tagsEl.append(clear);
  }
}
