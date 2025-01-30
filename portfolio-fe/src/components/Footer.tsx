import React from 'react';
import './Footer.css';

const Footer: React.FC = (): JSX.Element => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">© 2025 Zakaria Boudboub | All Rights Reserved</p>
                <div className="footer-socials">
                    <a href="https://www.linkedin.com/in/zakaria-boudboub-509610324/" target="_blank" rel="noopener noreferrer">
                        LinkedIn <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/3536/3536505.png"} alt="linkedin" className={"social-image"}/>
                    </a>
                    <a href="https://github.com/Zako563" target="_blank" rel="noopener noreferrer">
                        GitHub <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/1051/1051275.png"} alt="github" className={"social-image"}/>
                    </a>
                    <a href="zakariaboudboub51@gmail.com">
                        Email <br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/9068/9068642.png"} alt="mail" className={"social-image"}/>
                    </a>
                    <a href="/assets/Cv.pdf" download="sunveercv.pdf" className="cv-button">
                        Download CV<br></br>
                        <img src={"https://cdn-icons-png.flaticon.com/128/2195/2195529.png"} alt="cv" className={"social-image"}/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;