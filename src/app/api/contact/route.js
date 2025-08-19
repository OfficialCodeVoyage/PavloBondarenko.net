import { Resend } from 'resend';
import DOMPurify from 'isomorphic-dompurify';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting: Track IP addresses and timestamps
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3; // Max 3 requests per minute

function isRateLimited(ip) {
    const now = Date.now();
    const userRequests = rateLimit.get(ip) || [];
    
    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (recentRequests.length >= MAX_REQUESTS) {
        return true;
    }
    
    // Add current request
    recentRequests.push(now);
    rateLimit.set(ip, recentRequests);
    
    return false;
}

export async function POST(request) {
    try {
        // Get client IP for rate limiting
        const clientIP = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        '127.0.0.1';

        // Check rate limiting
        if (isRateLimited(clientIP)) {
            return Response.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const formData = await request.formData();
        
        // SEC-004: Sanitize all user inputs to prevent XSS attacks
        const fullName = DOMPurify.sanitize(formData.get('full-name') || '');
        const email = DOMPurify.sanitize(formData.get('email') || '');
        const subject = DOMPurify.sanitize(formData.get('subject') || '');
        const message = DOMPurify.sanitize(formData.get('message') || '');

        // Basic validation
        if (!fullName || !email || !subject || !message) {
            return Response.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Field length validation
        const maxLengths = {
            fullName: 100,
            email: 255,
            subject: 200,
            message: 5000
        };

        if (fullName.length > maxLengths.fullName ||
            email.length > maxLengths.email ||
            subject.length > maxLengths.subject ||
            message.length > maxLengths.message) {
            return Response.json(
                { error: 'Input exceeds maximum allowed length' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return Response.json(
                { error: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error('RESEND_API_KEY not configured');
            return Response.json(
                { error: 'Email service not configured' },
                { status: 500 }
            );
        }

        // Send email using Resend
        const emailData = {
            from: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
            to: process.env.RESEND_TO_EMAIL || 'your@email.com',
            subject: `📧 New Message from pavlobondarenko.net - ${subject}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Portfolio Contact</title>
                </head>
                <body style="margin: 0; padding: 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    
                    <!-- Email Container -->
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #5B78F6 0%, #667eea 100%); padding: 60px 40px 50px; text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 16px;">📧</div>
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">
                                New Message from pavlobondarenko.net
                            </h1>
                        </div>
                        
                        <!-- Main Content -->
                        <div style="padding: 40px;">
                            
                            <!-- Contact Details -->
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #e5e7eb;">
                                <h2 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                    👤 Contact Details
                                </h2>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Name</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0;">${fullName}</p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Email</p>
                                    <p style="margin: 0;"><a href="mailto:${email}" style="color: #5B78F6; font-size: 15px; text-decoration: none;">${email}</a></p>
                                </div>
                                <div>
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Subject</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0;">${subject}</p>
                                </div>
                            </div>
                            
                            <!-- Message Content -->
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #e5e7eb;">
                                <h2 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                    💬 Message
                                </h2>
                                <div style="background: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #e5e7eb;">
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div style="text-align: center; margin-bottom: 40px;">
                                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
                                   style="display: inline-block; background: linear-gradient(135deg, #5B78F6 0%, #667eea 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 15px; box-shadow: 0 2px 8px rgba(91, 120, 246, 0.2);">
                                    ✉️ Reply to ${fullName.split(' ')[0]}
                                </a>
                            </div>
                            
                        </div>
                        
                        <!-- Footer -->
                        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%); padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #666666; font-size: 13px; margin: 0 0 4px 0;">
                                📍 Sent from <span style="color: #5B78F6; font-weight: 500;">pavlobondarenko.net</span> contact form
                            </p>
                            <p style="color: #999999; font-size: 12px; margin: 0;">
                                🕒 ${new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    month: 'long', 
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZoneName: 'short'
                                })}
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                New Contact Form Submission
                
                Name: ${fullName}
                Email: ${email}
                Subject: ${subject}
                
                Message:
                ${message}
                
                Sent: ${new Date().toLocaleString()}
            `
        };

        // Send notification email to you
        const result = await resend.emails.send(emailData);

        // Send auto-reply confirmation to the sender
        const autoReplyData = {
            from: process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com',
            to: email,
            subject: `✅ Thank you for contacting Pavlo Bondarenko`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You - Pavlo Bondarenko</title>
                </head>
                <body style="margin: 0; padding: 0; background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                    
                    <!-- Email Container -->
                    <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #5B78F6 0%, #667eea 100%); padding: 60px 40px 50px; text-align: center;">
                            <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">
                                Message Received
                            </h1>
                        </div>
                        
                        <!-- Main Content -->
                        <div style="padding: 40px;">
                            
                            <!-- Greeting -->
                            <p style="color: #1a1a1a; font-size: 18px; line-height: 1.6; margin: 0 0 32px 0;">
                                Hi ${fullName.split(' ')[0]},
                            </p>
                            
                            <p style="color: #1a1a1a; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                                Thank you for reaching out. I've received your message and will get back to you within 24-48 hours.
                            </p>
                            
                            <!-- Message Details -->
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border: 1px solid #e5e7eb;">
                                <h2 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                    📋 Your Message Details
                                </h2>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Name</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0 0 12px 0;">${fullName}</p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Email</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0 0 12px 0;">${email}</p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Subject</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0 0 12px 0;">${subject}</p>
                                </div>
                                <div style="margin-bottom: 16px;">
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Message</p>
                                    <div style="background: #ffffff; border-radius: 8px; padding: 16px; border: 1px solid #e5e7eb;">
                                        <p style="color: #1a1a1a; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                                    </div>
                                </div>
                                <div>
                                    <p style="color: #999999; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Sent</p>
                                    <p style="color: #1a1a1a; font-size: 15px; line-height: 1.5; margin: 0;">${new Date().toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        month: 'long', 
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</p>
                                </div>
                            </div>
                            
                            <!-- Next Steps -->
                            <div style="margin-bottom: 40px;">
                                <h2 style="color: #1a1a1a; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                                    ⏰ What Happens Next
                                </h2>
                                <ul style="color: #666666; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                                    <li style="margin-bottom: 8px;">I'll review your message carefully</li>
                                    <li style="margin-bottom: 8px;">You'll receive a response within 24-48 hours</li>
                                    <li>For urgent matters, please connect on LinkedIn</li>
                                </ul>
                            </div>
                            
                            <!-- CTA Buttons -->
                            <div style="text-align: center; margin-bottom: 40px;">
                                <a href="https://www.linkedin.com/in/mrbondarenko/" 
                                   style="display: inline-block; background: linear-gradient(135deg, #0077b5 0%, #005885 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 15px; margin-right: 12px; box-shadow: 0 2px 8px rgba(0, 119, 181, 0.2);">
                                    💼 Connect on LinkedIn
                                </a>
                                <a href="https://github.com/OfficialCodeVoyage" 
                                   style="display: inline-block; background: linear-gradient(135deg, #24292e 0%, #0d1117 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 15px; box-shadow: 0 2px 8px rgba(36, 41, 46, 0.2);">
                                    🐙 View GitHub
                                </a>
                            </div>
                            
                            <!-- Signature -->
                            <p style="color: #666666; font-size: 15px; line-height: 1.6; margin: 0;">
                                Best regards,<br>
                                <strong style="color: #1a1a1a;">Pavlo Bondarenko</strong><br>
                                Full Stack Developer
                            </p>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f3f4f6 100%); padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #999999; font-size: 13px; margin: 0;">
                                This is an automated response from <span style="color: #5B78F6; font-weight: 500;">pavlobondarenko.net</span>
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Thank you for contacting Pavlo Bondarenko!
                
                Hi ${fullName.split(' ')[0]},
                
                I've received your message with the subject "${subject}" and will get back to you as soon as possible. I typically respond within 24-48 hours.
                
                What happens next:
                - I'll review your message carefully
                - You'll hear back from me within 24-48 hours
                - If urgent, feel free to connect on LinkedIn
                
                Let's connect:
                LinkedIn: https://www.linkedin.com/in/mrbondarenko/
                GitHub: https://github.com/OfficialCodeVoyage
                
                Best regards,
                Pavlo Bondarenko
                Full Stack Developer
                
                ---
                This is an automated confirmation from pavlobondarenko.net
                Sent: ${new Date().toLocaleString()}
            `
        };

        // Send the auto-reply
        await resend.emails.send(autoReplyData);

        console.log('Email and auto-reply sent successfully:', result);

        return Response.json(
            { message: 'Message sent successfully!' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        
        // More specific error handling
        if (error.name === 'validation_error') {
            return Response.json(
                { error: 'Email validation failed. Please check your configuration.' },
                { status: 400 }
            );
        }
        
        return Response.json(
            { error: 'Failed to send message. Please try again.' },
            { status: 500 }
        );
    }
}