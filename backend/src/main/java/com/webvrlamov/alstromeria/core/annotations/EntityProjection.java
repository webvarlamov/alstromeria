package com.webvrlamov.alstromeria.core.annotations;

import java.lang.annotation.*;


@Inherited
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
public @interface EntityProjection {
    Class<?>[] types();
    String name() default "";
}
