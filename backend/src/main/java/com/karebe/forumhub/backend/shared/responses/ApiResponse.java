package com.karebe.forumhub.backend.shared.responses;

import java.time.LocalDateTime;

public record ApiResponse(
        boolean success,
        String message,
        Object data,
        LocalDateTime timestamp
) {
}
