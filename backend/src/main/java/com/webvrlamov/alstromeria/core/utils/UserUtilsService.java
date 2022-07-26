package com.webvrlamov.alstromeria.core.utils;//package com.webvarlamov.Alstroemeriaceae.common.utils;
//
//import com.webvarlamov.Alstroemeriaceae.common.entity.User;
//import com.webvarlamov.Alstroemeriaceae.common.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.PostConstruct;
//import java.util.Arrays;
//import java.util.List;
//
//@Service
//public class UserUtilsService {
//    @Autowired
//    public UserRepository userRepository;
//    @Autowired
//    public PasswordEncoder passwordEncoder;
//    private List<String> mockUserNamesList = Arrays.asList(
//            "admin", "Alena", "Dima","Katia", "Nasty",
//            "Artur", "Olga", "Denis", "Ury", "Artem"
//    );
//
//
//    @PostConstruct
//    public void initApplicationUsers() {
//        long count = userRepository.count();
//        if (count == 0) {
//            for (int i = 0; i < 10; i++) {
//                User user = generateApplicationUser(i);
//                userRepository.save(user);
//            }
//        }
//    }
//
//    private User generateApplicationUser(int i) {
//        User user = new User();
//        user.setAccountNonExpired(true);
//        user.setAccountNonLocked(true);
//        user.setEnabled(true);
//        user.setPassword(passwordEncoder.encode("admin"));
//        user.setEmail(mockUserNamesList.get(i).toLowerCase() + "@yandex.ru");
//        user.setUsername(mockUserNamesList.get(i));
//        user.setCredentialsNonExpired(true);
//        return user;
//    }
//}
