package com.webvrlamov.alstromeria.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.List;

@Entity
@Getter
@Setter
public class Command {
    @Id
    @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    public String id;
    public String name;
    @ManyToMany
    public List<User> userList;

    public Command() {
    }

    public Command(String id, String name, List<User> userList) {
        this.id = id;
        this.name = name;
        this.userList = userList;
    }
}
