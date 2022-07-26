package com.webvrlamov.alstromeria.core.filter.service;

import com.webvrlamov.alstromeria.core.filter.models.FilterExpression;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Map;

@Component
public class FilterExpressionResolver implements HandlerMethodArgumentResolver {
    private final Logger logger = LoggerFactory.getLogger(FilterExpressionResolver.class);

    @Autowired
    public FilterExpressionDeserializationService filterExpressionDeserializationService;

    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(FilterExpression.class);
    }


    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        try {
            Map<String, String[]> parameterMap = webRequest.getParameterMap();
            String[] expressions = parameterMap.get("filterExpression");
            if (expressions != null) {
                String first = expressions[0];
                if (first != null) {
                    return filterExpressionDeserializationService.toFilterExpression(first);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception e) {
            logger.error("Cannot resolve filter expression");
            e.printStackTrace();
            return null;
        }
    }
}
