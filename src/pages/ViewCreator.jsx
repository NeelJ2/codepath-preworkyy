import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams(); // Extracting the ID from the route parameter
  const nav = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [id]);

  const deleteCreator = async () => {
    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) {
        throw error;
      }

      // Redirect to the list of creators after successful deletion
      nav('/');
    } catch (error) {
      console.error('Error deleting creator:', error);
    }
  };

  if (!creator) return <div>Loading...</div>;

  return (
    <div>
      <h1>{creator.name}</h1>
      <p>{creator.description}</p>
      <img src={creator.imageURL} alt={creator.name} width={200} />

      <div>
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={deleteCreator}>Delete</button>
      </div>
    </div>
  );
};

export default ViewCreator;
