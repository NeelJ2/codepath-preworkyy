import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const ShowCreator = ({ creators, setCreators }) => {
  const deleteCreator = async (id) => {
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) {
        throw error;
      }

      // Update the state to remove the deleted creator
      const updatedCreators = creators.filter((creator) => creator.id !== id);
      setCreators(updatedCreators);
    } catch (error) {
      console.error('Error deleting creator:', error);
    }
  };

  return (
    <div>
      <h1>💫 Creatorverse</h1>

      <Link to="/add">
        <button>Add New Creator</button>
      </Link>

      {creators.map((creator) => (
        <div key={creator.id}>
          <h2>
            <Link to={`/creator/${creator.id}`}>{creator.name}</Link>
          </h2>
          <p>{creator.description}</p>
          <img src={creator.imageURL} alt={creator.name} width={200} />

          <Link to={`/edit/${creator.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteCreator(creator.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ShowCreator;
