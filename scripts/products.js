document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");

  fetch("products.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }
      return response.json();
    })
    .then(products => {
      products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="product-price">₹${product.price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        `;

        productsContainer.appendChild(productCard);
      });
    })
    .catch(error => {
      productsContainer.innerHTML = "<p>Error loading products.</p>";
      console.error("Error:", error);
    });
});
