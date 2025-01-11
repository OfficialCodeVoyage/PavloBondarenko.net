import React from 'react';

const Form = () => {
    return (
        <div data-aos="zoom-in" className="contact-form">
            <div className="shadow-box">
                <img src="/images/bg1.png" alt="BG" className="bg-img"/>
                <img src="/images/icon3.png" alt="Icon"/>
                <h1>Let’s work <span>together.</span></h1>
                <form method="POST" action="mailer.php">
                    <div className="alert alert-success messenger-box-contact__msg" style={{display: 'none'}} role="alert">
                        Your message was sent successfully.
                    </div>
                    <div className="input-group">
                        <input type="text" name="full-name" id="full-name" placeholder="Name *"/>
                    </div>
                    <div className="input-group">
                        <input type="email" name="email" id="email" placeholder="Email *"/>
                    </div>
                    <div className="input-group">
                        <input type="text" name="subject" id="subject" placeholder="Your Subject *"/>
                    </div>
                    <div className="input-group">
                        <textarea name="message" id="message" placeholder="Your Message *"></textarea>
                    </div>
                    <div className="input-group">
                        <button className="theme-btn submit-btn" name="submit" type="submit">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;