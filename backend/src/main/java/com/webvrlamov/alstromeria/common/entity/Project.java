package com.webvrlamov.alstromeria.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    public String id;
    public String name;
    public String description;
    @OneToOne
    public Command command;
    @OneToMany
    public List<FreeRelations> relations;

    public Project() {
    }

    public Project(String id, String name, String description, Command command, List<FreeRelations> relations) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.command = command;
        this.relations = relations;
    }
}
