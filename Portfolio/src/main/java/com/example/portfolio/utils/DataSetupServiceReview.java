package com.example.portfolio.utils;

import com.example.portfolio.MyselfSubdomain.DataLayer.Zako;
import com.example.portfolio.MyselfSubdomain.DataLayer.ZakoRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataSetupServiceReview implements CommandLineRunner {


    private final ZakoRepo zakoRepo;

    @Override
    public void run(String... args) throws Exception {
    setupZako();
    }

    private void setupZako() {
        Zako zako1 = buildZako("zakoId1", 19, "Algerian");

        Flux.just(zako1)
                .flatMap(zako -> {
                    return zakoRepo.findZakoByZakoId(zako.getZakoId())
                            .doOnTerminate(() -> System.out.println("Terminated: " + zako.getZakoId()))
                            .switchIfEmpty(Mono.defer(() -> {
                                System.out.println("Inserting review: " + zako.getZakoId());
                                return zakoRepo.save(zako); // Save if review doesn't exist
                            }));
                })
                .subscribe();
    }


    private Zako buildZako(String zakoId, int age, String nationality) {
        return Zako.builder()
                .zakoId(zakoId)
                .age(age)
                .nationality(nationality)
                .build();
    }


}
