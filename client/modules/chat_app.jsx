const UserList = require('./users/UserList.jsx');
const MessageList = require('./messages/MessageList.jsx');
const ComposeMessage = require('./messages/ComposeMessage.jsx');
const React = require('react');

//ChatApp
module.exports = React.createClass({
  getInitialState() {
    return {
      users: [],
      messages: []
    };
  },

  componentDidUpdate: function() {
    console.log("chat app updated");
    //const node = this.getDOMNode().querySelector('.chat');
    //node.scrollTop = node.scrollHeight - node.clientHeight;
  },

  componentDidMount() {
    const app = this.props.client;
    const userService = app.service('users');
    const messageService = app.service('messages');

    userService.find().then(page => this.setState({users: page.data}));

    userService.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));

    app.authenticate().then( () => {
      messageService.find({query: {$sort: {createdAt: -1}}}).then(page => this.setState({messages: page.data.reverse() }))
      .catch( (err) => {
        console.error(err);
      });
    })
    app.authenticate().then( () => {
      messageService.on('created', message => this.setState({
        messages: this.state.messages.concat(message)
      }));
    });
  },

  render() {
    return <div className="flex flex-row flex-1 clear">
      <UserList client={this.props.client} users={this.state.users} />
      <div className="flex flex-column col col-9">
        <MessageList users={this.state.users} messages={this.state.messages} />
        <ComposeMessage client={this.props.client}/>
      </div>
    </div>;
  }
});
