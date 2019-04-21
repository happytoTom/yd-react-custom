import React from 'react';
import { Route } from 'react-router-dom';
import ComponentDemo from '../components/componentdemo.jsx';
import storeDemo from '../components/storedemo.jsx';

export default (
  <>
    <Route path="/componentdemo" component={ComponentDemo} />
    <Route path="/storeDemo" component={storeDemo} />
  </>
);
