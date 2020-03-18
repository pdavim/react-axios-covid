import React from "react";
import NetlifyForm from "react-netlify-form";

const ContactForm = () => {
  return (
    <NetlifyForm name="Contact Form">
      {({ loading, error, success }) => (
        <div>
          {loading && <div>Loading...</div>}
          {error && (
            <div>Your information was not sent. Please try again later.</div>
          )}
          {success && <div>Thank you for contacting us!</div>}
          {!loading && !success && (
            <div>
              <p>
                <label>
                  Your Name: <input type="text" name="name" required />
                </label>
              </p>
              <p>
                <label>
                  Your Email: <input type="email" name="email" required />
                </label>
              </p>

              <p>
                <label>
                  Message: <textarea name="message" />
                </label>
              </p>

              <button>Submit</button>
            </div>
          )}
        </div>
      )}
    </NetlifyForm>
  );
};

export default ContactForm;
