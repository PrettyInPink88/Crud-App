import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';
import ItemForm from './ItemForm';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item._id !== id));
  };

  return (
    <div>
      <h1>Journal Entries</h1>
      <ItemForm addItem={addItem} />
      <div className="table-container">
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <Item key={item._id} item={item} updateItem={updateItem} deleteItem={deleteItem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemList;
