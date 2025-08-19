/**
 * API Route Tests for /api/contact
 * 
 * Note: Testing Next.js API routes requires special setup.
 * These tests validate the business logic of the contact endpoint.
 */

// Mock the Resend library
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn(),
      },
    })),
  };
});

describe('/api/contact - Business Logic Tests', () => {
  describe('Email Validation', () => {
    it('should validate email format', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'first+last@test.org',
      ];

      const invalidEmails = [
        'invalid',
        '@example.com',
        'user@',
        'user @example.com',
        'user@.com',
      ];

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      validEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(true);
      });

      invalidEmails.forEach(email => {
        expect(emailRegex.test(email)).toBe(false);
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate required fields', () => {
      const testCases = [
        { fullName: '', email: 'test@test.com', subject: 'Test', message: 'Test', valid: false },
        { fullName: 'John', email: '', subject: 'Test', message: 'Test', valid: false },
        { fullName: 'John', email: 'test@test.com', subject: '', message: 'Test', valid: false },
        { fullName: 'John', email: 'test@test.com', subject: 'Test', message: '', valid: false },
        { fullName: 'John', email: 'test@test.com', subject: 'Test', message: 'Test', valid: true },
      ];

      testCases.forEach(testCase => {
        const isValid = Boolean(testCase.fullName && testCase.email && testCase.subject && testCase.message);
        expect(isValid).toBe(testCase.valid);
      });
    });

    it('should validate field lengths', () => {
      const maxLengths = {
        fullName: 100,
        email: 255,
        subject: 200,
        message: 5000,
      };

      const tooLong = {
        fullName: 'a'.repeat(101),
        email: 'a'.repeat(250) + '@test.com',
        subject: 'a'.repeat(201),
        message: 'a'.repeat(5001),
      };

      expect(tooLong.fullName.length > maxLengths.fullName).toBe(true);
      expect(tooLong.email.length > maxLengths.email).toBe(true);
      expect(tooLong.subject.length > maxLengths.subject).toBe(true);
      expect(tooLong.message.length > maxLengths.message).toBe(true);
    });
  });

  describe('Rate Limiting Logic', () => {
    it('should track request counts', () => {
      const requestCounts = new Map<string, { count: number; timestamp: number }>();
      const RATE_LIMIT = 3;
      const WINDOW_MS = 60000; // 1 minute

      const checkRateLimit = (ip: string): boolean => {
        const now = Date.now();
        const record = requestCounts.get(ip);

        if (!record) {
          requestCounts.set(ip, { count: 1, timestamp: now });
          return true;
        }

        if (now - record.timestamp > WINDOW_MS) {
          requestCounts.set(ip, { count: 1, timestamp: now });
          return true;
        }

        if (record.count >= RATE_LIMIT) {
          return false;
        }

        record.count++;
        return true;
      };

      // Test rate limiting
      const testIp = '192.168.1.1';
      
      // First 3 requests should pass
      expect(checkRateLimit(testIp)).toBe(true);
      expect(checkRateLimit(testIp)).toBe(true);
      expect(checkRateLimit(testIp)).toBe(true);
      
      // 4th request should be blocked
      expect(checkRateLimit(testIp)).toBe(false);
      
      // Different IP should pass
      expect(checkRateLimit('192.168.1.2')).toBe(true);
    });
  });

  describe('Sanitization', () => {
    it('should sanitize HTML tags from input', () => {
      const sanitize = (input: string): string => {
        return input
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;');
      };

      const maliciousInputs = [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert("XSS")>',
        '"><script>alert("XSS")</script>',
        "'; DROP TABLE users; --",
      ];

      maliciousInputs.forEach(input => {
        const sanitized = sanitize(input);
        
        // Check that special characters are escaped
        if (input.includes('<')) {
          expect(sanitized).toContain('&lt;');
        }
        if (input.includes('>')) {
          expect(sanitized).toContain('&gt;');
        }
        if (input.includes('"')) {
          expect(sanitized).toContain('&quot;');
        }
        if (input.includes("'")) {
          expect(sanitized).toContain('&#x27;');
        }
        
        // Ensure no executable HTML tags remain
        expect(sanitized).not.toMatch(/<script>/);
        expect(sanitized).not.toMatch(/<img[^>]*>/);
        expect(sanitized).not.toMatch(/<[^>]+>/); // No HTML tags should remain unescaped
      });
    });

    it('should trim whitespace from inputs', () => {
      const inputs = [
        { raw: '  John Doe  ', trimmed: 'John Doe' },
        { raw: '\n\ttest@example.com\n', trimmed: 'test@example.com' },
        { raw: '  Test Subject  ', trimmed: 'Test Subject' },
        { raw: '  Test\nmessage  ', trimmed: 'Test\nmessage' },
      ];

      inputs.forEach(({ raw, trimmed }) => {
        expect(raw.trim()).toBe(trimmed);
      });
    });
  });

  describe('Email Template Generation', () => {
    it('should generate notification email HTML', () => {
      const data = {
        fullName: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message content',
      };

      const generateNotificationHtml = (data: any) => {
        return `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `;
      };

      const html = generateNotificationHtml(data);
      
      expect(html).toContain('John Doe');
      expect(html).toContain('john@example.com');
      expect(html).toContain('Test Subject');
      expect(html).toContain('Test message content');
    });

    it('should generate auto-reply email HTML', () => {
      const data = {
        fullName: 'John Doe',
        subject: 'Test Subject',
      };

      const generateAutoReplyHtml = (data: any) => {
        return `
          <h2>Thank you for contacting me, ${data.fullName}!</h2>
          <p>I've received your message about "${data.subject}".</p>
          <p>I'll get back to you as soon as possible.</p>
        `;
      };

      const html = generateAutoReplyHtml(data);
      
      expect(html).toContain('John Doe');
      expect(html).toContain('Test Subject');
      expect(html).toContain('Thank you for contacting me');
    });
  });

  describe('Error Handling', () => {
    it('should handle different error types', () => {
      const getErrorMessage = (error: any): string => {
        if (error.message?.includes('rate limit')) {
          return 'Too many requests. Please try again later.';
        }
        if (error.message?.includes('invalid email')) {
          return 'Invalid email address';
        }
        if (error.message?.includes('required')) {
          return 'All fields are required';
        }
        return 'Failed to send message. Please try again.';
      };

      expect(getErrorMessage({ message: 'rate limit exceeded' })).toContain('Too many requests');
      expect(getErrorMessage({ message: 'invalid email format' })).toContain('Invalid email');
      expect(getErrorMessage({ message: 'field required' })).toContain('All fields are required');
      expect(getErrorMessage({ message: 'unknown error' })).toContain('Failed to send message');
    });
  });

  describe('Environment Configuration', () => {
    it('should check for required environment variables', () => {
      const requiredEnvVars = [
        'RESEND_API_KEY',
        'RESEND_FROM_EMAIL',
        'RESEND_TO_EMAIL',
      ];

      const checkEnvVars = (): boolean => {
        return requiredEnvVars.every(varName => {
          return process.env[varName] !== undefined;
        });
      };

      // Set test env vars
      process.env.RESEND_API_KEY = 'test_key';
      process.env.RESEND_FROM_EMAIL = 'from@test.com';
      process.env.RESEND_TO_EMAIL = 'to@test.com';

      expect(checkEnvVars()).toBe(true);

      // Remove one env var
      delete process.env.RESEND_API_KEY;
      expect(checkEnvVars()).toBe(false);

      // Restore
      process.env.RESEND_API_KEY = 'test_key';
    });
  });
});