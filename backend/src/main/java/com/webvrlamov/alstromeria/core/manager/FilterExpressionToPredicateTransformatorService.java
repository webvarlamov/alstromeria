package com.webvrlamov.alstromeria.core.manager;
import com.webvrlamov.alstromeria.core.filter.models.FilterExpression;
import com.webvrlamov.alstromeria.core.filter.models.FilterExpressionOperator;
import com.webvrlamov.alstromeria.core.filter.models.Range;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FilterExpressionToPredicateTransformatorService {

    public Predicate buildPredicateFromFilterExpression(FilterExpression filterExpression, CriteriaBuilder criteriaBuilder, Root<?> root) {
        if (filterExpression != null) {
            if (filterExpression.getExpressions() != null) {
                List<Predicate> collect = filterExpression.getExpressions()
                        .stream()
                        .map(expression -> buildPredicateFromFilterExpression(expression, criteriaBuilder, root))
                        .collect(Collectors.toList());

                Predicate[] predicatesArray = new Predicate[collect.size()];
                collect.toArray(predicatesArray);

                if (filterExpression.getOperator().equals(FilterExpressionOperator.AND)) {
                    return criteriaBuilder.and(predicatesArray);
                } else if (filterExpression.getOperator().equals(FilterExpressionOperator.OR)) {
                    return criteriaBuilder.or(predicatesArray);
                }
            } else if (filterExpression.getRanges() != null) {
                return buildPredicateFromExpressionRanges(filterExpression.getRanges(), criteriaBuilder, root, filterExpression.getOperator());
            }
        }

        return null;
    }

    private Predicate buildPredicateFromExpressionRanges(List<Range> ranges, CriteriaBuilder criteriaBuilder, Root<?> root, FilterExpressionOperator operator) {
        Predicate[] predicates = convertRangesToPredicates(ranges, criteriaBuilder, root);
        if (operator.equals(FilterExpressionOperator.AND)) {
            return criteriaBuilder.and(predicates);
        } else if (operator.equals(FilterExpressionOperator.OR)) {
            return criteriaBuilder.or(predicates);
        }
        return null;
    }

    private Predicate[] convertRangesToPredicates(List<Range> ranges, CriteriaBuilder criteriaBuilder, Root<?> root) {
        List<Predicate> predicates = ranges
                .stream()
                .map(range -> {
                    // TODO: Валидация
                    switch (range.getOperator()) {
                        case EQ:   return criteriaBuilder.equal(getPath(root, range.getProperty()), range.getValue1());
                        case NE:   return criteriaBuilder.notEqual(getPath(root, range.getProperty()), range.getValue1());
                        case LE:   return criteriaBuilder.lessThanOrEqualTo(getPath(root, range.getProperty()), (Comparable) range.getValue1());
                        case GE:   return criteriaBuilder.greaterThanOrEqualTo(getPath(root, range.getProperty()), (Comparable) range.getValue1());
                        case BT:   return criteriaBuilder.between(getPath(root, range.getProperty()), (Comparable) range.getValue1(), (Comparable) range.getValue2());
                        case LIKE:      return criteriaBuilder.like(criteriaBuilder.lower(getPath(root, range.getProperty())), "%" + range.getValue1().toString().toLowerCase() + "%");
                        case STARTWITH: return criteriaBuilder.like(criteriaBuilder.lower(getPath(root, range.getProperty())),  range.getValue1().toString().toLowerCase() + "%");
                        case ENDWITH:   return criteriaBuilder.like(criteriaBuilder.lower(getPath(root, range.getProperty())), "%" + range.getValue1().toString().toLowerCase());
                        case IN:   return criteriaBuilder.in(getPath(root, range.getProperty())).value(range.getValues());
                        // TODO: Временно работает в условиях что используется для сущностей с id:Long
                        case ISMEMBER: return criteriaBuilder.isMember(Long.parseLong(range.getValue1().toString()), getPath(root, range.getProperty()));
                        default: return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        Predicate[] predicatesArray = new Predicate[predicates.size()];
        predicates.toArray(predicatesArray);
        return predicatesArray;
    }

    private Path getPath(Root root, String attributeName) {
        Path path = root;
        for (String part : attributeName.split("\\.")) {
            path = path.get(part);
        }
        return path;
    }
}
