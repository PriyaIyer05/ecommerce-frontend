document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const searchInput = document.getElementById('searchInput');

  fetch('products.json')
    .then(res => res.json())
    .then(data => {
      const urlParams = new URLSearchParams(window.location.search);
      const selectedCategory = urlParams.get('category');
      let productsToShow = data;

      if (selectedCategory) {
        productsToShow = data.filter(product => product.category === selectedCategory);
      }

      function displayProducts(products) {
        productList.innerHTML = '';

        if (products.length === 0) {
          productList.innerHTML = '<p>No products found.</p>';
          return;
        }

        products.forEach(product => {
          const card = document.createElement('div');
          card.classList.add('product-card');
          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-btn">Add to Cart</button>
          `;
          productList.appendChild(card);
        });
      }

      displayProducts(productsToShow);

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase();
          const filtered = productsToShow.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          );
          displayProducts(filtered);
        });
      }
    })
    .catch(err => {
      console.error('Error loading products:', err);
      productList.innerHTML = '<p>Error loading products.</p>';
    });
});
