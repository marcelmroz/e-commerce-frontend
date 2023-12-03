import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // State to manage the product being edited

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {
      name: formData.get('name'),
      // Include other product fields here
    };
    saveProduct(productData, editingProduct?.id);
    setEditingProduct(null); // Reset editing product
    event.target.reset(); // Reset form
  };

  // Add or update a product
  const saveProduct = (product, id) => {
    const method = id ? 'PUT' : 'POST';
    const url = `http://localhost:8080/api/products${id ? `/${id}` : ''}`;

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(updatedProduct => {
        if (!id) {
          setProducts([...products, updatedProduct]);
        } else {
          setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
        }
      })
      .catch(error => console.error('Error saving product:', error));
  };

  // Delete a product
  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  // Function to initiate editing a product
  const startEdit = (product) => {
    setEditingProduct(product);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Product Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          defaultValue={editingProduct?.name || ''}
          placeholder="Product Name"
          required
        />
        {/* Add more input fields for product details here */}
        <button type="submit">Save Product</button>
      </form>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            {/* Display more product details here */}
            <button onClick={() => startEdit(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
