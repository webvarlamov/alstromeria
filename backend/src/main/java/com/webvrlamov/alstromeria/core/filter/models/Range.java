package com.webvrlamov.alstromeria.core.filter.models;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.webvrlamov.alstromeria.core.filter.service.CustomRangeValueDeserializer;
import lombok.Data;

import java.util.List;

@Data
public class Range {
    @Deprecated
    boolean exclude;
    RangeOperator operator;
    String property;
    @JsonDeserialize(using = CustomRangeValueDeserializer.class)
    Object value1;
    @JsonDeserialize(using = CustomRangeValueDeserializer.class)
    Object value2;
    List<Object> values;

    public Range() {}

    public Range(boolean exclude, RangeOperator operator, String property) {
        this.exclude = exclude;
        this.operator = operator;
        this.property = property;
    }

    public Range setExclude(boolean exclude) {
        this.exclude = exclude;
        return this;
    }

    public Range setOperator(RangeOperator operator) {
        this.operator = operator;
        return this;
    }

    public Range setProperty(String property) {
        this.property = property;
        return this;
    }

    public Range setValue1(Object value1) {
        this.value1 = value1;
        return this;
    }

    public Range setValue2(Object value2) {
        this.value2 = value2;
        return this;
    }

    public Range setValues(List<Object> values) {
        this.values = values;
        return this;
    }
}
