package com.webvrlamov.alstromeria.core.security;//package com.webvarlamov.Alstroemeriaceae.common.security;
//
//import com.webvarlamov.Alstroemeriaceae.common.repository.UserRepository;
//import com.webvarlamov.Alstroemeriaceae.scheduler.entity.Plan;
//import com.webvarlamov.Alstroemeriaceae.scheduler.entity.Story;
//import com.webvarlamov.Alstroemeriaceae.scheduler.entity.Target;
//import com.webvarlamov.Alstroemeriaceae.scheduler.entity.Task;
//import com.webvarlamov.Alstroemeriaceae.scheduler.repository.PlanRepository;
//import com.webvarlamov.Alstroemeriaceae.scheduler.repository.TargetRepository;
//import com.webvarlamov.Alstroemeriaceae.scheduler.repository.TaskExecutorRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import javax.annotation.PostConstruct;
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.persistence.Query;
//import javax.transaction.Transactional;
//import java.util.List;
//import java.util.Optional;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//////    @Autowired
//////    UserRepository userRepository;
//////    @Autowired
//////    PlanRepository planRepository;
//////    @Autowired
//////    TaskExecutorRepository taskExecutorRepository;
//////    @Autowired
//////    TargetRepository targetRepository;
////    @PersistenceContext
////    EntityManager entityManager;
////
////    @Autowired
////    UserDetailsServiceImpl userDetailsService;
//
////    @Bean
////    public PasswordEncoder encoder() {
////        return new BCryptPasswordEncoder(8);
////    }
////
////    @Bean
////    public DaoAuthenticationProvider daoAuthenticationProvider() {
////        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
////        provider.setPasswordEncoder(encoder());
////        provider.setUserDetailsService(userDetailsService);
////        return provider;
////    }
////
////    @PostConstruct
////    @Transactional
////    public void postConstruct() {
////
////    }
//}
