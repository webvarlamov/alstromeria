package com.webvrlamov.alstromeria.core.projection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntityProjector {
    private final SpelAwareProxyProjectionFactory projectionFactory = new SpelAwareProxyProjectionFactory();

    @Autowired
    public EntityProjectionDefinitionHolder projectionDefinitionHolder;

    public List<Object> createProjectionForEachOf(List<?> list, Class<?> projection) {
        return list.stream().map(entity -> projectionFactory.createProjection(projection, entity)).collect(Collectors.toList());
    }

    public <T> Object  createProjectionFor(T entity, Class<?> projection) {
        return projectionFactory.createProjection(projection, entity);
    }
}
