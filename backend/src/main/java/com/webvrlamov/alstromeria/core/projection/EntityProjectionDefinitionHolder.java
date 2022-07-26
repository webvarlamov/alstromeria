package com.webvrlamov.alstromeria.core.projection;
import com.webvrlamov.alstromeria.scheduler.entity.projections.PlanFlatProjection;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.ClassPathScanningCandidateComponentProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.context.support.StandardServletEnvironment;
import java.util.Set;

@Service
public class EntityProjectionDefinitionHolder {
    public <T> Class<T> getEntityProjectionByName(String projectionName) {
        final ClassPathScanningCandidateComponentProvider provider = new ClassPathScanningCandidateComponentProvider(
                true, new StandardServletEnvironment());
        Set<BeanDefinition> candidateComponents = provider.findCandidateComponents("com.webvrlamov.alstromeria");


        return (Class<T>) PlanFlatProjection.class;
    }
}
