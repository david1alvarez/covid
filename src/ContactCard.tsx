import React from 'react';
import './ContactCard.css'

class ContactCard extends React.Component {
    render() {
        return (
            <div className="ContactCard">
                <div>David Alvarez Contact</div>
                <div>Email: <a href="mailto:d.alvar.work@gmail.com">d.alvar.work@gmail.com</a></div>
                <div>Phone: <a href="tel:+12068905009">206-890-5009</a></div>
                <div>LinkedIn: <a 
                    href="https://linkedin.com/in/david-g-alvarez" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >david-g-alvarez</a></div>
            </div>
        )
    }
}

export default ContactCard;