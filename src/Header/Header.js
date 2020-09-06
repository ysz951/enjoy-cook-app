import React from 'react';
import SearchNav from '../SearchNav/SearchNav';
import './Header.css';
import HeaderNoSearch from '../HeaderNoSearch/HeaderNoSearch';

export default function Header (props) {
  return (
    <>
      <HeaderNoSearch />
      <SearchNav/>
    </>
  );
}