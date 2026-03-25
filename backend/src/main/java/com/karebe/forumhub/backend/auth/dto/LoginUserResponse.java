package com.karebe.forumhub.backend.auth.dto;

public record LoginUserResponse (
        String accessToken,
        String name,
        String email
) {}