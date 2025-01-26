package com.example.portfolio.MyselfSubdomain.PresentationLayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ZakoResponseModel {
    String zakoId;
    int age;
    String nationality;
    String name;
    String interest;
}
