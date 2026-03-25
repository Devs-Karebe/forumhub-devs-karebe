package com.karebe.forumhub.backend.shared.exceptions.account;

import com.karebe.forumhub.backend.shared.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends ApiException {

    public InvalidCredentialsException() {
        super(
                "Invalid email or password.",
                HttpStatus.UNAUTHORIZED,
                "INVALID_CREDENTIALS"
        );
    }
}
