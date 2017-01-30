const React = require('react');
const moment = require('moment');

// MessageList
module.exports = React.createClass({
  getDummyUser() {
    const PLACEHOLDER = 'https://placeimg.com/60/60/people';
    const dummyUser = {
      avatar: PLACEHOLDER,
      email: 'Anonymous'
    };
    return dummyUser;
  },
  renderMessage(message) {
    const sender = message.sentBy || this.getDummyUser();

    return <div key={message._id} className="message flex flex-row">
      <img src={sender.avatar} alt={sender.email} className="avatar" />
      <div className="message-wrapper">
        <p className="message-header">
          <span className="username font-600">{sender.email}</span>
          <span className="sent-date font-300">
            {moment(message.createdAt).format('MMM do, hh:mm:ss')}
          </span>
        </p>
        <p className="message-content font-300">
          {message.text}
        </p>
      </div>
    </div>;
  },

  render() {
    return <main className="chat flex flex-column flex-1 clear">
      {this.props.messages.map(this.renderMessage)}
    </main>
  }
});
