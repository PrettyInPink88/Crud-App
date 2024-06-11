import React, { useState } from 'react';
import axios from 'axios';

const ItemForm = ({ addItem }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/items', { name, description })
      .then(response => {
        addItem(response.data);
        setName('');
        setDescription('');
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Add Item</button>
    </form>
  );
};

export default ItemForm;
