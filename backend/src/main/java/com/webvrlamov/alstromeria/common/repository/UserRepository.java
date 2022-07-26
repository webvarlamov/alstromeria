package com.webvrlamov.alstromeria.common.repository;

import com.webvrlamov.alstromeria.common.entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, String> {
    User findByUsername(String username);
}
