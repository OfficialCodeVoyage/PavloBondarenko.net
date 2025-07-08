import React, { useEffect, useRef, useState } from 'react';

const Form = () => {
    const formRef = useRef(null);
    const messageRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const form = formRef.current;
        const message = messageRef.current;

        // Success function
        function done_func(response) {
            message.style.display = 'block';
            message.classList.remove('alert-danger');
            message.classList.add('alert-success');
            message.textContent = response.message || 'Message sent successfully!';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
            form.reset();
            setErrors({});
        }

        // Fail function
        function fail_func(errorData) {
            message.style.display = 'block';
            message.classList.remove('alert-success');
            message.classList.add('alert-danger');
            message.textContent = errorData.error || 'An error occurred. Please try again.';
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }

        // Validation function
        function validateForm() {
            const fullName = form.querySelector('#full-name');
            const email = form.querySelector('#email');
            const subject = form.querySelector('#subject');
            const messageInput = form.querySelector('#message');
            
            const newErrors = {};

            // Clear previous validation styles
            [fullName, email, subject, messageInput].forEach(field => {
                field.classList.remove('invalid');
            });

            // Validate full name
            if (!fullName.value.trim()) {
                newErrors.fullName = 'Name is required';
                fullName.classList.add('invalid');
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                newErrors.email = 'Email is required';
                email.classList.add('invalid');
            } else if (!emailRegex.test(email.value)) {
                newErrors.email = 'Please enter a valid email address';
                email.classList.add('invalid');
            }

            // Validate subject
            if (!subject.value.trim()) {
                newErrors.subject = 'Subject is required';
                subject.classList.add('invalid');
            }

            // Validate message
            if (!messageInput.value.trim()) {
                newErrors.message = 'Message is required';
                messageInput.classList.add('invalid');
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }

        // Form submission handler
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            setIsSubmitting(true);
            const formData = new FormData(form);

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    done_func(data);
                } else {
                    fail_func(data);
                }
            } catch (error) {
                fail_func({ error: 'Network error. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        };

        form.addEventListener('submit', handleSubmit);

        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, []);

    return (
        <div data-aos="zoom-in" className="contact-form">
            <div className="shadow-box">
                <img src="/images/bg1.png" alt="BG" className="bg-img" />
                <img src="/images/icon3.png" alt="Icon" />
                <h1>
                    Let’s get in <span>touch.</span> 
                    {/* got you - who uses email form in 2025? - add me on linked in  */}
                </h1>
                <form method="POST" ref={formRef}>
                    <div
                        className="alert alert-success messenger-box-contact__msg"
                        style={{ display: 'none' }}
                        role="alert"
                        ref={messageRef}
                    >
                        Your message was sent successfully.
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="full-name" 
                            id="full-name" 
                            placeholder="Name *" 
                            required 
                        />
                        {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                    </div>
                    <div className="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Email *" 
                            required 
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <input 
                            type="text" 
                            name="subject" 
                            id="subject" 
                            placeholder="Your Subject *" 
                            required 
                        />
                        {errors.subject && <span className="error-message">{errors.subject}</span>}
                    </div>
                    <div className="input-group">
                        <textarea 
                            name="message" 
                            id="message" 
                            placeholder="Your Message *" 
                            required
                        ></textarea>
                        {errors.message && <span className="error-message">{errors.message}</span>}
                    </div>
                    <div className="input-group">
                        <button 
                            className="theme-btn submit-btn" 
                            name="submit" 
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
