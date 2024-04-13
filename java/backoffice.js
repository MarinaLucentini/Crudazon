const form = document.querySelector("form");
const btnReset = document.getElementById("btnReset");
const params = new URLSearchParams(window.location.search);
const id = params.get("productId");
const URL = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";
const paperino = id ? "PUT" : "POST";

const createNewProduct = (event) => {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("nameProduct").value,
    description: document.getElementById("descriptionProduct").value,
    brand: document.getElementById("brandProduct").value,
    imageUrl: document.getElementById("imageProduct").value,
    price: parseInt(document.getElementById("priceProduct").value),
  };

  fetch(URL, {
    method: paperino,
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
        if (response.status === 400) {
          throw new Error("Errore nella richiesta");
        }
        if (response.status === 401) {
          throw new Error("Richiesta non autorizzata");
        }
        if (response.status === 403) {
          throw new Error("Vietato l'accesso");
        }
        if (response.status === 404) {
          throw new Error("Prodotto non trovato");
        }
        if (response.status === 500) {
          throw new Error("Errore nel server");
        }
        throw new Error("Errore nella fetch");
      }
    })
    .then((createdProduct) => {
      console.log(createdProduct);
      if (id) {
        const messageAlert = document.getElementById("messageAlert");
        const textAlert = document.getElementById("textAlert");
        textAlert.innerText = "Prodotto modificato con successo!!";
        messageAlert.classList.remove("d-none");
        form.classList.add("d-none");

        event.target.reset();
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 1000);
      } else {
        const messageAlert = document.getElementById("messageAlert");
        const textAlert = document.getElementById("textAlert");
        textAlert.innerText = "Prodotto inserito con successo!!";
        messageAlert.classList.remove("d-none");
        form.classList.add("d-none");

        event.target.reset();
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 1000);
      }
    })
    .catch((err) => {
      const messageAlert = document.getElementById("messageAlert");
      messageAlert.innerText = err;
      messageAlert.classList.remove("d-none");
      form.classList.add("d-none");
    });
};

const resetForm = () => {
  const messageAlert = document.getElementById("messageAlert");
  const bgAlert = document.getElementById("bgAlert");
  const textAlert = document.getElementById("textAlert");
  bgAlert.classList.remove("alert-success");
  bgAlert.classList.add("alert-danger");
  textAlert.innerText = "Sei sicuro di voler resettare il form?";
  const btnConfirmed = document.createElement("button");
  btnConfirmed.classList.add("btn", "btn-outline-success", "mx-3");
  btnConfirmed.innerText = "Si";
  const btnNotConfirmed = document.createElement("button");
  btnNotConfirmed.classList.add("btn", "btn-outline-warning");
  btnNotConfirmed.innerText = "No";
  textAlert.append(btnConfirmed, btnNotConfirmed);
  form.classList.add("d-none");
  messageAlert.classList.remove("d-none");
  btnConfirmed.addEventListener("click", () => {
    form.reset();
    messageAlert.classList.add("d-none");
    form.classList.remove("d-none");
    setTimeout(() => {
      window.location.assign("./index.html");
    }, 1000);
  });
  btnNotConfirmed.addEventListener("click", () => {
    messageAlert.classList.add("d-none");
    form.classList.remove("d-none");
  });
};
btnReset.addEventListener("click", resetForm);

window.addEventListener("DOMContentLoaded", () => {
  const loading = document.querySelector(".spinner-border");
  loading.classList.add("d-none");
  form.addEventListener("submit", createNewProduct);
  if (id) {
    const title = document.getElementById("newOrMod");
    title.innerText = "Modifica prodotto";
    const btnsubmit = document.getElementById("btnSubmit");
    btnsubmit.innerText = "Modifica prodotto";
    btnsubmit.classList.add("btn-outline-warning");
    btnsubmit.classList.remove("btn-outline-success");
    const btnDelete = document.getElementById("deleteProduct");
    btnDelete.classList.remove("d-none");
    fetch(URL, {
      method: paperino,

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
          if (response.status === 400) {
            throw new Error("Errore nella richiesta");
          }
          if (response.status === 401) {
            throw new Error("Richiesta non autorizzata");
          }
          if (response.status === 403) {
            throw new Error("Vietato l'accesso");
          }
          if (response.status === 404) {
            throw new Error("Prodotto non trovato");
          }
          if (response.status === 500) {
            throw new Error("Errore nel server");
          }
          throw new Error("Errore nella fetch");
        }
      })
      .then((productToMod) => {
        console.log(productToMod);
        const { name, description, price, imageUrl, brand } = productToMod;
        document.getElementById("nameProduct").value = name;
        document.getElementById("descriptionProduct").value = description;
        document.getElementById("brandProduct").value = brand;
        document.getElementById("imageProduct").value = imageUrl;
        document.getElementById("priceProduct").value = price;
        console.log(productToMod);
      })
      .catch((err) => {
        const messageAlert = document.getElementById("messageAlert");
        messageAlert.innerText = err;
        messageAlert.classList.remove("d-none");
        form.classList.add("d-none");
      });
  } else {
    const title = document.getElementById("newOrMod");
    title.innerText = "Crea un nuovo prodotto";
  }
  const btnDelete = document.getElementById("deleteProduct");
  const hasConfirmed = () => {
    const messageAlert = document.getElementById("messageAlert");
    const bgAlert = document.getElementById("bgAlert");
    const textAlert = document.getElementById("textAlert");
    bgAlert.classList.remove("alert-success");
    bgAlert.classList.add("alert-danger");
    textAlert.innerText = "Sei sicuro di voler eliminare il prodotto?";
    const btnConfirmed = document.createElement("button");
    btnConfirmed.classList.add("btn", "btn-outline-success", "mx-3");
    btnConfirmed.innerText = "Si";
    const btnNotConfirmed = document.createElement("button");
    btnNotConfirmed.classList.add("btn", "btn-outline-warning");
    btnNotConfirmed.innerText = "No";
    textAlert.append(btnConfirmed, btnNotConfirmed);
    form.classList.add("d-none");
    messageAlert.classList.remove("d-none");
    btnConfirmed.addEventListener("click", () => {
      deleteProduct();
      messageAlert.classList.add("d-none");
      form.classList.remove("d-none");
    });
    btnNotConfirmed.addEventListener("click", () => {
      messageAlert.classList.add("d-none");
      form.classList.remove("d-none");
    });
  };
  const deleteProduct = () => {
    fetch(URL, {
      method: "DELETE",
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
          if (response.status === 400) {
            throw new Error("Errore nella richiesta");
          }
          if (response.status === 401) {
            throw new Error("Richiesta non autorizzata");
          }
          if (response.status === 403) {
            throw new Error("Vietato l'accesso");
          }
          if (response.status === 404) {
            throw new Error("Prodotto non trovato");
          }
          if (response.status === 500) {
            throw new Error("Errore nel server");
          }
          throw new Error("Errore nella fetch");
        }
      })
      .then(() => {
        const messageAlert = document.getElementById("messageAlert");
        messageAlert.innerText = "Prodotto eliminato con successo!!";
        messageAlert.classList.remove("d-none");
        form.classList.add("d-none");

        setTimeout(() => {
          window.location.assign("./index.html");
        }, 1000);
      })
      .catch((err) => {
        const messageAlert = document.getElementById("messageAlert");
        messageAlert.innerText = err;
        messageAlert.classList.remove("d-none");
        form.classList.add("d-none");
      });
  };
  btnDelete.addEventListener("click", hasConfirmed);
});
