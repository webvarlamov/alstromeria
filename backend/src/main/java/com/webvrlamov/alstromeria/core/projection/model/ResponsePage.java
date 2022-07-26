package com.webvrlamov.alstromeria.core.projection.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Sort;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
public class ResponsePage<E> {
    public long page;
    public long size;
    public long pagesCount;
    public long itemsCount;
    public Sort sort;
    public List<?> items;
}
