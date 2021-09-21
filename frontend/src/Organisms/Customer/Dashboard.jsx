import React from 'react';
import FoodTypeFilter from '../../Molecule/FoodTypeFilter';
import FoodSection from '../../Molecule/FoodSection';

const Dashboard = () => {
  return (
    <div>
      <FoodTypeFilter />
      <FoodSection />
    </div>
  );
}

export default Dashboard;
