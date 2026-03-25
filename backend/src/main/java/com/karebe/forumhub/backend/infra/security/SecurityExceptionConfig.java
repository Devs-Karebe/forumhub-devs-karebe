package com.karebe.forumhub.backend.infra.security;


import com.karebe.forumhub.backend.infra.handlers.CustomAccessDeniedHandler;
import com.karebe.forumhub.backend.infra.handlers.CustomAuthenticationEntryPoint;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityExceptionConfig {

    public SecurityExceptionConfig(
            CustomAuthenticationEntryPoint authenticationEntryPoint,
            CustomAccessDeniedHandler accessDeniedHandler
    ) {
        // apenas garante criação dos beans
    }
}