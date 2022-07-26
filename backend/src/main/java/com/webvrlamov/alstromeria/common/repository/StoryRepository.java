package com.webvrlamov.alstromeria.common.repository;

import com.webvrlamov.alstromeria.scheduler.entity.Story;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends PagingAndSortingRepository<Story, String> {
}
