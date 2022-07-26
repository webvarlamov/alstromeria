package com.webvrlamov.alstromeria.scheduler.fetchstrategy;
import com.webvrlamov.alstromeria.core.fetchstrategy.FetchStrategy;
import com.webvrlamov.alstromeria.scheduler.entity.projections.PlanFlatProjection;
import org.springframework.stereotype.Component;

@Component
public class PlanFlatFetchStrategy extends FetchStrategy {
    @Override
    public String getEntityGraphName() {
        return "Plan_FlatEntityGraph";
    }

    @Override
    public Class<?> getEntityProjectionClass() {
        return PlanFlatProjection.class;
    }
}

