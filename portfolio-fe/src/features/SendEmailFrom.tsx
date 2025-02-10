import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SendEmail.css';
import { sendEmail } from './api/sendEmail';  // You can implement this in your API file.

const SendEmailForm: React.FC = (): JSX.Element => {
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const emailData = {
      subject,
      body,
    };

    try {
      await sendEmail(emailData);  // Call your API to send the email.
      alert('Email sent successfully!');
      navigate('/zako');  // Redirect to a success page, or any other page you want.
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="send-email-form">
      <h2>Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default SendEmailForm;
