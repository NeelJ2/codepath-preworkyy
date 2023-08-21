import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw error;
        }
        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator:', error);
      }
    };

    fetchCreator();
  }, [id]);

  const deleteCreator = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this creator?'
    );
    if (!confirmation) return;

    try {
      const { error } = await supabase.from('creators').delete().eq('id', id);
      if (error) {
        throw error;
      }

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
      <img
        src={creator.imageURL}
        alt={`Image of ${creator.name}`}
        width={200}
      />

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
