import React from 'react';

export class UserSignupPage extends React.Component{


    state={
        displayName: '',
        username: ''
    }
    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({displayName: value});
    };
    onChangeUserName = (event) => {
        const value = event.target.value;
        this.setState({username: value});
    };

    onClickSignup = () =>{
        actions = {
            displayName: this.state.displayName,
            username: this.state.username,
            password: this.state.password
        }
        this.props.actions.postSignup(actions);
    };
    render(){
        return (
            <div>
                <h1>Sign Up</h1>
                <div>
                    <input placeholder="Your display name" 
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName} />
                </div>
                <div>
                    <input placeholder="Your Username" 
                    value={this.state.username}
                    onChange={this.onChangeUserName} />
                </div>
                <div>
                    <input placeholder="Your Password" type="password" />
                </div>
                <div>
                    <input placeholder="Repeat Your Password" type="password" />
                </div>
                <div>
                    <button onClick ={this.onClickSignup}>Sign up</button>
                </div>
            </div>
        )
    }

}
UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => 
        new Promise((resolve, reject) => {
            resolve({});
        })
    }
};
export default UserSignupPage;