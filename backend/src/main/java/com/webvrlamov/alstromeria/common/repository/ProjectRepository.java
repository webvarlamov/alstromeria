package com.webvrlamov.alstromeria.common.repository;

import com.webvrlamov.alstromeria.common.entity.Project;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, String> {
}
