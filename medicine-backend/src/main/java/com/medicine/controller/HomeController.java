package com.medicine.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @GetMapping("/api/v1/home")
    public Map<String, Object> home() {

        Map<String, Object> data = new HashMap<>();

        data.put("appName", "Medicine App");
        data.put("offer", "Flat 20% OFF");
        data.put("delivery", "Free Delivery");
        data.put("status", "Backend Connected");

        return data;
    }
}