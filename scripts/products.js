fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('products-container');

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button>Add to Cart</button>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    document.getElementById('products-container').innerHTML = 'Error loading products.';
    console.error('Error:', error);
  });
