package com.karebe.forumhub.backend.auth.service;

import com.karebe.forumhub.backend.auth.dto.LoginUserRequest;
import com.karebe.forumhub.backend.auth.dto.LoginUserResponse;
import com.karebe.forumhub.backend.auth.repository.AuthRepository;
import com.karebe.forumhub.backend.infra.jwt.JwtTokenProvider;
import com.karebe.forumhub.backend.infra.principal.UserPrincipal;
import com.karebe.forumhub.backend.shared.exceptions.account.AccountDisabledException;
import com.karebe.forumhub.backend.shared.exceptions.account.EmailAlreadyInUseException;
import com.karebe.forumhub.backend.shared.exceptions.account.InvalidCredentialsException;
import com.karebe.forumhub.backend.shared.responses.ApiResponse;
import com.karebe.forumhub.backend.user.dto.RegisterUserRequest;
import com.karebe.forumhub.backend.user.dto.RegisterUserResponse;
import com.karebe.forumhub.backend.user.model.User;
import jakarta.transaction.Transactional;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {
    private final AuthRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtToken;

    public AuthService(
            AuthRepository repository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtToken
    ){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtToken = jwtToken;
    }

    @Transactional
    public ApiResponse register(RegisterUserRequest userRequest) {
        // validação se email já existe em relação
        if (repository.findByEmail(userRequest.email()).isPresent()){
            throw new EmailAlreadyInUseException();
        }

        User newUser = new User(
                userRequest.name(),
                userRequest.email(),
                passwordEncoder.encode(userRequest.password())
        );

        repository.save(newUser);

        // retornar o usuário criado
        var res = new ApiResponse(
                true,
                "User registered successfully",
                new RegisterUserResponse(
                        newUser.getName(),
                        newUser.getEmail()
                ),
                LocalDateTime.now()
        );

        return res;
    }

    public ApiResponse login(LoginUserRequest userRequest){
        try {

            var authToken = new UsernamePasswordAuthenticationToken(
                    userRequest.email(),
                    userRequest.password()
            );

            Authentication authentication = authenticationManager.authenticate(authToken);
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userPrincipal.getUser();
            String token = jwtToken.generateToken(user);

            return new ApiResponse(
                    true,
                    "User logged in successfully",
                    new LoginUserResponse(token, user.getName(), user.getEmail()),
                    LocalDateTime.now()
            );

        } catch (DisabledException ex) {
            throw new AccountDisabledException();
        }catch (BadCredentialsException ex) {
            throw new InvalidCredentialsException();
        }
    }
}
