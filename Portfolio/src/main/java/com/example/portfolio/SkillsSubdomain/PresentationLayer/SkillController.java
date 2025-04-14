package com.example.portfolio.SkillsSubdomain.PresentationLayer;

import com.example.portfolio.SkillsSubdomain.BusinessLayer.SkillService;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/skill")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping()
    public Flux<SkillResponseModel> getAllSkills() {
        return skillService.getALlSkills();
    }

    @PostMapping
    public Mono<SkillResponseModel> addSkill( @RequestBody Mono<SkillRequestModel> skillRequestModel) {
        return skillService.addSkill(skillRequestModel);
    }

    @DeleteMapping("/{skillId}")
    public Mono<SkillResponseModel> deleteSkill(@PathVariable String skillId) {
        return skillService.deleteSkill(skillId);
    }

    @GetMapping("/{skillId}")
    public Mono<SkillResponseModel> getSkill(@PathVariable String skillId) {
        return skillService.getSkill(skillId);
    }
}
