import React, { Component } from 'react';

class GetContact extends Component {
  constructor() {
    super()
    // this.state = {
    //   // profile: {},
    //   contacts: [{
    //     user: '',
    //     name: '',
    //     phone: ''
    //   }]
    // }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });

    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  submit(evt) {
    evt.preventDefault();
    const { name, phone } = this.state;
    this.setState(({ contacts }) => ({ contacts: [...contacts, { name, phone }] }));
  }

  render() {
    const { getAccessToken } = this.props.auth;

    fetch('http://127.0.0.1:3010/api/private',
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken(),
        },
        body: JSON.stringify({ sub: this.state.profile.sub }),
      })
      .then(res => res.text())
      .then(console.log)

    return (
      <div>
        <form onSubmit={this.submit}>
          <div>
            <label>Name</label>
            <input type="text" name='name' onChange={this.handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" name='phone' onChange={this.handleChange} />
          </div>
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default GetContact;