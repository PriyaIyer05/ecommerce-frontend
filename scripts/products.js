document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const productHeading = document.getElementById('product-heading');

  // Get category from query parameter if exists
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFilter = urlParams.get('category');

  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then(products => {
      if (categoryFilter) {
        products = products.filter(product => product.category === categoryFilter);
        productHeading.textContent = categoryFilter;
      }

      if (products.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
      }

      productList.innerHTML = '';

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
          <button class="add-to-cart-btn">Add to Cart</button>
        `;

        productList.appendChild(productCard);
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
      productList.innerHTML = "<p>Error loading products.</p>";
    });
});
