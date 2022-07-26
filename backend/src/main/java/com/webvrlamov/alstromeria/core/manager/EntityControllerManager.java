package com.webvrlamov.alstromeria.core.manager;
import com.webvrlamov.alstromeria.common.entity.HasId;
import com.webvrlamov.alstromeria.core.dto.Suggestion;
import com.webvrlamov.alstromeria.core.filter.models.FilterExpression;
import com.webvrlamov.alstromeria.core.filter.models.Range;
import com.webvrlamov.alstromeria.core.filter.models.RangeOperator;
import org.hibernate.graph.GraphSemantic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.jpa.repository.query.QueryUtils.toOrders;

@Service
public class EntityControllerManager<Entity extends HasId> {
    @PersistenceContext
    public EntityManager entityManager;
    @Autowired
    public FilterExpressionToPredicateTransformatorService transformator;

    public List<Entity> findAll(Class<Entity> domainType, Pageable pageable, Sort sort, FilterExpression filterExpression, String entityGraphName) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        EntityGraph<?> graph = entityGraphName != null ? entityManager.getEntityGraph(entityGraphName) : null;

        CriteriaQuery<?> criteriaQuery = criteriaBuilder.createQuery(domainType);
        Root<?> root = criteriaQuery.from(domainType);
        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        if (predicate != null)
            criteriaQuery.where(predicate);

        if (sort != null) {
            List<Order> orders = toOrders(sort, root, criteriaBuilder);
            criteriaQuery.orderBy(orders);
        }

        TypedQuery<?> query = entityManager.createQuery(criteriaQuery);

        if (graph != null) {
            query.setHint(GraphSemantic.FETCH.getJpaHintName(), graph);
        }

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        return (List<Entity>) query.getResultList();
    }

    public void save(Class<Entity> domainType,Entity entity) {
        String id = entity.getId();

        if (id != null) {
            this.entityManager.merge(entity);
        } else {
            this.entityManager.persist(entity);
        }
    }

    public Entity findById(Class<Entity> domainType, String id, String entityGraphName) {
        FilterExpression filterExpression = FilterExpression.empty();

        Range range = new Range()
                .setExclude(false)
                .setOperator(RangeOperator.EQ)
                .setProperty("id")
                .setValue1(id);

        filterExpression.setRanges(List.of(range));

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        EntityGraph<?> graph = entityGraphName != null ? entityManager.getEntityGraph(entityGraphName) : null;

        CriteriaQuery<?> criteriaQuery = criteriaBuilder.createQuery(domainType);
        Root<?> root = criteriaQuery.from(domainType);
        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        criteriaQuery.where(predicate);

        TypedQuery<?> query = entityManager.createQuery(criteriaQuery);

        if (graph != null) {
            query.setHint(GraphSemantic.FETCH.getJpaHintName(), graph);
        }

        return (Entity) query.getSingleResult();
    }

    public boolean existsById(Class<Entity> domainType, String id) {
        return entityManager.find(domainType, id) != null;
    }

    public List<Entity> findAllById(Class<Entity> domainType, List<String> ids, String entityGraphName) {
        FilterExpression filterExpression = FilterExpression.empty();

        ArrayList list = new ArrayList();
        ids.forEach(id -> {
            list.add(id);
        });

        Range range = new Range()
                .setExclude(false)
                .setOperator(RangeOperator.IN)
                .setProperty("id")
                .setValues(list);

        filterExpression.setRanges(List.of(range));

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        EntityGraph<?> graph = entityGraphName != null ? entityManager.getEntityGraph(entityGraphName) : null;

        CriteriaQuery<?> criteriaQuery = criteriaBuilder.createQuery(domainType);
        Root<?> root = criteriaQuery.from(domainType);
        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        criteriaQuery.where(predicate);

        TypedQuery<?> query = entityManager.createQuery(criteriaQuery);

        if (graph != null) {
            query.setHint(GraphSemantic.FETCH.getJpaHintName(), graph);
        }

        return (List<Entity>) query.getResultList();
    }

    public long count(Class<?> domainType, FilterExpression filterExpression) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> query = criteriaBuilder.createQuery(Long.class);
        Root<?> root = query.from(domainType);

        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        query.select(criteriaBuilder.countDistinct(root));

        if (predicate != null)
            query.where(predicate);

        TypedQuery<Long> countQuery = entityManager.createQuery(query);

        return countQuery.getSingleResult();
    }

    @Transactional
    public void deleteById(Class<Entity> domainType, String id) {
        Entity entity = this.entityManager.find(domainType, id);

        if (entity != null) {
            this.entityManager.remove(entity);
        }
    }

    public List<HasId> findSuggestions(Class<Entity> domainType, Pageable pageable, Sort sort, FilterExpression filterExpression, String propertyName) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<?> criteriaQuery = criteriaBuilder.createQuery(domainType);

        Root<?> root = criteriaQuery.from(domainType);
        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        if (predicate != null) criteriaQuery.where(predicate);

        criteriaQuery.select(root.get(propertyName)).distinct(true);

        TypedQuery<?> query = entityManager.createQuery(criteriaQuery);

        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
        query.setMaxResults(pageable.getPageSize());

        List<HasId> collect = query.getResultList()
                .stream()
                .map(string -> new Suggestion(String.valueOf(string.hashCode()), string))
                .collect(Collectors.toList());

        return collect;
    }

    public long suggestionsCount(Class<Entity> domainType, FilterExpression filterExpression, String propertyName) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<?> root = criteriaQuery.from(domainType);

        Predicate predicate = transformator.buildPredicateFromFilterExpression(filterExpression, criteriaBuilder, root);

        criteriaQuery.select(criteriaBuilder.countDistinct(root.get(propertyName)));

        if (predicate != null)
            criteriaQuery.where(predicate);

        TypedQuery<Long> countQuery = entityManager.createQuery(criteriaQuery);

        return countQuery.getSingleResult();
    }
}
