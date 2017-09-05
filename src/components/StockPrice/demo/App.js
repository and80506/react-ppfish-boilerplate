import React, { Component } from 'react';
import './App.less';
import StockPrice from '../index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{ margin: 100 }}>
        <StockPrice placeholder="买入价格" value="" />
      </div>
    );
  }
}

export default App;
