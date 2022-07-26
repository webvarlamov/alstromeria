package com.webvrlamov.alstromeria.core.config;

import com.webvrlamov.alstromeria.core.fetchstrategy.FetchStrategyResolver;
import com.webvrlamov.alstromeria.core.filter.service.FilterExpressionResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;
@Configuration(proxyBeanMethods = false)
public class CustomRepositoryRestMvcConfiguration implements WebMvcConfigurer {
    @Autowired
    FilterExpressionResolver filterExpressionResolver;
    @Autowired
    FetchStrategyResolver fetchStrategyResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(filterExpressionResolver);
        resolvers.add(fetchStrategyResolver);
        WebMvcConfigurer.super.addArgumentResolvers(resolvers);
    }
}
