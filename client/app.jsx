const ChatApp = require('./modules/chat_app.jsx');
const feathers = require('feathers-client');
const React = require('react');
const ReactDOM = require('react-dom');
const io = require('socket.io-client');

const socket = io();

const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  .configure(feathers.authentication({
    storage: window.localStorage
  }));

// Now finally render all this to the page (only works on chat.html after authenticating)
app.authenticate().then(() => {
  ReactDOM.render(
  <div id="app" className="flex flex-column">
    <header className="title-bar flex flex-row flex-center">
      <div className="title-wrapper block center-element">
        <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png"
          alt="Feathers Logo" />
        <span className="title">Chat</span>
      </div>
    </header>
    <ChatApp client={app}/>
  </div>
    , document.getElementById('app'));
}).catch(error => {
  if (error.code === 401) {
    window.location.href = '/login.html'
  }
  console.error(error);
});
