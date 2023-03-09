const API_KEY = '?api_key=2f4a48866ae68cfd8cf4b5e25a04575b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500/'

const detailsContainer = document.querySelector(".product-description");
const totalContainer = document.getElementsByClassName("price")[0];
let totalCart = 0;

async function fetchDetails(id) {

    const fetchMovies = `${BASE_URL}/movie/${id}${API_KEY}`;

    try {
        const response = await fetch(fetchMovies);
        const details = await response.json();

        console.log(details);


        detailsContainer.innerHTML += `<ul class="details">
        <img src="${IMG_URL}${details.poster_path}" alt="${details.title}"/>
        <li class="prodname">${details.title}<br>#${details.id}</li>
        <li class="price">${(details.runtime).toLocaleString("no-NO", {
            currency: "NOK",
            style: "currency",
            minimumFractionDigits: 2,
        })}</li>
        <li onclick="removeMovie(${details.id})" class="fa-solid fa-trash-can"></li>
      </ul>`;
        totalCart += details.runtime

        totalContainer.innerHTML = (totalCart).toLocaleString("no-NO", {
            currency: "NOK",
            style: "currency",
            minimumFractionDigits: 2,
        })


    } catch (error) {
        console.log(error);
        detailsContainer.innerHTML += `<div class="message-error"><h2>API not found!</h2></div>`;
    };
}

let cart = [];
const getCart = JSON.parse(localStorage.getItem("cart"));

if (getCart == null || !getCart.length) {
    detailsContainer.innerHTML = `<h2>Your cart is empty!</h2>`

} else {
    cart = JSON.parse(localStorage.getItem("cart"))
}
console.log(getCart);

cart.forEach(movie => {
    fetchDetails(movie)
});

function removeMovie(id) {
    const index = cart.indexOf(String(id));

    cart.splice(index, 1)

    localStorage.setItem("cart", JSON.stringify(cart))
    location.reload()
};
