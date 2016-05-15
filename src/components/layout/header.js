import React from 'react';
import { Link } from 'react-router';

function Header() {
  return (
    <div>
      <Link to="/logout/">Go to Logout </Link>
      <Link to="/clusters/">Clusters </Link>
      <Link to="/services/">Services </Link>
      <Link to="/tasks/">Tasks</Link>
    </div>
  );
}

export default Header;
