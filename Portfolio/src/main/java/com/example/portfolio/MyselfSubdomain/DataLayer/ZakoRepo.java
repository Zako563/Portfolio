package com.example.portfolio.MyselfSubdomain.DataLayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface ZakoRepo extends ReactiveMongoRepository<Zako, String> {

    Mono<Zako> findZakoByZakoId(String zako);

}
