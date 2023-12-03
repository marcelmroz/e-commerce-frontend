import React, { useState, useEffect } from 'react';
import '../styles/ProductManagement.css';


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
    <div className="product-management">
      <h1 className='title-center'>Product Management</h1>
      <h2 className='title-center'>Add a product:</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          defaultValue={editingProduct?.name || ''}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="price"
          defaultValue={editingProduct?.name || ''}
          placeholder="Price"
          required
        />
        <button type="submit">Save Product</button>
      </form>
      <h2 className='title-center'>Modify existing products:</h2>
      <div className="product-list">
        {products.map(product => (
        <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <h3>${product.price}</h3>
            <h3>{product.description}</h3>
            <button onClick={() => startEdit(product)}>Edit</button>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
