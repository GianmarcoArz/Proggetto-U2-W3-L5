const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmFkMzc5YzQ1ZjAwMTU2OWI0YzgiLCJpYXQiOjE3Mjc0MjUyMzUsImV4cCI6MTcyODYzNDgzNX0.ec5ObHnpvnzsEzIrQcEG3pxdlEej96SbQHb1Y4rEJoY";

const form = document.getElementById("productForm");

// Funzione per ottenere l'ID del prodotto dalla query string
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Funzione per caricare i dettagli del prodotto da modificare
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
      // Popola il form con i dettagli del prodotto esistente
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

// Funzione per gestire la creazione o modifica del prodotto
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
    // Se esiste un productId, facciamo una PUT per modificare il prodotto
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
        window.location.href = "./homepage.html"; // Reindirizza alla homepage dopo la modifica
      })
      .catch((error) => {
        alert(error.message);
      });
  } else {
    // Se non esiste un productId, facciamo una POST per creare un nuovo prodotto
    fetch(apiURL, {
      method: "POST",
      headers: {
        Authorization: ley,
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
        window.location.href = "homepage.html"; // Reindirizza alla homepage dopo la creazione
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

// Se esiste un productId nella query string, carichiamo i dettagli del prodotto per la modifica
const productId = getProductId();
if (productId) {
  loadProductDetail(productId);
}
