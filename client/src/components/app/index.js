import React from 'react';
import { Link } from 'react-router';

const OneLove = React.createClass({
  render() {
    return (
      <main className="app">
        <Link to="/clusters/" > clusters </Link>
      </main>
    );
  },
});


export default OneLove;
