import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../Form';

// Mock fetch for API calls
global.fetch = jest.fn();

describe('Form Component', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Rendering', () => {
    it('should render the form component', () => {
      render(<Form />);
      const form = document.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(<Form />);
      
      expect(screen.getByPlaceholderText(/name \*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email \*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/subject \*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/message \*/i)).toBeInTheDocument();
    });

    it('should render the submit button', () => {
      render(<Form />);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should have correct input types', () => {
      render(<Form />);
      
      const nameInput = screen.getByPlaceholderText(/name \*/i);
      expect(nameInput).toHaveAttribute('type', 'text');
      
      const emailInput = screen.getByPlaceholderText(/email \*/i);
      expect(emailInput).toHaveAttribute('type', 'email');
      
      const subjectInput = screen.getByPlaceholderText(/subject \*/i);
      expect(subjectInput).toHaveAttribute('type', 'text');
    });

    it('should have required attributes on all fields', () => {
      render(<Form />);
      
      expect(screen.getByPlaceholderText(/name \*/i)).toHaveAttribute('required');
      expect(screen.getByPlaceholderText(/email \*/i)).toHaveAttribute('required');
      expect(screen.getByPlaceholderText(/subject \*/i)).toHaveAttribute('required');
      expect(screen.getByPlaceholderText(/message \*/i)).toHaveAttribute('required');
    });

    it('should render the heading text', () => {
      render(<Form />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(/let's get in touch/i);
    });

    it('should have proper input names', () => {
      render(<Form />);
      
      const nameInput = screen.getByPlaceholderText(/name \*/i);
      expect(nameInput).toHaveAttribute('name', 'full-name');
      
      const emailInput = screen.getByPlaceholderText(/email \*/i);
      expect(emailInput).toHaveAttribute('name', 'email');
      
      const subjectInput = screen.getByPlaceholderText(/subject \*/i);
      expect(subjectInput).toHaveAttribute('name', 'subject');
      
      const messageInput = screen.getByPlaceholderText(/message \*/i);
      expect(messageInput).toHaveAttribute('name', 'message');
    });

    it('should have proper input IDs', () => {
      render(<Form />);
      
      const nameInput = screen.getByPlaceholderText(/name \*/i);
      expect(nameInput).toHaveAttribute('id', 'full-name');
      
      const emailInput = screen.getByPlaceholderText(/email \*/i);
      expect(emailInput).toHaveAttribute('id', 'email');
      
      const subjectInput = screen.getByPlaceholderText(/subject \*/i);
      expect(subjectInput).toHaveAttribute('id', 'subject');
      
      const messageInput = screen.getByPlaceholderText(/message \*/i);
      expect(messageInput).toHaveAttribute('id', 'message');
    });
  });

  describe('Form Structure', () => {
    it('should have contact form wrapper', () => {
      const { container } = render(<Form />);
      const wrapper = container.querySelector('.contact-form');
      expect(wrapper).toBeInTheDocument();
    });

    it('should have shadow-box container', () => {
      const { container } = render(<Form />);
      const shadowBox = container.querySelector('.shadow-box');
      expect(shadowBox).toBeInTheDocument();
    });

    it('should render background image', () => {
      render(<Form />);
      const bgImage = screen.getByAltText('BG');
      expect(bgImage).toBeInTheDocument();
      expect(bgImage).toHaveAttribute('src', '/images/bg1.png');
    });

    it('should render icon image', () => {
      render(<Form />);
      const iconImage = screen.getByAltText('Icon');
      expect(iconImage).toBeInTheDocument();
      expect(iconImage).toHaveAttribute('src', '/images/icon3.png');
    });

    it('should have message alert div', () => {
      const { container } = render(<Form />);
      const alertDiv = container.querySelector('.messenger-box-contact__msg');
      expect(alertDiv).toBeInTheDocument();
      expect(alertDiv).toHaveAttribute('role', 'alert');
      expect(alertDiv).toHaveStyle({ display: 'none' });
    });

    it('should have input groups for form fields', () => {
      const { container } = render(<Form />);
      const inputGroups = container.querySelectorAll('.input-group');
      expect(inputGroups).toHaveLength(5); // name, email, subject, message, submit button
    });

    it('should have textarea for message field', () => {
      render(<Form />);
      const messageField = screen.getByPlaceholderText(/message \*/i);
      expect(messageField.tagName).toBe('TEXTAREA');
    });

    it('should have submit button with correct class', () => {
      render(<Form />);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toHaveClass('theme-btn', 'submit-btn');
    });
  });

  describe('Form Attributes', () => {
    it('should have POST method', () => {
      render(<Form />);
      const form = document.querySelector('form');
      expect(form).toHaveAttribute('method', 'POST');
    });

    it('should have data-aos animation', () => {
      const { container } = render(<Form />);
      const wrapper = container.querySelector('[data-aos="zoom-in"]');
      expect(wrapper).toBeInTheDocument();
    });
  });
});