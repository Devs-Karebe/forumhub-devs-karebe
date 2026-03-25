package com.karebe.forumhub.backend.auth.controller;

import com.karebe.forumhub.backend.auth.dto.LoginUserRequest;
import com.karebe.forumhub.backend.auth.service.AuthService;
import com.karebe.forumhub.backend.shared.responses.ApiResponse;
import com.karebe.forumhub.backend.user.dto.RegisterUserRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterUserRequest userRequest) {
        var res = authService.register(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse>loginUser(
            @RequestBody @Valid LoginUserRequest userRequest
    ){
        var res = authService.login(userRequest);
        return ResponseEntity.ok(res);
    }
}