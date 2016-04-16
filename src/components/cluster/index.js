import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import actions from './actions/list';
import store from '../../store';
import create from './components/create';
import detail from './components/detail';
import { socketio } from '../../constants';


const mapStateToProps = state => ({
  clusters: state.clusterList.clusters,
  status: state.clusterList.status,
});

const Component = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    clusters: React.PropTypes.array,
    status: React.PropTypes.string,
  },

  componentWillMount() {
    store.dispatch(actions.get());
    socketio.emit('cluster', 'something');
  },

  componentDidMount() {
    socketio.on('response', message => {
      console.log(message);
    });
  },

  componentWillUnmount() {
    store.dispatch(actions.reset());
  },

  render() {
    const children = (
      <div>
        {this.props.children}
      </div>
    );
    const index = (
      <div>
        <h2>My clusters:</h2>
        <ul>
          {
            this.props.clusters.map(
              cluster =>
              <li key={cluster.id}>
              <Link
                key={cluster.id}
                to={`/clusters/${cluster.id}/`}
                cluster={cluster}
              > {cluster.name} </Link> </li>
            )
          }
        </ul>
        <Link to={'/clusters/create/'}>Create</Link>
      </div>
    );
    if (this.props.children) {return children;}
    return index;
  },
});

export const List = connect(mapStateToProps, actions)(Component);

const routes = {
  path: 'clusters',
  indexRoute: { component: List },
  childRoutes: [
    create,
    detail,
  ],
};

export default routes;
