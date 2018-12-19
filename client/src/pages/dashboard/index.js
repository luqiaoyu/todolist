import React, { Component } from 'react';
import {
  Layout,
  Icon,
  Menu,
  Dropdown,
  Input,
  message,
} from 'antd';
import Logout from '../../components/logout';
import Job from '../../components/job';

import { $storage } from '../../utils';
import './index.css';
import JobApi from '../../apis/job';

const {
  Header,
  Content,
} = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <Logout />
    </Menu.Item>
  </Menu>
);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: $storage.username,
      desc: '',
      loading: true,
      jobs: [],
    };
    this.getAllJobs();
  }

  onStatusChange(job) {
    const j = job;
    j.done = !j.done;
    JobApi.updateJob(j)
      .then(() => {
        message.success('successfully updated');
        this.getAllJobs();
      }, (error) => {
        message.error(`failed: ${error}`);
      });
  }

  onDelete(job) {
    JobApi.deleteJob(job._id)
      .then(() => {
        message.success('successfully deleted');
        this.getAllJobs();
      }, (error) => {
        message.error(`failed: ${error}`);
      });
  }

  onChange(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  onPressEnter() {
    JobApi.createJob(null, this.state.desc)
      .then(() => {
        this.getAllJobs();
        message.success('successfully created');
        this.setState({
          desc: '',
        });
      }, (error) => {
        message.error('error', error);
      });
  }

  getAllJobs() {
    JobApi.getAllJobs()
      .then((jobs) => {
        this.setState({
          jobs,
          loading: false,
        });
      }, () => {
        this.setState({
          loading: false,
          jobs: [],
        });
        message.error('load jobs failed, please retry');
      });
  }

  render() {
    return (
      <Layout>
        <Header>
          <div>
            Todolist React
          </div>
          <div>
            <a href="https://github.com/olivewind/todolist-react" target="_blank">
              <Icon type="github" theme="outlined" />
            </a>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" href="#">
                {this.state.username} <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <div className="wrap">
            <header>
              <Input value={this.state.desc} placeholder="typing something" onChange={e => this.onChange(e)} onPressEnter={() => this.onPressEnter()} />
            </header>
            <div className="jobs">
              {this.state.jobs.map(job => (
                <Job
                  key={job._id}
                  job={job}
                  delete={j => this.onDelete(j)}
                  statusChange={j => this.onStatusChange(j)}
                />
              ))}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Dashboard;
