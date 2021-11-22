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
            <div className = "container">
                <h1 className = "text-center" >Sign Up</h1>
                <div className = "col-12 mb-3">
                    <label>Display Name</label> 
                    <input  placeholder="Your display name" 
                    value={this.state.displayName}
                    onChange={this.onChangeDisplayName} />
                </div>
                <div className = "col-12 mb-3">
                    <label>User Name</label> 
                    <input className = "form-control" placeholder="Your Username" 
                    value={this.state.username}
                    onChange={this.onChangeUserName} />
                </div>
                <div className = "col-12 mb-3">
                    <label>Password</label> 
                    <input className = "form-control" placeholder="Your Password" type="password" />
                </div>
                <div className = "col-12 mb-3">
                    <label>Repeat Password</label> 
                    <input className = "form-control" placeholder="Repeat Your Password" type="password" />
                </div>
                <div className = "text-center" >
                    <button className ="btn btn-primary" onClick ={this.onClickSignup}>Sign up</button>
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