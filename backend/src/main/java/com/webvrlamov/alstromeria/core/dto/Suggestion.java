package com.webvrlamov.alstromeria.core.dto;

import com.webvrlamov.alstromeria.common.entity.HasId;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Suggestion implements HasId {
    String id;
    Object value;
}
