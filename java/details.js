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
const chart = [];
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
      const btnAddTochart = document.getElementById("addToChart");
      btnAddTochart.addEventListener("click", () => {
        chart.push(product);
        localStorage.setItem(
          "Prodotto-aggiunto-al-carrello",
          JSON.stringify(chart)
        );
        const messageAlert = document.getElementById("messageAlert");
        const textAlert = document.getElementById("textAlert");
        const card = document.getElementById("card");
        messageAlert.classList.remove("d-none");
        textAlert.innerText = "Prodotto aggiunto al carrello con successo!";
        card.classList.add("d-none");
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 1000);
      });
      const productSavedInTheChart = localStorage.getItem(
        "Prodotto-aggiunto-al-carrello"
      );
      console.log(productSavedInTheChart);
      if (productSavedInTheChart) {
        const carrello = JSON.parse(productSavedInTheChart);
        carrello.forEach((products) => {
          chart.push(products);
        });
        const deleteProductsFunction = (event) => {
          const deleteProduct = event.currentTarget;

          const indexOfChart = chart.findIndex(
            (oggetto) =>
              oggetto.name === deleteProduct.attributes.nameproduct.value
          );
          if (indexOfChart !== -1) {
            chart.splice(indexOfChart, 1);

            if (chart === 0) {
              localStorage.removeItem("Prodotto-aggiunto-al-carrello");
            } else {
              localStorage.setItem(
                "Prodotto-aggiunto-al-carrello",
                JSON.stringify(chart)
              );
            }
            deleteProduct.parentNode.remove();
          }

          // console.log(chart);
        };
        chart.forEach((product) => {
          const listChart = document.getElementById("listChart");
          const singleEl = document.createElement("li");

          singleEl.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center"
          );
          const containerImg = document.createElement("div");
          const image = document.createElement("img");
          const price = document.createElement("h4");
          const nameProduct = document.createElement("h3");
          const deleteProducts = document.createElement("button");
          deleteProducts.classList.add("btn", "btn-outline-danger", "mx-3");
          deleteProducts.innerHTML = `<i class="bi bi-trash3"></i>`;
          deleteProducts.setAttribute("nameproduct", product.name);
          nameProduct.classList.add("mx-3");
          containerImg.classList.add("w-25");
          image.classList.add("img-fluid");
          listChart.appendChild(singleEl);
          containerImg.appendChild(image);
          singleEl.append(containerImg, nameProduct, price, deleteProducts);
          image.src = product.imageUrl;
          nameProduct.innerText = product.name;
          price.innerText = product.price + "€";
          deleteProducts.addEventListener("click", deleteProductsFunction);
        });
      } else {
        const listChart = document.getElementById("listChart");
        const singleEl = document.createElement("li");
        listChart.appendChild(singleEl);
        singleEl.innerText = "Nessun prodotto trovato";
      }
      console.log(chart);
    })
    .catch((err) => console.log(err));
});
