import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatorsList from './components/CreatorsList';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CreatorsList />} />
          <Route path="/edit/:id" element={<EditCreator />} />
          <Route path="/add" element={<AddCreator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
