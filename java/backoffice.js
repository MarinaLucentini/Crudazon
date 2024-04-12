const form = document.querySelector("form");
const btnReset = document.getElementById("btnReset");
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";

const createNewProduct = (event) => {
  event.preventDefault();
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
    method: "POST",
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

const resetForm = () => {
  form.reset();
};
btnReset.addEventListener("click", resetForm);

window.addEventListener("DOMContentLoaded", () => {
  if (id) {
    const title = document.getElementById("newOrMod");
    title.innerText = "Modifica prodotto";
    form.addEventListener(
      "submit",
      fetch(URL, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZjYwYTdmMzA0NjAwMWFlNTlmYTEiLCJpYXQiOjE3MTI5MTE4ODIsImV4cCI6MTcxNDEyMTQ4Mn0.N1HwU5D3A4Ct3zgtwCEWlWzKHKjAauQfHbbMNuenJ4U",
        },
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw new Error("Errore nella fetch");
          }
        })
        .then((productToMod) => {
          const { name, description, price, imageUrl, brand } = productToMod;
          document.getElementById("nameProduct").value = name;
          document.getElementById("descriptionProduct").value = description;
          document.getElementById("brandProduct").value = brand;
          document.getElementById("imageProduct").value = imageUrl;
          document.getElementById("priceProduct").value = price;
        })
        .catch((err) => console.log(err))
    );
  } else {
    const title = document.getElementById("newOrMod");
    title.innerText = "Crea un nuovo prodotto";
    form.addEventListener("submit", createNewProduct);
  }
});
