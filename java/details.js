const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
const createCardSingleProducts = (
  img,
  name,
  description,
  price,
  brand,
  idProducts
) => {
  const imageProduct = document.getElementById("imageProduct");
  const nameProduct = document.getElementById("nameProduct");
  const descriptionProduct = document.getElementById("descriptionProduct");
  const priceProduct = document.getElementById("priceProduct");
  const nameBrand = document.getElementById("brand");
  const idProduct = document.getElementById("idProduct");
  const loading = document.querySelector(".spinner-border");
  loading.classList.add("d-none");
  imageProduct.src = img;
  nameProduct.innerText = name;
  descriptionProduct.innerText = description;
  priceProduct.innerText = price + "€";
  nameBrand.innerText = "Prodotto da: " + brand + " ";
  idProduct.innerText = "Codice prodotto " + idProducts;
};

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",

      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjYwYTdmMzA0NjAwMWFlNTlmYTEiLCJpYXQiOjE3MTI5MTE4ODIsImV4cCI6MTcxNDEyMTQ4Mn0.N1HwU5D3A4Ct3zgtwCEWlWzKHKjAauQfHbbMNuenJ4U",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then((product) => {
      const { name, description, price, imageUrl, brand, _id } = product;
      createCardSingleProducts(imageUrl, name, description, price, brand, _id);
    })
    .catch((err) => console.log(err));
});
