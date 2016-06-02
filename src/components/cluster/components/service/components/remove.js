import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/remove';
import store from '../../../../../store';
import { history } from '../../../../../constants';


const errorMessages = {
  UNAUTHORIZED: 'Wrong user/password',
};


const mapStateToProps = state => ({
  status: state.clusterServiceRemove.status,
  error: state.clusterServiceRemove.error,
});


const ClusterServiceRemove = React.createClass({
  propTypes: {
    params: React.PropTypes.object,
    status: React.PropTypes.string,
    error: React.PropTypes.string,
  },

  shouldComponentUpdate(nextProps) {
    if (nextProps.status === 'success') {
      history.push(`/clusters/${this.props.params.clusterId}`);
      return false;
    }
    return true;
  },

  componentWillUnmount() {
    store.dispatch(actions.reset());
  },

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  },

  handleSubmit(event) {
    event.preventDefault();
    store.dispatch(
      actions.remove(
        this.props.params.clusterId,
        this.props.params.serviceId
      )
    );
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
      <div className="form-container">
        {spinner}
        {error}
        <h1 className="form__title">Remove Service</h1>
        <form role="form" onSubmit={this.handleSubmit}>
          <div className="form__item">
            <label htmlFor="name">Are you sure?</label>
          </div>
          <button className="button button--primary">Remove</button>
        </form>
      </div>
    );
  },
});


const routes = {
  path: 'remove/:serviceId',
  component: connect(mapStateToProps, actions)(ClusterServiceRemove),
};

export default routes;
