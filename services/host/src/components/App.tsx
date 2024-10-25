import React, { useState } from 'react';
import classes from  './App.module.scss';
import { Link, Outlet } from 'react-router-dom';
import img from '@/assets/spiderman.png';
// @ts-ignore
import Button from 'shop/Button';

export const App = () => {
  const [count, setCount] = useState(0);  
  return (
    <div >
    <h1>app</h1>
    <Link to={"/about"}>ABOUT</Link>
    <Link to={"/shop"}>SHOP</Link>
    <Outlet />
    <Button />
    </div>
  );
};
