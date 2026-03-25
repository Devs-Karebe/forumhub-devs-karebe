package com.karebe.forumhub.backend.infra.authentication;

import com.karebe.forumhub.backend.auth.repository.AuthRepository;
import com.karebe.forumhub.backend.infra.principal.UserPrincipal;
import com.karebe.forumhub.backend.user.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsServiceImpl implements UserDetailsService {
    private final AuthRepository repository;

    public CustomUserDetailsServiceImpl(
            AuthRepository repository
    ){

        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email){
        User user = repository.findByEmail(email).orElseThrow(
                        () -> new UsernameNotFoundException("User Not Found")
                );

        return new UserPrincipal(user);
    }
}
