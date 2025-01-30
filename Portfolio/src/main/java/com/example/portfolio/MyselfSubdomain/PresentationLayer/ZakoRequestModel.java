package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ZakoRequestModel {
      String name;
      String title; // e.g., "Computer Science Student" or "Aspiring Software Engineer"
      String summary; // A short bio about yourself
     // List of programming languages, frameworks, tools, etc.
      List<String> languages; // Spoken languages (e.g., English, French)

}
