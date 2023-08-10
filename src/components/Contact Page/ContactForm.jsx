import React from "react"
import ContactUsForm from "./ContactUsForm"
import ContactDetails from "./ContactDetails"

const ContactForm = () => {
    return (
        <div className="flex flex-row items-center justify-between gap-5 p-5 ">
            <ContactDetails/>
            <ContactForm/>
        </div>
    )
}

export default ContactForm