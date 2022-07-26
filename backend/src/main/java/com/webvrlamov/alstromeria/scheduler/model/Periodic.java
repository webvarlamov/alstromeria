package com.webvrlamov.alstromeria.scheduler.model;

import lombok.Data;

import java.util.Calendar;

@Data
public class Periodic {
    Calendar startDateTime;
    Calendar endDateTime;
}
