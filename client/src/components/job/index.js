import React, { Component } from 'react';
import { Icon, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import './index.css';

class Job extends Component {
  static propTypes = {
    job: PropTypes.shape(
      {
        name: PropTypes.string,
        desc: PropTypes.string,
        done: PropTypes.bool,
      },
    ).isRequired,
  };

  render() {
    return (
      <div className={this.props.job.done ? 'job done' : 'job'}>
        <div className="desc">
          {this.props.job.desc}
        </div>
        <div className="operations">
          <Checkbox
            checked={this.props.job.done}
            onChange={() => this.props.statusChange(this.props.job)}
          />
          <Icon type="delete" theme="outlined" onClick={() => this.props.delete(this.props.job)} />
        </div>
      </div>
    );
  }
}

export default Job;
