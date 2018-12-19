import React, { Component } from 'react';
import { Spin } from 'antd';
import './index.css';

class Loading extends Component {
  render() {
    return (
      <Spin tip="Loading...">
        <div className="class-placeholder" />
      </Spin>
    );
  }
}

export default Loading;
