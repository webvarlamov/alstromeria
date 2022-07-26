package com.webvrlamov.alstromeria.core.fetchstrategy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Map;

@Component
public class FetchStrategyResolver implements HandlerMethodArgumentResolver {
    @Autowired
    public FetchStrategyRegistry fetchStrategyRegistry;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(FetchStrategy.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        Map<String, String[]> parameterMap = webRequest.getParameterMap();
        String[] fetchStrategyNameParameter = parameterMap.get("fetchStrategy");

        FetchStrategy fetchStrategy = null;

        if (fetchStrategyNameParameter != null && fetchStrategyNameParameter.length > 0) {
            fetchStrategy = this.fetchStrategyRegistry.get(fetchStrategyNameParameter[0]);
        }

        return fetchStrategy != null ? fetchStrategy : new NoFetchStrategy();
    }
}
