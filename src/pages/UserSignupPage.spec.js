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
        })
        it('calls postSignup when the fields are valid and the actions are provided in props', ()=>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            const {container, queryByPlaceholderText} = render(
                <UserSignupPage actions={actions}/>
            );
            const displayNameInput = queryByPlaceholderText('Your display name');
            const userNameInput = queryByPlaceholderText('Your Username');
            const passwordInput = queryByPlaceholderText('Your Password');
            const repeatPasswordInput = queryByPlaceholderText('Repeat Your Password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(userNameInput, changeEvent('my-user-name'));

            const button = container.querySelector('button');
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('does not throw exceptions calls postSignup when the actions are not provided in props', ()=>{
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            const {container, queryByPlaceholderText} = render(
                <UserSignupPage actions={actions}/>
            );
            const displayNameInput = queryByPlaceholderText('Your display name');
            const userNameInput = queryByPlaceholderText('Your Username');
            const passwordInput = queryByPlaceholderText('Your Password');
            const repeatPasswordInput = queryByPlaceholderText('Repeat Your Password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(userNameInput, changeEvent('my-user-name'));

            const button = container.querySelector('button');
            expect(() => fireEvent.click(button)).not.toThrow();
        })
    });
})