import React, { Component } from 'react';
import { connect } from 'react-redux'
class StoreCount extends Component {
  constructor(props) {
    super(props);
  }

  addc = () => {
    this.props.dispatch({
      type: 'increment'
    });
  };

  minus = () => {
    this.props.dispatch({
      type: 'decrement'
    });
  };

  render() {
    // store.subscribe(() =>
    //   this.setState({
    //     count: store.getState()
    //   })
    // );
    return (
      <div>
        <h1>{this.props.count}</h1>
        <div>
          <button onClick={this.addc}>add</button>
          <button onClick={this.minus}> minus</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    count: state
});

export default connect(mapStateToProps)(StoreCount);
