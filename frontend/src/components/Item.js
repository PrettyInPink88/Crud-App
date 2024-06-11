import React, { useState } from 'react';
import axios from 'axios';

const Item = ({ item, updateItem, deleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ name: item.name, description: item.description });

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/items/${item._id}`, editedItem)
      .then(response => {
        updateItem(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/items/${item._id}`)
      .then(() => deleteItem(item._id))
      .catch(error => console.error(error));
  };

  return (
    <tr>
      <td>{isEditing ? (
          <input
            type="text"
            value={editedItem.name}
            onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
          />
        ) : item.name}</td>
      <td>{isEditing ? (
          <input
            type="text"
            value={editedItem.description}
            onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
          />
        ) : item.description}</td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleUpdate} style={{ backgroundColor: 'green', color: 'white' }}>Save</button>
            &nbsp; {/* Inserting space between buttons */}
            <button onClick={() => setIsEditing(false)} style={{ backgroundColor: 'gray', color: 'white' }}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</button>
            &nbsp; {/* Inserting space between buttons */}
            <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Item;
