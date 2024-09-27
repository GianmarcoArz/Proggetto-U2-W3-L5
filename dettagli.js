const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmFkMzc5YzQ1ZjAwMTU2OWI0YzgiLCJpYXQiOjE3Mjc0MjUyMzUsImV4cCI6MTcyODYzNDgzNX0.ec5ObHnpvnzsEzIrQcEG3pxdlEej96SbQHb1Y4rEJoY";

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function caricaDettagliProdotto() {
  const productId = getProductId();
  if (productId) {
    fetch(apiURL + productId, {
      headers: {
        Authorization: key,
      },
    })
      .then((response) => response.json())
      .then((product) => {
        const dettagliProdotto = document.getElementById("dettagliProdotto");

        dettagliProdotto.innerHTML = `
            <div class="col-md-6">
              <img src="${product.imageUrl}" class="img-fluid border shadow-1g rounded" alt="${product.name}" style="width: 100%; height: auto;">
            </div>
            <div class="col-md-6 ">
              <h2>${product.name}</h2>
              <h3>${product.brand}</h3>
              <p>${product.description}</p>
              <p class="fs-1"><strong>Prezzo:</strong> ${product.price}€</p>
              <a href="#" class="btn btn-warning">ACQUISTA</a>
            </div>`;
      })
      .catch((error) => {
        console.error(
          "Errore nel caricamento dei dettagli del prodotto:",
          error
        );
      });
  } else {
    console.error("ID prodotto non trovato nell'URL");
  }
}

caricaDettagliProdotto();
