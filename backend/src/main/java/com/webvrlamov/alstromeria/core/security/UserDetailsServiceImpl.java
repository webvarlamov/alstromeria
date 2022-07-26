package com.webvrlamov.alstromeria.core.security;//package com.webvarlamov.Alstroemeriaceae.common.security;
//
//import com.webvarlamov.Alstroemeriaceae.common.entity.User;
//import com.webvarlamov.Alstroemeriaceae.common.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//    @Autowired
//    UserRepository userRepository;
//
//
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User byUsername = userRepository.findByUsername(username);
//        return byUsername;
//    }
//}
