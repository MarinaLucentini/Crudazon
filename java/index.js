const URL = "https://striveschool-api.herokuapp.com/api/product/";

const createCard = (
  imageProduct,
  nameProducts,
  priceProducts,
  descriptionProducts,
  productsId
) => {
  const row = document.getElementById("rowCard");
  const col = document.createElement("div");
  col.classList.add("col");
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.height = "500px";
  const imgProduct = document.createElement("img");
  imgProduct.classList.add("card-img-top", "object-fit-cover", "h-25");
  const containerText = document.createElement("div");
  containerText.classList.add(
    "card-body",
    "h-100",
    "d-flex",
    "flex-column",
    "justify-content-end"
  );
  const nameProduct = document.createElement("h5");
  nameProduct.classList.add("card-title");
  const descriptionProduct = document.createElement("p");
  descriptionProduct.classList.add("card-text");
  const priceProduct = document.createElement("p");
  priceProduct.classList.add("card-text", "display-6");
  const btnContainer = document.createElement("div");
  btnContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "flex-column",
    "flex-xl-row"
  );

  const btnMoreInfo = document.createElement("a");
  btnMoreInfo.classList.add("btn", "btn-outline-secondary");
  btnMoreInfo.innerText = "Scopri di più";
  const btnModified = document.createElement("a");
  btnModified.classList.add("btn", "btn-outline-warning");
  btnModified.innerText = "Modifica";
  btnMoreInfo.href = `./details.html?productId=${productsId}`;
  btnModified.href = `./backoffice.html?productId=${productsId}`;

  row.appendChild(col);
  col.appendChild(card);
  card.append(imgProduct, containerText);
  containerText.append(
    nameProduct,
    descriptionProduct,
    priceProduct,
    btnContainer
  );
  btnContainer.append(btnMoreInfo, btnModified);
  imgProduct.src = imageProduct;
  nameProduct.innerText = nameProducts;
  descriptionProduct.innerText = descriptionProducts;
  priceProduct.innerText = priceProducts + "€";
};
const productSaved = () => {
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
    .then((savedProduct) => {
      console.log(savedProduct);
      savedProduct.forEach((products) => {
        createCard(
          products.imageUrl,
          products.name,
          products.price,
          products.description,
          products._id
        );
      });
    })
    .catch((err) => console.log(err));
};
window.addEventListener("DOMContentLoaded", () => {
  productSaved();
});
