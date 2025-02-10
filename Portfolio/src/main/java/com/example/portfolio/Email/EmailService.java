package com.example.portfolio.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {


    private JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("zakariaboudboub51@gmail.com"); // Set the sender email (from the request)
        email.setTo(to); // Change this to your email
        email.setSubject(subject);
        email.setText(body);
        mailSender.send(email);
    }

}
