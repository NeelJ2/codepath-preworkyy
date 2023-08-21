import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreatorsList from './components/CreatorsList';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import ViewCreator from './pages/ViewCreator'; // Import the ViewCreator component

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add New Creator</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CreatorsList />} />
          <Route path="/edit/:id" element={<EditCreator />} />
          <Route path="/add" element={<AddCreator />} />
          <Route path="/creator/:id" element={<ViewCreator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
