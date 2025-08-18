'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-fallback" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h1 style={{ 
              color: '#ff6b6b', 
              marginBottom: '20px',
              fontSize: '2.5rem',
              fontWeight: 'bold'
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{ 
              color: '#666', 
              marginBottom: '30px',
              fontSize: '1.1rem',
              lineHeight: '1.6'
            }}>
              We're sorry for the inconvenience. The application encountered an unexpected error. 
              Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '14px 32px',
                backgroundColor: '#5B78F6',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(91, 120, 246, 0.4)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4968E5';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(91, 120, 246, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#5B78F6';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(91, 120, 246, 0.4)';
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginTop: '30px', 
                textAlign: 'left',
                padding: '15px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  color: '#495057',
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{ 
                  color: '#dc3545', 
                  fontSize: '12px',
                  overflow: 'auto',
                  padding: '10px',
                  background: 'white',
                  borderRadius: '4px',
                  border: '1px solid #f5c6cb'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;