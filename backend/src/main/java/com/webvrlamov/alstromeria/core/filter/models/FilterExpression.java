package com.webvrlamov.alstromeria.core.filter.models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterExpression {
    public FilterExpressionOperator operator;
    public List<FilterExpression> expressions;
    public List<Range> ranges;

    public FilterExpression setOperator(FilterExpressionOperator operator) {
        this.operator = operator;
        return this;
    }

    public FilterExpression setExpressions(List<FilterExpression> expressions) {
        this.expressions = expressions;
        return this;
    }

    public FilterExpression setRanges(List<Range> ranges) {
        this.ranges = ranges;
        return this;
    }

    public boolean isEmpty() {
        return (expressions == null || expressions.size() == 0) && (ranges == null || ranges.size() == 0);
    }

    public boolean isEmptyRanges() {
        return (ranges == null || ranges.size() == 0);
    }

    public boolean isEmptyExpressions() {
        return (expressions == null || expressions.size() == 0);
    }

    public static FilterExpression empty() {
        return new FilterExpression()
                .setOperator(FilterExpressionOperator.AND)
                .setExpressions(new ArrayList<>())
                .setRanges(new ArrayList<>());
    }

    public static FilterExpression combine(FilterExpressionOperator operator, FilterExpression... filterExpressions) {
        return new FilterExpression()
                .setOperator(operator)
                .setExpressions(Arrays.asList(filterExpressions))
                .setRanges(new ArrayList<>());
    }

    public FilterExpression concatWith(FilterExpressionOperator operator, FilterExpression expression) {
        return new FilterExpression().setOperator(operator).setExpressions(
                Arrays.asList(this, expression)
        );
    }
}


