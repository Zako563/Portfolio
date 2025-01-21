package com.example.portfolio.utils;





import com.example.portfolio.utils.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Slf4j
@RestControllerAdvice
public class GlobalControllerExceptionHandler {
    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(NotFoundException.class)
    public HttpErrorInfo handleNotFoundException(ServerHttpRequest request, Exception ex) {
        return createHttpErrorInfo(NOT_FOUND, request, ex);
    }



    private HttpErrorInfo createHttpErrorInfo(HttpStatus httpStatus, ServerHttpRequest request, Exception ex) {
        final String path = request.getPath().value();
        final String message = ex.getMessage();
        log.debug("Returning HTTP status: {} for path: {}, message: {}", httpStatus, path, message);

        return new HttpErrorInfo(httpStatus, path, message);
    }
}
