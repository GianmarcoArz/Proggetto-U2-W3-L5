const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmFkMzc5YzQ1ZjAwMTU2OWI0YzgiLCJpYXQiOjE3Mjc0MjUyMzUsImV4cCI6MTcyODYzNDgzNX0.ec5ObHnpvnzsEzIrQcEG3pxdlEej96SbQHb1Y4rEJoY";

function caricamentoProdotti() {
  fetch(apiURL, {
    headers: {
      Authorization: key,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      console.log(products);

      products.forEach((product) => {
        const productList = document.getElementById("productList");

        const colonna = document.createElement("div");
        colonna.classList.add("col", "col-xl-4", "mb-4", "d-flex");

        const productCard = document.createElement("div");
        productCard.classList.add("card", "h-100", "border-dark", "w-100");

        productCard.innerHTML = `
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 200px;">
              <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <h5 class="card-title">${product.brand}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text"><strong>Prezzo:</strong> ${product.price}€</p>
              </div>
              <div class="card-footer">
                  <a href="./dettagli.html?id=${product._id}" class="btn btn-info">Visualizza Dettagli</a>
                  <a href="./backoffice.html?id=${product._id}" class="btn btn-warning">Modifica</a>
              </div>`;

        productList.appendChild(colonna);
        colonna.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Errore nel caricamento dei prodotti:", error);
    });
}

caricamentoProdotti();
