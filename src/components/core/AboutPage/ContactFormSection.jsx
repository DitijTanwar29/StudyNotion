import React from "react";
import ContactUsForm from "../../Contact Page/ContactUsForm";

const ContactFormSection = () => {
    return (
        <div className="mx-auto">
             <h1>
                Get in touch
             </h1>
             <p>
             We’d love to here for you, Please fill out this form.
             </p>
             <div>
                <ContactUsForm/>
             </div>
        </div>
    )
}

export default ContactFormSection;