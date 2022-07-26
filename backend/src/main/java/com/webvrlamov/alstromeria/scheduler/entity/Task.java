package com.webvrlamov.alstromeria.scheduler.entity;

import com.webvrlamov.alstromeria.scheduler.model.Periodic;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Task extends Periodic {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private String name;
    @OneToOne
    private TaskExecutor executor;
    @ManyToOne
    private Story story;
    @OneToOne
    private Target target;

    public Task() {
    }

    public Task(String id, String name, TaskExecutor executor, Story story, Target target) {
        this.id = id;
        this.name = name;
        this.executor = executor;
        this.story = story;
        this.target = target;
    }
}
