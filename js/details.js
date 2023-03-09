const detailsContainer = document.querySelector(".details");
const imgContainer = document.querySelector(".img");
const priceContainer = document.querySelector(".price");


const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);


const API_KEY = '?api_key=2f4a48866ae68cfd8cf4b5e25a04575b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

const fetchMovies = `${BASE_URL}/movie/${id}${API_KEY}`;

async function fetchDetails() {
    try {
        const response = await fetch(fetchMovies);
        const details = await response.json();

        console.log(details);

        imgContainer.innerHTML += `<img src="${IMG_URL}${details.poster_path}" alt="${details.title}"/>`

        detailsContainer.innerHTML += `
                                       <h1>${details.title}</h1>
                                       <span class="release-date">Released date: ${details.release_date}</span>
                                       <span><p>${details.overview}<p></span>
                                       <div class="price">
                                       <h2>Price: ${(details.runtime).toLocaleString("no-NO", {
            currency: "NOK",
            style: "currency",
            minimumFractionDigits: 2,
        })}</h2></div>
                                       <button class="added" onclick="addCart()">ADD TO CART</button>                          
                                      `;

        document.title = details.title;


    } catch (error) {
        console.log(error);
        detailsContainer.innerHTML += `<div class="message-error"><h2>Movie not found!</h2></div>`;
    };
}
fetchDetails()


function addCart() {
    let cart = [];
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem("cart"))
    } else {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    let alreadyMovie = false;

    cart.forEach(el => {
        if (el == id) {
            alreadyMovie = true;
        }

    });
    if (alreadyMovie) {
        alert("This movie is already in the cart.")
    } else {
        cart.push(id)
        localStorage.setItem("cart", JSON.stringify(cart))
        document.getElementById("cartAmount").innerText = cart.length;
     alert("Movie added to the cart.")
    }
    console.log(cart);
};
