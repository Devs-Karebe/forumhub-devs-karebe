package com.karebe.forumhub.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterUserRequest(
        @NotBlank
        @Size(min = 3)
        String name,
        @Email
        String email,
        @NotBlank
        String password
) {
}
