package com.webvrlamov.alstromeria.scheduler.controller;

import com.webvrlamov.alstromeria.core.controller.EntityController;
import com.webvrlamov.alstromeria.scheduler.entity.Plan;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plan")
public class PlansController extends EntityController<Plan, String> {
    public PlansController(
    ) {
        domainType = Plan.class;
    }
}
