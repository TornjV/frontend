import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div>
    <div className="content inverse full">
      <div className="login">
        <h1 className="form__title">Forgot Password</h1>
        <form role="form">
          <div className="form__item">
            <input
              autoFocus
              type="text"
              className="form__field"
              id="email"
              placeholder="Email"
            />
          </div>
          <button className="button button--primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
);
