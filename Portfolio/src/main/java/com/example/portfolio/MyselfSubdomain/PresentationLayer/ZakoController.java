package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import com.example.portfolio.MyselfSubdomain.BusinessLayer.ZakoService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/v1/zako")
@Validated
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ZakoController {

    private final ZakoService zakoService;

    public ZakoController(ZakoService zakoService) {
        this.zakoService = zakoService;
    }

    @GetMapping()
    public Flux<ZakoResponseModel> getAllZako() {
        return zakoService.getAllZako();
    }
}
