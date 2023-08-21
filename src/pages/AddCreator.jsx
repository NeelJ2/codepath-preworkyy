import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const nav = useNavigate();

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCreator((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, error } = await supabase.from('creators').insert([creator]);

      if (error) {
        throw error;
      }

      // Redirect user to home or another preferred route after successful addition
      nav('/');
    } catch (error) {
      console.error('Error adding new creator:', error);
    }
  };

  const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      outline: 'none',
      transition: 'background-color 0.3s',
    },
  };

  return (
    <div>
      <h2>Add New Creator</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          value={creator.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          style={styles.input}
          type="url"
          name="url"
          value={creator.url}
          onChange={handleInputChange}
          placeholder="URL"
          required
        />
        <textarea
          style={{ ...styles.input, resize: 'vertical' }}
          name="description"
          value={creator.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          style={styles.input}
          type="text"
          name="imageURL"
          value={creator.imageURL}
          onChange={handleInputChange}
          placeholder="Image URL (optional)"
        />
        <button type="submit" style={styles.button}>
          Add Creator
        </button>
      </form>
    </div>
  );
};

export default AddCreator;
