package com.karebe.forumhub.backend.shared.exceptions.account;


import com.karebe.forumhub.backend.shared.exceptions.ApiException;
import org.springframework.http.HttpStatus;

public class AccountDisabledException extends ApiException {

    public AccountDisabledException() {
        super(
                "Your account has been deactivated. Please request account reactivation.",
                HttpStatus.FORBIDDEN,
                "ACCOUNT_DISABLED"
        );
    }
}