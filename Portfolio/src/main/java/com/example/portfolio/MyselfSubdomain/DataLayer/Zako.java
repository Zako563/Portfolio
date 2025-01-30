package com.example.portfolio.MyselfSubdomain.DataLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Zako {

    @Id
    private String id;
    private String zakoId;
    private String name;
    private String title; // e.g., "Computer Science Student" or "Aspiring Software Engineer"
    private String summary; // A short bio about yourself// List of programming languages, frameworks, tools, etc.
    private List<String> languages; // Spoken languages (e.g., English, French)
}
