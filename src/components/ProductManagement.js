import React, { useState, useEffect } from 'react';
import '../styles/ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      color: formData.get('color'),
      category: formData.get('category'),
      size: formData.get('size'),
      stockQuantity: formData.get('stockQuantity'),
    };
    saveProduct(productData, editingProduct?.id);
    setEditingProduct(null);
    event.target.reset();
  };

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

  const deleteProduct = (id) => {
    fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const startEdit = (product) => {
    setEditingProduct(product);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="product-management">
    <h1 className='title-center'>Product Management</h1>
    <div className='add-product'>
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
          type="number"
          name="price"
          defaultValue={editingProduct?.price || ''}
          placeholder="Price"
          required
        />
          <input
            type="text"
            name="description"
            defaultValue={editingProduct?.description || ''}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="color"
            defaultValue={editingProduct?.color || ''}
            placeholder="Color"
          />
          <input
            type="text"
            name="category"
            defaultValue={editingProduct?.category || ''}
            placeholder="Category"
          />
          <input
            type="text"
            name="size"
            defaultValue={editingProduct?.size || ''}
            placeholder="Size"
          />
          <input
            type="number"
            name="stockQuantity"
            defaultValue={editingProduct?.stockQuantity || ''}
            placeholder="Stock Quantity"
            required
          />
          <button type="submit">Save Product</button>
        </form>
      </div>
      
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
