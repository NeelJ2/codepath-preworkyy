import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  // Setup & Imports
  const { id } = useParams();
  const history = useNavigate();

  // State Management
  const [creator, setCreator] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  });

  // Data Fetching
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id);
      if (error) console.error('Error fetching creator:', error);
      else {
        setCreator(data[0]);
        setFormData(data[0]);
      }
    };

    fetchCreator();
  }, [id]);

  // Data Updation & Deletion
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .update(formData)
      .eq('id', id);
    if (error) console.error('Error updating creator:', error);
    else history('/'); // navigate back to home after successful update
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('creators').delete().eq('id', id);
    if (error) console.error('Error deleting creator:', error);
    else history('/');
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

  // Rendering
  if (!creator) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Creator</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          style={styles.input}
          type="url"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="URL"
        />
        <textarea
          style={{ ...styles.input, resize: 'vertical' }}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
        />
        <input
          style={styles.input}
          type="text"
          value={formData.imageURL}
          onChange={(e) =>
            setFormData({ ...formData, imageURL: e.target.value })
          }
          placeholder="Image URL"
        />
        <button type="submit" style={styles.button}>
          Update
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{ ...styles.button, backgroundColor: '#e74c3c' }}
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditCreator;
