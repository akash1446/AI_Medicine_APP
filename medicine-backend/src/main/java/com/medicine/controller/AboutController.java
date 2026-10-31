package com.medicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicine.model.About;
import com.medicine.service.AboutService;

@RestController
@RequestMapping("/api/v1/about")
@CrossOrigin(origins = "http://localhost:5173")
public class AboutController {
	
	 @Autowired
	    private AboutService service;

	    @GetMapping
	    public About getAbout(){
	        return service.getAbout();
	    }

}
