package com.webvrlamov.alstromeria.scheduler.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class Target {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    @OneToOne
    private Task task;
    @OneToOne
    private Story story;

    public Target() {
    }

    public Target(String id, String name, Task task, Story story) {
        this.id = id;
        this.name = name;
        this.task = task;
        this.story = story;
    }
}
