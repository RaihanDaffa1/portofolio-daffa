import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_lnpev2m',
        'template_5v2bvt5',
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        'i_jW-wF2p5ZGjdHyU'
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              name: '',
              email: '',
              message: '',
            });
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: 'danger',
          });
        }
      );
  };

  return (
    <section className="c-space my-20" id="contact" style={{ position: 'relative' }}>
      {alert.show && <Alert {...alert} />}

      {/* Added padding-bottom and removed min-h-screen */}
      <div className="relative flex items-center justify-center flex-col pb-32"> 
        <img
          src="/assets/terminal.png"
          alt="terminal-bg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: -1 }}
        />

        <div className="contact-container z-10">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button
              className="field-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;