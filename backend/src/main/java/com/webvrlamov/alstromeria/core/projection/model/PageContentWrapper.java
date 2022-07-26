package com.webvrlamov.alstromeria.core.projection.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageContentWrapper<T> {
    Object _embedded;
    Page page;
}
