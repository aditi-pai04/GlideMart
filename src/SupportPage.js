import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import './SupportPage.css'; // Ensure you have styles here

const SupportPage = () => {
    const location = useLocation();
    const userId = location.state?.userId; // Retrieve userId from location state
    const [faqs, setFaqs] = useState([
        { question: "How can I reset my password?", answer: "You can reset your password by clicking on 'Forgot Password' at the login screen.", open: false },
        { question: "Where can I view my order history?", answer: "Go to the 'My Orders' section in your account dashboard.", open: false },
        { question: "How can I contact support?", answer: "You can reach us via email at support@example.com or by filling out the form below.", open: false },
    ]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('');
    useEffect(() => {
        // Fetch user details to get the email
        const fetchUserEmail = async () => {
            if (!userId) {
                console.error('User ID is undefined');
                return;
            }
            try {
                const response = await fetch(`http://localhost:5000/api/support/${userId}`);
                console.log('Response:', response); // Log the raw response
                
                if (response.ok) {
                    console.log(response.body)
                    const data = await response.json(); // Use response.json() to get the data
                    console.log("Data:", data); // Log the fetched data
                    setEmail(data.email); // Set the email from the fetched data
                    setName(data.name); // Optionally set the name if needed
                } else {
                    const errorData = await response.json(); // Get error data for a better error message
                    console.error('Failed to fetch user data:', errorData.message);
                }
            } catch (error) {
                console.error('Error fetching user email:', error);
            }
        };
        
        fetchUserEmail();
    }, [userId]);
    
    const toggleFAQ = (index) => {
        setFaqs(faqs.map((faq, i) => {
            if (i === index) {
                faq.open = !faq.open;
            } else {
                faq.open = false; // Close other FAQs
            }
            return faq;
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, email, message };

        try {
            const response = await fetch('http://localhost:5000/api/support/send-support-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmissionStatus('Your message has been sent successfully!');
                // Reset form fields
                setName('');
                setMessage('');
            } else {
                setSubmissionStatus(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setSubmissionStatus('There was an error sending your message. Please try again later.');
        }
    };

    return (
        <div className="support-page">
            <Navbar userId={userId} /> {/* Pass userId to the Navbar */}
            <div className="support-container">
                <h1 className="support-title">Support</h1>
                <p className="support-description">Need help? Search for answers or contact our support team.</p>

                {/* Search Bar */}
                <div className="search-bar">
                    <input type="text" placeholder="Search for help..." />
                    <button type="submit">Search</button>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`faq ${faq.open ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
                            <div className="faq-question">
                                {faq.question}
                            </div>
                            {faq.open && <div className="faq-answer">{faq.answer}</div>}
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
