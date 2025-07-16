document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const searchInput = document.getElementById('searchInput');

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      const categoryFromStorage = localStorage.getItem("selectedCategory");
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get("search");

      let filteredProducts = data;

      if (categoryFromStorage) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFromStorage);
      }

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(q));
      }

      displayProducts(filteredProducts);

      if (searchInput) {
        searchInput.value = searchQuery || '';
        searchInput.addEventListener("input", () => {
          const keyword = searchInput.value.toLowerCase();
          const matched = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(keyword)
          );
          displayProducts(matched);
        });
      }

      // Clear category after loading once
      localStorage.removeItem("selectedCategory");
    })
    .catch(err => {
      console.error('Error loading products:', err);
      productList.innerHTML = '<p>Unable to load products.</p>';
    });

  function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = '<p>No products found.</p>';
      return;
    }

    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="add-btn">Add to Cart</button>
      `;
      productList.appendChild(div);
    });
  }
});
