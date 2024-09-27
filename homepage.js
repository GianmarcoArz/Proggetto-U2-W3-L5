const apiURL = "https://striveschool-api.herokuapp.com/api/product/";
const key =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NmFkMzc5YzQ1ZjAwMTU2OWI0YzgiLCJpYXQiOjE3Mjc0MjUyMzUsImV4cCI6MTcyODYzNDgzNX0.ec5ObHnpvnzsEzIrQcEG3pxdlEej96SbQHb1Y4rEJoY";

// SPERO DI NON ESSERE OFFENSIVO CON QUESTA PASS MA : SEI UN GRANDFE INSEGNATE, E DI QUESTO TI RINGRAZIONE
// E' IN PIU' OCCASIONI E STATO DIVERTENTISSIMO.
// SE QUALCUN'ALTRO LEGGERA QUESTO COMPITO NON E COLPA SUA E FIN TROPPO EDUCATO
const passwordDel = "belsedere";

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
                  <button class="btn btn-danger elimina-btn" data-id="${product._id}">Elimina</button>
              </div>`;

        productList.appendChild(colonna);
        colonna.appendChild(productCard);

        const eliminaBtn = productCard.querySelector(".elimina-btn");
        eliminaBtn.addEventListener("click", function () {
          const productId = this.getAttribute("data-id");
          richiediPasswordEElimina(productId, colonna);
        });
      });
    })
    .catch((error) => {
      console.error("Errore nel caricamento dei prodotti:", error);
    });
}

function richiediPasswordEElimina(productId, colonna) {
  const passwordInserita = prompt(
    "Inserisci la password per eliminare il prodotto:"
  );

  if (passwordInserita === passwordDel) {
    eliminaProdotto(productId, colonna);
  } else {
    alert("Password errata. Il prodotto non è stato eliminato.");
  }
}

function eliminaProdotto(productId, colonna) {
  const conferma = confirm("Sei sicuro di voler eliminare questo prodotto?");
  if (conferma) {
    fetch(apiURL + productId, {
      method: "DELETE",
      headers: {
        Authorization: key,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del prodotto");
        }
        alert("Prodotto eliminato con successo!");
        colonna.remove();
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione:", error);
      });
  }
}

caricamentoProdotti();
