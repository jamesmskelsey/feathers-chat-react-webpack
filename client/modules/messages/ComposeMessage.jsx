const React = require('react');

//ComposeMessage
module.exports = React.createClass({
  getInitialState() {
    return {text: ''};
  },

  updateText(ev) {
    this.setState({text: ev.target.value});
  },

  sendMessage(ev) {
    ev.preventDefault();
    if (this.state.text.length > 0) {
      const messageService = this.props.client.service('messages');
      this.props.client.authenticate().then( () => {
          messageService.create({
          text: this.state.text
        }).then(() => this.setState({text: ''}));

      }).catch( (err) => {
        console.error(err);
      });
    }

  },

  render() {
    return <form className="flex flex-row flex-space-between"
      onSubmit={this.sendMessage}>
      <input type="text" name="text" className="flex flex-1"
        value={this.state.text} onChange={this.updateText} />
      <button className="button-primary" type="submit">Send</button>
    </form>;
  }
});
