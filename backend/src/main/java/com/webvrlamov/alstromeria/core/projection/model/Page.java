package com.webvrlamov.alstromeria.core.projection.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigInteger;

@Data
@AllArgsConstructor
public class Page {
    int number;
    int size;
    BigInteger totalElements;
    int totalPages;
}
