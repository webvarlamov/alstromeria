package com.webvrlamov.alstromeria.core.fetchstrategy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.HashMap;

@Service
public class FetchStrategyRegistry {
    private final Logger logger = LoggerFactory.getLogger(FetchStrategyRegistry.class);
    private final HashMap<String, FetchStrategy> map = new HashMap<>();

    public void add(FetchStrategy fetchStrategy) {
        String name = fetchStrategy.getClass().getSimpleName();
        if (map.get(name) != null) {
            logger.error("FetchStrategy name='" + name + "' is exists! FetchStrategy name must be unique.");
        } else {
            this.map.put(name, fetchStrategy);
            logger.info("FetchStrategy name='" + name + "' was added to FetchStrategyRegistry.");
        }
    }

    public FetchStrategy get(String fetchStrategyName) {
        return map.get(fetchStrategyName);
    }
}

