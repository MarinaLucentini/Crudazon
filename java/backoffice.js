const form = document.querySelector("form");
const btnReset = document.getElementById("btnReset");
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = id ? "PUT" : "POST";

const createNewProduct = (event) => {
  const newProduct = {
    name: document.getElementById("nameProduct").value,
    description: document.getElementById("descriptionProduct").value,
    brand: document.getElementById("brandProduct").value,
    imageUrl: document.getElementById("imageProduct").value,
    price: parseInt(document.getElementById("priceProduct").value),
  };
  form.reset();
  console.log(newProduct);
  fetch(URL, {
    method: method,
    body: JSON.stringify(newProduct),
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
    .then((createdProduct) => {
      console.log(createdProduct);
    })
    .catch((err) => console.log(err));
};
const modificateProduct = (event) => {
  event.preventDefault();
  const titleForm = document.getElementById("newOrMod");
  titleForm.innerText = id ? "Modifica prodotto" : "Aggiungi nuovo prodotto";
  const modificaProdotto = {
    name: document.getElementById("nameProduct").value,
    description: document.getElementById("descriptionProduct").value,
    brand: document.getElementById("brandProduct").value,
    imageUrl: document.getElementById("imageProduct").value,
    price: parseInt(document.getElementById("priceProduct").value),
  };
  form.reset();
};
const resetForm = () => {
  form.reset();
};
btnReset.addEventListener("click", resetForm);

window.addEventListener("DOMContentLoaded", () => {
  createNewProduct();
  form.addEventListener("submit", createNewProduct);
});
