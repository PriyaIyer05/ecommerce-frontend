document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("products-grid");

  // Get category from URL if passed (e.g., products.html?category=Ice%20Cream)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get("category");

  fetch("products.json")
    .then((response) => response.json())
    .then((products) => {
      if (categoryFilter) {
        products = products.filter(
          (product) =>
            product.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      if (products.length === 0) {
        productGrid.innerHTML = `<p>No products found for "${categoryFilter}".</p>`;
        return;
      }

      productGrid.innerHTML = products
        .map((product) => {
          return `
            <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p class="price">₹${product.price}</p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Error loading products:", error);
      productGrid.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    });

  // Mobile Nav Toggle
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");
  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });
});
