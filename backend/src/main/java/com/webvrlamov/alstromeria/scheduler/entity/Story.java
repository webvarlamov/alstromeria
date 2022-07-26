package com.webvrlamov.alstromeria.scheduler.entity;

import com.webvrlamov.alstromeria.common.entity.HasId;
import com.webvrlamov.alstromeria.scheduler.model.Periodic;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;


@Entity
@Getter
@Setter
public class Story extends Periodic implements HasId {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;

    @OneToOne(fetch = FetchType.LAZY)
    private TaskExecutor holder;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Task> taskList;

    @OneToOne(fetch = FetchType.LAZY)
    private Target target;

    @ManyToOne(fetch = FetchType.LAZY)
    private Plan plan;

    public Story() {
    }

    public Story(String id, TaskExecutor holder, List<Task> taskList, Target target, Plan plan) {
        this.id = id;
        this.holder = holder;
        this.taskList = taskList;
        this.target = target;
        this.plan = plan;
    }
}
