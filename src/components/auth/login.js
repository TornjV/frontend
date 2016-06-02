import React from 'react';
import { connect } from 'react-redux';
import { login, actions } from './actions';
import store from '../../store';
import { history } from '../../constants';
import { isLoggedIn } from '../../utils';
import Footer from '../layout/footer';


const errorMessages = {
  UNAUTHORIZED: 'Wrong user/password',
};


function mapStateToProps(state) {
  return {
    token: state.login.token,
    status: state.login.status,
    error: state.login.error,
  };
}

const Login = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    status: React.PropTypes.string,
    error: React.PropTypes.string,
  },

  getInitialState() {
    return {
      email: '',
      password: '',
    };
  },

  componentWillMount() {
    if (isLoggedIn()) {
      history.push('/');
    }
  },

  shouldComponentUpdate() {
    if (isLoggedIn()) {
      history.push('/clusters/');
    }
    return true;
  },

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  },

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  },

  handleSubmit(event) {
    event.preventDefault();
    store.dispatch(login(this.state.email, this.state.password));
  },

  render() {
    let spinner = '';
    let error = '';
    switch (this.props.status) {
      case 'pending':
        spinner = <div>spinner</div>;
        break;
      case 'error':
        error = <div>{errorMessages[this.props.error]}</div>;
        break;
      default:
        break;
    }
    return (
      <div>
        <div className="content inverse no_header">
          <div className="login">
            {spinner}
            {error}
            <h1 className="form__title">Login</h1>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className="form__item">
                <input
                  autoFocus
                  type="text"
                  className="form__field"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleEmailChange}
                />
              </div>
              <div className="form__item">
                <input
                  type="password"
                  className="form__field"
                  id="password"
                  ref="password"
                  placeholder="Password"
                  onChange={this.handlePasswordChange}
                />
              </div>
              <button className="button button--primary">Submit</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  },
});


export default connect(mapStateToProps, actions)(Login);
