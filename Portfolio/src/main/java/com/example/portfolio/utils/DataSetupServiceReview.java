package com.example.portfolio.utils;

import com.example.portfolio.MyselfSubdomain.DataLayer.Zako;
import com.example.portfolio.MyselfSubdomain.DataLayer.ZakoRepo;
import com.example.portfolio.ProjectSubdomain.DataLayer.Project;
import com.example.portfolio.ProjectSubdomain.DataLayer.ProjectRepository;
import com.example.portfolio.ReviewSubdomain.DataLayer.Review;
import com.example.portfolio.ReviewSubdomain.DataLayer.ReviewRepository;
import com.example.portfolio.SkillsSubdomain.DataLayer.Skill;
import com.example.portfolio.SkillsSubdomain.DataLayer.SkillRepository;
import com.example.portfolio.UserSubdomain.DataLayer.User;
import com.example.portfolio.UserSubdomain.DataLayer.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final ZakoRepo zakoRepo;
    private final ProjectRepository projectRepo;
    private  final SkillRepository skillRepo;
    private  final UserRepository userRepo;
    private  final ReviewRepository reviewRepo;

    @Override
    public void run(String... args) throws Exception {
    setupZako();
    setupProjects();
   //setupSkills();
    setupUsers();
   // setupReviews();
    }

    private void setupZako() {
        Zako zako1 = buildZako(
                "zakoId1",
                "Zakaria Mohamed Boudboub",
                "Aspiring Software Engineer",
                "I’m currently in my third year of Computer Science at Champlain College, " +
                        "diving deep into the world of coding and technology. Every day, I find myself " +
                        "amazed at how coding can transform ideas into reality, whether it’s building " +
                        "something from scratch or optimizing a process. I’m always seeking new challenges to" +
                        " sharpen my skills, whether it’s through Java, Spring Boot, or exploring new frameworks." +
                        " Outside of school, I love experimenting with projects, learning new languages, and " +
                        "finding creative solutions to problems. For me, coding isn’t just about writing lines of" +
                        " code—it’s about crafting something meaningful that makes a difference.",
                List.of("https://www.citypng.com/public/uploads/preview/free-united-kingdom-england-uk-flag-icon-png-735811697023915sbq5vwe1oa.png", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQCi5AVhYAaRwA0SwVQ9iebXjvSNUSFzq5A&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSorBlfXwQTkTbhyrQ2rIjW8jhe4lcDG6Ci6Q&s", "https://www.citypng.com/public/uploads/preview/hd-spanish-spain-flag-icon-transparent-png-735811695829736thez4vs8bh.png")
        );

        Flux.just(zako1)
                .flatMap(zako -> zakoRepo.findZakoByZakoId(zako.getZakoId())
                        .flatMap(existingZako -> {
                            // If exists, update it with new fields
                            existingZako.setTitle(zako.getTitle());
                            existingZako.setSummary(zako.getSummary());
                            existingZako.setLanguages(zako.getLanguages());
                            return zakoRepo.save(existingZako);
                        })
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting Zako profile: " + zako.getZakoId());
                            return zakoRepo.save(zako); // Save if not found
                        }))
                )
                .subscribe();
    }

    private Zako buildZako(String zakoId, String name, String title, String summary, List<String> languages) {
        return Zako.builder()
                .zakoId(zakoId)
                .name(name)
                .title(title)
                .summary(summary)
                .languages(languages)
                .build();
    }



    ClassPathResource cpr1 = new ClassPathResource("images/Portfolio.png");
    String cpr2 = "images/Portfolio.png";


    //Projects
    private void setupProjects() throws IOException {
        Project project1 = buildProject(
                "projectId1",
                "Portfolio Website",
                "A personal portfolio showcasing my projects, skills, and experience.",
                "https://i.postimg.cc/mgHqCzWX/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg").build()
                ), "https://github.com/Zako563/Portfolio"
        );

        Project project2 = buildProject(
                "projectId2",
                "NoodleStar",
                "A web site to handle the orders for the restaurant noodle Star",
                "https://i.postimg.cc/KYhWNGZZ/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("TypeScript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("MongoDb").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg").build()
                ), "https://github.com/Sunveerg/Noodle-Star"
        );

        Project project3 = buildProject(
                "projectId3",
                "Football Heritage",
                "First full Stack project abour football",
                "https://i.postimg.cc/gcgfWbKD/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName("Java").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("Spring Boot").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("React").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("Javascript").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("Mysql").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg").build()
                ), "https://github.com/Zako563/FootballDomain"
        );

        Project project4 = buildProject(
                "projectId4",
                "Artwork Project",
                ".Net project that handle the sell of artworks",
                "https://i.postimg.cc/LhdbJN79/image.png",
                List.of(
                        Skill.builder().skillId("skillId1").skillName(".net").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-plain.svg").build(),
                        Skill.builder().skillId("skillId2").skillName("csHtml").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg").build(),
                        Skill.builder().skillId("skillId3").skillName("Azure").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg").build(),
                        Skill.builder().skillId("skillId4").skillName("C#").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg").build(),
                        Skill.builder().skillId("skillId5").skillName("Mysql").skillLogo("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg").build()
                ),"https://github.com/Zako563/ArtworkProject"
        );

        Flux.just(project1, project2, project3, project4)
                .flatMap(project -> projectRepo.findByProjectId(project.getProjectId())
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting project: " + project.getProjectId());
                            return projectRepo.save(project);
                        }))
                )
                .subscribe();
    }

    private Project buildProject(String projectId, String projectName, String description, String imageUrl, List<Skill> skills, String projectLink) {
        return Project.builder()
                .projectId(projectId)
                .projectName(projectName)
                .description(description)
                .imageUrl(imageUrl)
                .skills(skills)
                .projectLink(projectLink)
                .build();
    }




    //skill
    private void setupSkills() {
        Skill java = buildSkill("skillId1", "Java", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg");
        Skill springBoot = buildSkill("skillId2", "Spring Boot", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg");
        Skill react = buildSkill("skillId3", "React", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg");
        Skill typescript = buildSkill("skillId4", "TypeScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg");
        Skill mongodb = buildSkill("skillId5", "MongoDb", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg");
        Skill javascript = buildSkill("skillId6", "JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg");
        Skill mysql = buildSkill("skillId7", "Mysql", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg");
        Skill dotnet = buildSkill("skillId8", ".Net", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-plain.svg");
        Skill cshtml = buildSkill("skillId9", "csHtml", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg");
        Skill azure = buildSkill("skillId10", "Azure", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg");
        Skill csharp = buildSkill("skillId11", "C#", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg");
        Skill python= buildSkill("skillId12", "Python", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg");
        Skill untiy= buildSkill("skillId13", "Unity", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg");
        Skill C= buildSkill("skillId14", "C++", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg");
        Skill android= buildSkill("skillId15", "Android", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg");

        Flux.just(java, springBoot, react, typescript, mongodb, javascript, mysql, dotnet, cshtml, azure, csharp, python, untiy, C, android)
                .flatMap(skill -> skillRepo.findSkillBySkillId(skill.getSkillId())
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting skill: " + skill.getSkillId());
                            return skillRepo.save(skill);
                        }))
                )
                .subscribe();
    }

    private Skill buildSkill(String skillId, String skillName, String skillLogo) {
        return Skill.builder()
                .skillId(skillId)
                .skillName(skillName)
                .skillLogo(skillLogo)
                .build();
    }





    //user


    private void setupUsers() {
        User user3 = buildUser("userId3", "leopold@example.com", "Leopold", "Miller", List.of("Customer"), null);
        User user4 = buildUser("userId4", "samuel@example.com", "Samuel", "Taylor", List.of("Staff"), null);
        User user5 = buildUser("userId5", "samantha@example.com", "Samantha", "Lee", List.of("Customer"), List.of("read"));
        Flux.just( user3, user4, user5)
                .flatMap(user -> {
                    System.out.println("Checking if user exists: " + user.getUserId());

                    // Check if the user already exists by userId (or email)
                    return userRepo.findByUserId(user.getUserId()) // Assuming userId is the unique identifier
                            .doOnTerminate(() -> System.out.println("Terminated: " + user.getUserId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting user: " + user.getUserId());
                                return userRepo.save(user); // Save if user doesn't exist
                            }));
                })
                .subscribe();
    }


    private User buildUser(String userId, String email, String firstName, String lastName, List<String> roles, List<String> permissions) {
        return User.builder()
                .userId(userId)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .roles(roles)
                .permissions(permissions)
                .build();
    }



    private void setupReviews() {
        Review review1 = buildReview("reviewId1", "Alice Johnson", "Great product!", true, LocalDateTime.now());
        Review review2 = buildReview("reviewId2", "Bob Smith", "Could be better.", false,LocalDateTime.now());
        Review review3 = buildReview("reviewId3", "Charlie Brown", "Excellent service!", true,LocalDateTime.now());
        Review review4 = buildReview("reviewId4", "Diana Prince", "Not satisfied.", false,LocalDateTime.now());
        Review review5 = buildReview("reviewId5", "Ethan Hunt", "Highly recommended!", true,LocalDateTime.now());

        Flux.just(review1, review2, review3, review4, review5)
                .flatMap(review -> reviewRepo.findReviewByReviewId(review.getReviewId())
                        .switchIfEmpty(Mono.defer(() -> {
                            System.out.println("Inserting review: " + review.getReviewId());
                            return reviewRepo.save(review);
                        }))
                )
                .subscribe();
    }

    private Review buildReview(String reviewId, String reviewerName, String reviewText, Boolean isApproved, LocalDateTime dateTime) {
        return Review.builder()
                .reviewId(reviewId)
                .reviewerName(reviewerName)
                .review(reviewText)
                .isApproved(isApproved)
                .reviewDate(dateTime)
                .build();
    }
}




