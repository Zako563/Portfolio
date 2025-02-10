package com.example.portfolio.Email;

import jakarta.validation.constraints.NotBlank;

public class EmailRequest {

    @NotBlank
    private String subject;

    @NotBlank
    private String body;

    // Getters and Setters

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}