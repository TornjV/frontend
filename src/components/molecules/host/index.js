import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import HostIcon from 'material-ui/svg-icons/hardware/memory';
import actions from './actions/remove';
import styles from '../../atoms/icon/styles';


const mapStateToProps = (state) => ({
  theme: state.theme.theme,
});


const Application = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    iconId: React.PropTypes.string,
    close: React.PropTypes.func,
  },

  handleClose(event) {
    event.preventDefault();
  },

  render() {
    return (
      <Paper style={styles.paper}>
        <div style={styles.close} onClick={this.handleClose}>x</div>
        <HostIcon color={styles.icon.color} style={styles.icon} />
        <div>{this.props.name}</div>
      </Paper>
    );
  },
});


export default connect(mapStateToProps, actions)(Application);
