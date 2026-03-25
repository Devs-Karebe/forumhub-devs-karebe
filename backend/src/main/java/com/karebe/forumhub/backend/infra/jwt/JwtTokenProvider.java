package com.karebe.forumhub.backend.infra.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.karebe.forumhub.backend.user.model.User;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.List;

@Service
public class JwtTokenProvider {

    private final JwtProperties properties;
    private final Algorithm algorithm;

    public JwtTokenProvider(JwtProperties properties) {
        this.properties = properties;
        this.algorithm = Algorithm.HMAC256(properties.getSecret());
    }

    public String generateToken(User user) {

        return JWT.create()
                .withIssuer(properties.getIssuer())
                .withSubject(user.getId().toString())
                .withClaim("roles", List.of(user.getRole().name()))
                .withExpiresAt(new Date(
                        Instant.now()
                                .plusMillis(properties.getExpiration())
                                .toEpochMilli()
                ))
                .sign(algorithm);
    }

    public String validateAndGetSubject(String token) {
        return JWT.require(algorithm)
                .withIssuer(properties.getIssuer())
                .build()
                .verify(token)
                .getSubject();
    }
}
