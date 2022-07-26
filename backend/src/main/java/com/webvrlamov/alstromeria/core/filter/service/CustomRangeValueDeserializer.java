package com.webvrlamov.alstromeria.core.filter.service;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CustomRangeValueDeserializer extends StdDeserializer<Object> {
    SimpleDateFormat dateTimeSDF = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    SimpleDateFormat dateSDF = new SimpleDateFormat("yyyy-MM-dd");

    public CustomRangeValueDeserializer() { this(null); }

    public CustomRangeValueDeserializer(Class<Object> t) {
        super(t);
    }


    public Object deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        Object value = p.readValueAs(Object.class);
        if (looksLikeDateTime(value)) {
            Calendar calendar = parseCalendar((String) value);
            return calendar;
        } else {
            return value;
        }
    }

    private Calendar parseCalendar(String string) {
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(dateTimeSDF.parse(String.valueOf(string)));
            return calendar;
        } catch (ParseException ignored) {
            try {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(dateSDF.parse(String.valueOf(string)));
                return calendar;
            } catch (ParseException ignored2) {}
        }

        return null;
    }

    private boolean looksLikeDateTime(Object object) {
        try {
            String string = String.valueOf(object);
            string = string.replaceAll("\"", "");
            String dateString = string.split(" ")[0];
            return dateString.matches("\\d{4}-\\d{2}-\\d{2}");
        } catch (Exception e) {
            return false;
        }
    }
}
