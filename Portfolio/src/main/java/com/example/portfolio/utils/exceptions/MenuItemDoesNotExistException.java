package com.example.portfolio.utils.exceptions;

public class MenuItemDoesNotExistException extends RuntimeException {
    public MenuItemDoesNotExistException(String message) {
        super(message);
    }
}