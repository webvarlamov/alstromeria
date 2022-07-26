package com.webvrlamov.alstromeria.core.filter.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.webvrlamov.alstromeria.core.filter.models.FilterExpression;
import com.webvrlamov.alstromeria.core.filter.models.Range;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class FilterExpressionDeserializationService {

    public List<Range> toRanges(String rangesJson) {
        Gson gson = new Gson();
        List<Range> ranges = new ArrayList<>();
        Type listType = new TypeToken<List<Range>>(){}.getType();
        try {
            List<Range> result = gson.fromJson(rangesJson, listType);
            if (result != null) {
                ranges = result;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ranges;
    }

    public FilterExpression toFilterExpression(String filterExpressionJson) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            FilterExpression filterExpression = objectMapper.readValue(filterExpressionJson, FilterExpression.class);
            return filterExpression;
        } catch (Exception ignored) {
            return null;
        }
    }
}
