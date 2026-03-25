package com.karebe.forumhub.backend.auth.dto;

public record LoginUserRequest(
        String email,
        String password
) {
}
