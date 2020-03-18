import React from "react";
import NetlifyForm from "react-netlify-form";

const ContactForm = () => {
  return (
    <div>
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

      <form
        name="contact"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <p class="hidden">
          <label>
            Don’t fill this out if you're human: <input name="__bf" />
          </label>
        </p>
        <p>
          <input type="text" name="name" />
        </p>
        <p>
          <input type="email" name="email" />
        </p>
        <p>
          <textarea name="message" />
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
