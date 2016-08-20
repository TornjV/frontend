import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import HostIcon from 'material-ui/svg-icons/hardware/memory';
import actions from './actions/remove';


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
    const styles = {
      paper: {
        height: 120,
        width: 120,
        borderRadius: 10,
        textAlign: 'center',
        margin: 3,
      },

      close: {
        marginLeft: 100,
      },

      icon: {
        height: '60%',
        width: '100%',
      },
    };
    return (
      <Paper style={styles.paper}>
        <div style={styles.close} onClick={this.handleClose}>x</div>
        <HostIcon color="#ccc" style={styles.icon} />
        <div>{this.props.name}</div>
      </Paper>
    );
  },
});


export default connect(mapStateToProps, actions)(Application);
