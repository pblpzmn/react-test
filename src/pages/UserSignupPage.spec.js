import React from 'react';
import { render , fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {UserSignupPage} from './UserSignupPage';

describe('UserSignupPage', () => {
    describe('Layout', () =>{
        it('has header of Sign up', ()=>{
            const {container}  = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up'); 
        });
        it('has input for display name', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const inputText = queryByPlaceholderText('Your display name');
            expect(inputText).toBeInTheDocument();
        });
        it('has input for username', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your Username');
            expect( usernameInput).toBeInTheDocument();
        });
        it('has input for password', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput.type).toBe("password");
        });
        it('has password repeat', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Repeat Your Password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password', ()=> {
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Repeat Your Password');
            expect(passwordInput.type).toBe("password");
        });
        it('it has submit button', ()=>{
            const {container} = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });
        
    });
    describe('Interactions', () => {
        const changeEvent = (content) =>{
            return {
                target: {
                    value: content
                }
            }
        }

        let button, userNameInput, displayNameInput, passwordInput, repeatPasswordInput;

        const setupForSubmit = (props) => {
            const rendered = render (
                <UserSignupPage {...props}/>

            );
            const {container ,queryByPlaceholderText} = rendered;
            userNameInput = queryByPlaceholderText('Your Username');
            displayNameInput = queryByPlaceholderText('Your display name');
            
            passwordInput = queryByPlaceholderText('Your Password');
            repeatPasswordInput = queryByPlaceholderText('Repeat Your Password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('P4ssword'));

            button = container.querySelector('button');
            return rendered;
        };

        it('sets the displayName value into state', () =>{
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        it('sets the username value into state', () =>{
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const userNameInput = queryByPlaceholderText('Your Username');
            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            expect(userNameInput).toHaveValue('my-user-name');
        });
        it('sets the password value into state', () =>{
            const {queryByPlaceholderText} = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your Password');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        })
        it('calls postSignup when the fields are valid and the actions are provided in props', ()=>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions});
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('does not throw exceptions calls postSignup when the actions are not provided in props', ()=>{
            expect(() => fireEvent.click(button)).not.toThrow();
        });
        it('call post with user body when the fields are valid', ()=>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({actions});
            const expectedUserObject = {
                userName:"my-user-name",
                displayName:"my-display-name",
                password:"P4ssword"
            }
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
    });
})