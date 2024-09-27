const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmFkMzc5YzQ1ZjAwMTU2OWI0YzgiLCJpYXQiOjE3Mjc0MjUyMzUsImV4cCI6MTcyODYzNDgzNX0.ec5ObHnpvnzsEzIrQcEG3pxdlEej96SbQHb1Y4rEJoY";

const form = document.getElementById("productForm");

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function loadProductDetail(productId) {
  fetch(apiURL + productId, {
    headers: { Authorization: key },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Errore nella risposta del server");
      }
      return response.json();
    })
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch((error) => {
      console.error("Errore nel caricamento del prodotto:", error);
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: document.getElementById("price").value,
  };

  const productId = getProductId();

  if (productId) {
    fetch(apiURL + productId, {
      method: "PUT",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella modifica del prodotto");
        }
        return response.json();
      })
      .then((data) => {
        alert("Prodotto modificato con successo!");
        form.reset();
        window.location.href = "./homepage.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella creazione del prodotto");
        }
        return response.json();
      })
      .then((data) => {
        alert("Prodotto creato con successo!");
        form.reset();
        window.location.href = "homepage.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

const productId = getProductId();
if (productId) {
  loadProductDetail(productId);
}
