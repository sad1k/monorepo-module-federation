import React, { useState } from 'react';
import classes from  './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import img from '@/assets/spiderman.png';

export const App = () => {
  const [count, setCount] = useState(0);  
  return (
    <div >
    <h1>SHOP MODULE</h1>
    </div>
  );
};
