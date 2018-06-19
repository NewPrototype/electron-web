import React from 'react';
import { Avatar, Modal, Input } from 'antd';

import { login, getLogin } from 'api';
import ax from 'axios'



import './Herder.styl';

class Herder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      user: {
        userName: '',
        password: '',
      },
      loginUser: localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')) : {},
    };
  }
  handleOk = () => {
    //提交
    const { user } = this.state;
    login(user).then(data => {
      localStorage.setItem('user', JSON.stringify(data.user));
      this.setState({
        visible: false,
        user: {},
        loginUser: data.user,
      });
      if (data.token) {
        localStorage.setItem('toKen', data.token);


      }

    });
  };
  render() {
    return (
      <div className="herder">
        <div className="herder-left" onClick={() => {
          getLogin().then(data => {
            console.log(data)
          }).catch(err => {
            console.log(err)
          })
        }}>
          <img src={require('./../../images/book.png')} alt="" /> 记账本
        </div>
        <div>
          <Avatar style={{ backgroundColor: "#f56a00", verticalAlign: 'middle' }} size="large" onClick={() => {
            this.setState({
              visible: true,
            })
          }}>
            {this.state.loginUser.userName || '未登陆'}
          </Avatar>
        </div>
        <Modal
          title="登陆中心"
          width="300px"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={() => {
            this.setState({ visible: false });
          }}
        >
          <div className="ant-modal-content-user">
            <div className="userName">
              用户名:<Input
                placeholder="请输入用户名"
                value={this.state.user.userName}
                onChange={e => {
                  const { user } = this.state;
                  user.userName = e.target.value;
                  this.setState({
                    user,
                  });
                }}
                maxLength={10}
              />
            </div>
            <div>
              密码:<Input
                placeholder="请输入用户密码"
                value={this.state.user.password}
                type="password"
                maxLength={10}
                onChange={e => {
                  const { user } = this.state;
                  user.password = e.target.value;
                  this.setState({
                    user,
                  });
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  componentWillMount() { }
  componentDidMount() { }
  componentWillReceiveProps(nextProps) { }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) { }
  componentDidUpdate(prevProps, prevState) { }
  componentWillUnmount() { }
}

export default Herder;
