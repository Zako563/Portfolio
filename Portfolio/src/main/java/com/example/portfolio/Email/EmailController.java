package com.example.portfolio.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmailController {

    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        // Fixed 'to' address
        String to = "zakariaboudboub51@gmail.com";
        String subject = emailRequest.getSubject();
        String body = emailRequest.getBody();

        emailService.sendEmail(to, subject, body);
        return new ResponseEntity<>("Email sent successfully", HttpStatus.OK);
    }
}
