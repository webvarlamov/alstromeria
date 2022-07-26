package com.webvrlamov.alstromeria.scheduler.controller;

import com.webvrlamov.alstromeria.core.controller.EntityController;
import com.webvrlamov.alstromeria.scheduler.entity.Story;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/story")
public class StoryController extends EntityController<Story, String> {
    public StoryController() {
        domainType = Story.class;
    }
}
