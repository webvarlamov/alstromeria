package com.webvrlamov.alstromeria.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Getter
@Setter
public class FreeRelations {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;
    private Class domain;
    private String subjectId;
    @ManyToOne(optional = false)
    private Project project;

    public FreeRelations() {
    }

    public FreeRelations(String id, Class domain, String subjectId, Project project) {
        this.id = id;
        this.domain = domain;
        this.subjectId = subjectId;
        this.project = project;
    }
}
