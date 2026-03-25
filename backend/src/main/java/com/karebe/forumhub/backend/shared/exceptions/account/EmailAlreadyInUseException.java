package com.karebe.forumhub.backend.shared.exceptions.account;

import com.karebe.forumhub.backend.shared.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class EmailAlreadyInUseException extends ApiException {

    public EmailAlreadyInUseException() {
        super(
                "Email already in use",
                HttpStatus.BAD_REQUEST,
                "EMAIL_ALREADY_IN_USE"
        );
    }
}
