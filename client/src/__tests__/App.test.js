// src/components/App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../components/App/App'; // Path to your App component
import { AuthProvider } from '../context/AuthContext'; // Import your AuthProvider

// Mock components to isolate tests
jest.mock('../components/Header/header', () => () => <div>Header Component</div>);
jest.mock('../components/Footer/footer', () => () => <div>Footer Component</div>);
jest.mock('../components/Home/home', () => () => <div>Home Component</div>);
jest.mock('../components/Login/login', () => () => <div>Login Component</div>);
jest.mock('../components/NotFound/notFound', () => () => <div>404 Not Found</div>);
jest.mock('../components/privateRoute', () => () => <div>PrivateRoute Component</div>);

describe('App Component', () => {
  test('renders Header and Footer components', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Check if Header and Footer components are rendered
    expect(screen.getByText(/Header Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Footer Component/i)).toBeInTheDocument();
  });

  test('renders Home page at the root route', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Check if Home component is rendered on root path
    expect(screen.getByText(/Home Component/i)).toBeInTheDocument();
  });

  test('renders Login page when navigating to /login', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Simulate clicking the login link (ensure you add a 'Login' link to your component if it isn't already)
    fireEvent.click(screen.getByText(/Log In/i));

    // Ensure Login component is rendered after navigation
    expect(screen.getByText(/Login Component/i)).toBeInTheDocument();
  });

  test('renders 404 page for non-existent routes', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Simulate navigation to a non-existent route
    fireEvent.click(screen.getByText(/Non-existent Route/i));

    // Ensure 404 Not Found page is shown
    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  test('wraps routes with authentication context (AuthProvider)', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Check if the AuthContext is properly provided
    // This can be done by checking if your AuthContext-related components/values render correctly
    // For this, you'll need to include specific tests for context, if applicable.
  });

  test('renders PrivateRoute for protected routes', () => {
    render(
        <AuthProvider>
          <App />
        </AuthProvider>
    );

    // Test PrivateRoute is rendering correctly. You might want to mock or simulate login/logout
    expect(screen.getByText(/PrivateRoute Component/i)).toBeInTheDocument();
  });
});
