package com.webvrlamov.alstromeria.core.projection.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class EntitiesWrapper<T> {
    List<T> entities;
}
