package com.webvrlamov.alstromeria.scheduler.entity;

import com.webvrlamov.alstromeria.common.entity.HasId;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@NamedEntityGraphs({
        @NamedEntityGraph(
                name = "Plan_FlatEntityGraph",
                attributeNodes = {
                        @NamedAttributeNode("id"),
                        @NamedAttributeNode("name"),
                        @NamedAttributeNode("description"),
                }
        )
})
@Entity
@Getter
@Setter
public class Plan implements HasId {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    public String id;
    public String name;
    public String description;
    public int num;

    @OneToMany(fetch = FetchType.LAZY)
    public List<Story> storyList;

    public Plan() {
    }

    public Plan(
            String id,
            String name,
            String description,
            int num,
            List<Story> storyList
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.num = num;
        this.storyList = storyList;
    }
}
