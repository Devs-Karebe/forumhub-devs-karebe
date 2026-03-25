package com.karebe.forumhub.backend.auth.dto;

public record RegisterUserResponse(
        String name,
        String email
) {
}