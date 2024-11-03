// client/src/__tests__/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App/App';
import { AuthProvider } from '../context/AuthContext';

jest.mock('../components/Home/home', () => () => <div>Home</div>);
jest.mock('../components/UserProfile/userProfile', () => () => <div>User Profile</div>);
jest.mock('../components/AdminProfile/adminProfile', () => () => <div>Admin Profile</div>);
jest.mock('../components/UserHub/userHub', () => () => <div>User Hub</div>);
jest.mock('../components/AdminHub/adminHub', () => () => <div>Admin Hub</div>);
jest.mock('../components/Login/login', () => () => <div>Login</div>);
jest.mock('../components/Register/register', () => () => <div>Register</div>);
jest.mock('../components/NotFound/notFound', () => () => <div>Not Found</div>);
jest.mock('../components/privateRoute', () => ({ children }) => <>{children}</>);

describe('App component', () => {
  it('renders without crashing', () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders Home component on the root path', () => {
    window.history.pushState({}, 'Home page', '/');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders User Profile for /user-profile route', () => {
    window.history.pushState({}, 'User Profile page', '/user-profile');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('User Profile')).toBeInTheDocument();
  });

  it('renders Admin Profile for /admin-profile route', () => {
    window.history.pushState({}, 'Admin Profile page', '/admin-profile');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Admin Profile')).toBeInTheDocument();
  });

  it('renders User Hub for /user-hub route', () => {
    window.history.pushState({}, 'User Hub page', '/user-hub');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('User Hub')).toBeInTheDocument();
  });

  it('renders Admin Hub for /admin-hub route', () => {
    window.history.pushState({}, 'Admin Hub page', '/admin-hub');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Admin Hub')).toBeInTheDocument();
  });

  it('renders Login component on /login path', () => {
    window.history.pushState({}, 'Login page', '/login');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders Register component on /register path', () => {
    window.history.pushState({}, 'Register page', '/register');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('renders Not Found for unknown routes', () => {
    window.history.pushState({}, 'Unknown page', '/unknown-route');

    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
