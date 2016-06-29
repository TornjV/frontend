import React from 'react';
import cssModules from 'react-css-modules';
import styles from './cluster.scss';
import actions from './actions';
import { connect } from 'react-redux';
import store from '../../../store';
import List from '../../molecules/transition-appear';
import Service from '../../molecules/service';

const mapStateToProps = (state) => ({
  cluster: state.clusterDetail.cluster,
  roles: state.clusterDetail.roles,
});


const ClusterDetail = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    cluster: React.PropTypes.object,
    roles: React.PropTypes.array,
    params: React.PropTypes.object,
  },

  componentWillMount() {
    store.dispatch(actions.get(this.props.params.clusterId));
  },

  componentWillUnmount() {
    store.dispatch(actions.reset());
  },

  render() {
    if (this.props.cluster === undefined) {
      return <div></div>;
    }
    const services = (
      <div>
        {
          this.props.cluster.services.map(
            service => {
              const path = `clusters/${this.props.params.clusterId}/provision`;
              return <Service key={service.id} name={service.name} path={path} />;
            }
          )
        }
      </div>
    );
    return (
      <div>
        <h2>{this.props.cluster.name}</h2>
        <div>
          <div styleName="label">
            providers:
          </div>
          <div styleName="item">
            {
              this.props.cluster.providers ?
              this.props.cluster.providers.map(
                (prov) =>
                  <span key={prov.name}>
                    {prov.name}
                  </span>
              ) :
              'No roles right now'
            }
          </div>
        </div>
        <div>
          <div styleName="label">
            roles:
          </div>
          <div styleName="item">
            {
              this.props.cluster.roles ?
              this.props.cluster.roles.map(
                (role) =>
                  <span key={role.name}>
                    {role.name}
                  </span>
              ) :
              'No roles right now'
            }
          </div>
        </div>
        <div>
          <div styleName="label">
            services:
          </div>
          <div styleName="item">
            <List>
              {services}
            </List>
          </div>
        </div>
      </div>
    );
  },
});


const routes = {
  path: ':clusterId',
  indexRoute: { component: connect(mapStateToProps, actions)(cssModules(ClusterDetail, styles)) },
};

export default routes;
