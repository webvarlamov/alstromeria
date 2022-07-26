package com.webvrlamov.alstromeria.core.access;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
public class DomainBasedDataAccessToken {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    public String id;

    Class<?> domainType;
    AccessPermissionEnum permission;
    String userId;
}
