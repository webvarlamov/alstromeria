package com.webvrlamov.alstromeria.core.controller;

import com.webvrlamov.alstromeria.common.entity.HasId;
import com.webvrlamov.alstromeria.core.fetchstrategy.FetchStrategy;
import com.webvrlamov.alstromeria.core.fetchstrategy.FetchStrategyRegistry;
import com.webvrlamov.alstromeria.core.filter.models.FilterExpression;
import com.webvrlamov.alstromeria.core.manager.EntityControllerManager;
import com.webvrlamov.alstromeria.core.projection.EntityProjector;
import com.webvrlamov.alstromeria.common.repository.ControllerRepository;
import com.webvrlamov.alstromeria.core.projection.model.ResponsePage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

public class EntityController<Entity extends HasId, ID> implements ControllerRepository<Entity, ID> {
    @Autowired
    public EntityControllerManager<Entity> entityControllerManager;
    @Autowired
    public FetchStrategyRegistry fetchStrategyRegistry;
    @Autowired
    public EntityProjector projector;

    public Class<Entity> domainType = null;

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponsePage<?> findAll(
            Sort sort,
            Pageable pageable,
            FetchStrategy fetchStrategy,
            FilterExpression filterExpression
    ) {
        List<Entity> entities = this.entityControllerManager.findAll(
                this.domainType,
                pageable,
                sort,
                filterExpression,
                fetchStrategy.getEntityGraphName()
        );

        long entitiesTotalCount = this.entityControllerManager.count(this.domainType, filterExpression);

        Class<?> entityProjectionClass = fetchStrategy.getEntityProjectionClass();

        List<?> items = entityProjectionClass != null
                ? this.projector.createProjectionForEachOf(entities, entityProjectionClass)
                : entities;

        return new ResponsePage(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                getPageCount(pageable.getPageSize(), entitiesTotalCount),
                entitiesTotalCount,
                sort,
                items
        );
    }

    @RequestMapping(value = "/findSuggestions", method = RequestMethod.GET)
    public ResponsePage<?> findSuggestions(
            Pageable pageable,
            FilterExpression filterExpression,
            @RequestParam String attributeKey,
            Sort sort
    ) {
        List<HasId> suggestions = entityControllerManager.findSuggestions(
                this.domainType,
                pageable,
                sort,
                filterExpression,
                attributeKey
        );

        long suggestionsTotalCount = entityControllerManager.suggestionsCount(this.domainType, filterExpression, attributeKey);

        return new ResponsePage(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                getPageCount(pageable.getPageSize(), suggestionsTotalCount),
                suggestionsTotalCount,
                sort,
                suggestions
        );
    }

    private long getPageCount(long pageSize, long elementsTotalCount) {
        double c = ((double) elementsTotalCount/ pageSize) * 100;
        return (int) Math.ceil(c/ 100);
    }

    @Transactional
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public Entity save(@RequestBody Entity entity) {
        this.entityControllerManager.save(this.domainType, entity);
        return entity;
    }

    @RequestMapping(value = "/findById/{id}", method = RequestMethod.GET)
    public Entity findById(
            @PathVariable String id,
            FetchStrategy fetchStrategy
    ) {
        Entity result = this.entityControllerManager.findById(this.domainType, id, fetchStrategy.getEntityGraphName());

        Class<?> entityProjectionClass = fetchStrategy.getEntityProjectionClass();

        return entityProjectionClass != null
                ? (Entity) this.projector.createProjectionFor(result, entityProjectionClass)
                : result;
    }

    @RequestMapping(value = "/existsById/{id}", method = RequestMethod.GET)
    public boolean existsById(@PathVariable String id) {
        return this.entityControllerManager.existsById(this.domainType, id);
    }

    @RequestMapping(value = "/findAllById", method = RequestMethod.GET)
    public List<?> findAllById(
            @RequestParam List<String> ids,
            FetchStrategy fetchStrategy
    ) {
        List<Entity> resultList = this.entityControllerManager.findAllById(this.domainType, ids, fetchStrategy.getEntityGraphName());

        Class<?> entityProjectionClass = fetchStrategy.getEntityProjectionClass();

        return entityProjectionClass != null
                ? this.projector.createProjectionForEachOf(resultList, entityProjectionClass)
                : resultList;
    }

    @RequestMapping(value = "/count", method = RequestMethod.GET)
    public long count(FilterExpression filterExpression) {
        return this.entityControllerManager.count(this.domainType, filterExpression);
    }

    @RequestMapping(value = "/deleteById", method = RequestMethod.DELETE)
    public void deleteById(@RequestParam String id) {
        this.entityControllerManager.deleteById(this.domainType, id);
    }
}
