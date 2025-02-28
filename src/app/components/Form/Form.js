import React, { useEffect, useRef } from 'react';

const Form = () => {
    const formRef = useRef(null); // Используем ref для доступа к форме
    const messageRef = useRef(null); // Используем ref для сообщения

    useEffect(() => {
        const form = formRef.current;
        const message = messageRef.current;

        // Success function
        function done_func(response) {
            message.style.display = 'block';
            message.classList.remove('alert-danger');
            message.classList.add('alert-success');
            message.textContent = response;
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
            form.reset(); // Сброс значений формы
        }

        // Fail function
        function fail_func(data) {
            message.style.display = 'block';
            message.classList.remove('alert-success');
            message.classList.add('alert-danger');
            message.textContent = data.responseText;
            setTimeout(() => {
                message.style.display = 'none';
            }, 3000);
        }

        // Обработчик отправки формы
        const handleSubmit = (e) => {
            e.preventDefault();

            const fullName = form.querySelector('#full-name');
            const email = form.querySelector('#email');

            if (!fullName.value || !email.value) {
                fullName.classList.add('invalid');
                console.log('Validation failed');
                return false;
            }

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw response;
                    }
                    return response.text();
                })
                .then(done_func)
                .catch((err) => {
                    err.text().then((errorMessage) => fail_func({ responseText: errorMessage }));
                });
        };

        form.addEventListener('submit', handleSubmit);

        // Удаляем обработчик при размонтировании компонента
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
                <form method="POST" action="mailer.php" ref={formRef}>
                    <div
                        className="alert alert-success messenger-box-contact__msg"
                        style={{ display: 'none' }}
                        role="alert"
                        ref={messageRef}
                    >
                        Your message was sent successfully.
                    </div>
                    <div className="input-group">
                        <input type="text" name="full-name" id="full-name" placeholder="Name *" />
                    </div>
                    <div className="input-group">
                        <input type="email" name="email" id="email" placeholder="Email *" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="subject" id="subject" placeholder="Your Subject *" />
                    </div>
                    <div className="input-group">
                        <textarea name="message" id="message" placeholder="Your Message *"></textarea>
                    </div>
                    <div className="input-group">
                        <button className="theme-btn submit-btn" name="submit" type="submit">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
