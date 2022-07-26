package com.webvrlamov.alstromeria.scheduler.bootstrap;
import com.webvrlamov.alstromeria.common.repository.StoryRepository;
import com.webvrlamov.alstromeria.scheduler.entity.Story;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.Arrays;

@Service
public class Bootstraper {
    @Autowired
    StoryRepository storyRepository;

    @PostConstruct
    @Transactional
    public void postConstruct() {
    }
}
