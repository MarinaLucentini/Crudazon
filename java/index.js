const URL = "https:striveschool-api.herokuapp.com/api/product/";
const chart = [];
const createCard = (
  imageProduct,
  nameProducts,
  priceProducts,
  productsId,
  brand
) => {
  const row = document.getElementById("rowCard");
  const col = document.createElement("div");
  col.classList.add("col");
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.height = "400px";
  const imgProduct = document.createElement("img");
  imgProduct.classList.add("card-img-top", "object-fit-cover", "h-50");
  const containerText = document.createElement("div");
  const loading = document.querySelector(".spinner-border");
  loading.classList.add("d-none");
  containerText.classList.add(
    "card-body",
    "h-100",
    "d-flex",
    "flex-column",
    "justify-content-end",
    "align-items-end"
  );
  const nameProduct = document.createElement("h6");
  nameProduct.classList.add("card-title", "d-inline-block");
  const brandProduct = document.createElement("p");
  brandProduct.classList.add("card-text");
  const priceProduct = document.createElement("h2");
  priceProduct.classList.add(
    "card-text",
    "mx-3",
    "rounded-3",
    "text-bg-secondary",
    "px-3"
  );
  const btnContainer = document.createElement("div");
  const containerTitle = document.createElement("div");
  containerTitle.classList.add("d-flex", "align-items-center", "w-100");
  btnContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "flex-column",
    "flex-xl-row",
    "w-100"
  );

  const btnMoreInfo = document.createElement("a");
  btnMoreInfo.classList.add("btn", "btn-outline-secondary");
  btnMoreInfo.innerText = "Scopri di più";
  const btnModified = document.createElement("a");
  btnModified.classList.add("btn", "btn-outline-warning", "d-none");
  btnModified.innerText = "Modifica";
  btnMoreInfo.href = `./details.html?productId=${productsId}`;
  btnModified.href = `./backoffice.html?productId=${productsId}`;

  row.appendChild(col);
  col.appendChild(card);
  card.append(imgProduct, containerText);
  containerText.append(
    priceProduct,
    containerTitle,
    brandProduct,
    btnContainer
  );
  containerTitle.append(nameProduct);
  btnContainer.append(btnMoreInfo, btnModified);
  imgProduct.src = imageProduct;
  nameProduct.innerText = nameProducts;
  brandProduct.innerText = brand;
  priceProduct.innerText = priceProducts + "€";
};
const form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const passwordAdmin = document.getElementById("passwordAdmin");
  const linkBOffice = document.getElementById("linkBOffice");
  const modal = document.getElementById("exampleModal");
  const btnModified = document.querySelectorAll(".btn-outline-warning");
  const userShopper = document.getElementById("userShopper");
  const userAdmin = document.getElementById("userAdmin");
  if (passwordAdmin.value === "montagna") {
    btnModified.forEach((buttons) => {
      buttons.classList.remove("d-none");
    });
    linkBOffice.classList.remove("d-none");
    modal.classList.add("d-none");
    userAdmin.classList.remove("d-none");
    userShopper.classList.add("d-none");
  }
});
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

          products._id,
          products.brand
        );
      });
    })
    .catch((err) => console.log(err));
};
window.addEventListener("DOMContentLoaded", () => {
  productSaved();
  const productSavedInTheChart = localStorage.getItem(
    "Prodotto-aggiunto-al-carrello"
  );
  if (productSavedInTheChart) {
    const carrello = JSON.parse(productSavedInTheChart);
    carrello.forEach((products) => {
      chart.push(products);
    });
    const deleteProductsFunction = (event) => {
      const deleteProduct = event.currentTarget;

      const indexOfChart = chart.findIndex(
        (oggetto) => oggetto.name === deleteProduct.attributes.nameproduct.value
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

      singleEl.classList.add("list-group-item", "d-flex", "align-items-center");
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
      // const total = document.createElement("div");
      // const titleTotal = document.createElement("h2");
      // let priceTotal = document.createElement("h3");
      // total.append(titleTotal, priceTotal);
      // titleTotal.innerText = "Totale";

      // listChart.appendChild(total);
    });
  } else {
    const listChart = document.getElementById("listChart");
    const singleEl = document.createElement("li");
    listChart.appendChild(singleEl);
    singleEl.innerText = "Nessun prodotto trovato";
  }
});
