package com.webvrlamov.alstromeria.scheduler.entity;

import com.webvrlamov.alstromeria.common.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class TaskExecutor {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    @OneToOne(fetch = FetchType.LAZY)
    private User user;

    public TaskExecutor() {
    }

    public TaskExecutor(String id, User user) {
        this.id = id;
        this.user = user;
    }
}
