package com.webvrlamov.alstromeria.core.fetchstrategy;

import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;

public abstract class FetchStrategy {
    public abstract String getEntityGraphName();
    public abstract Class<?> getEntityProjectionClass();

    @Autowired
    private FetchStrategyRegistry registry;

    @PostConstruct
    private void postConstruct() {
        registry.add(this);
    }
}
