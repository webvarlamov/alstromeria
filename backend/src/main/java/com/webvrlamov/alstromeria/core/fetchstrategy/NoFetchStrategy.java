package com.webvrlamov.alstromeria.core.fetchstrategy;

public class NoFetchStrategy extends FetchStrategy {
    @Override
    public String getEntityGraphName() {
        return null;
    }

    @Override
    public Class<?> getEntityProjectionClass() {
        return null;
    }
}
