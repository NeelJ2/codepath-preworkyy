import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = ({ creator, onDelete }) => {
  return (
    <div className="card-container">
      <img
        className="creator-image"
        src={creator.imageURL || 'default-image-url.jpg'}
        alt={creator.name}
      />
      <h3 className="creator-name">{creator.name}</h3>
      <p className="creator-description">{creator.description}</p>
      <a
        href={creator.url}
        className="creator-url"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit URL
      </a>
      <div className="card-actions">
        <Link to={`/edit/${creator.id}`} className="edit-button">
          Edit
        </Link>
        <button onClick={() => onDelete(creator.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

const CreatorsList = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select('*');

      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    };

    fetchCreators();
  }, []);

  const deleteCreator = async (id) => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .delete()
        .match({ id });

      if (error) {
        throw error;
      }

      setCreators(creators.filter((creator) => creator.id !== id));
    } catch (error) {
      console.error('Error deleting creator:', error);
    }
  };

  return (
    <div className="cardsContainer">
      {creators.map((creator) => (
        <Card key={creator.id} creator={creator} onDelete={deleteCreator} />
      ))}
    </div>
  );
};

export default CreatorsList;
