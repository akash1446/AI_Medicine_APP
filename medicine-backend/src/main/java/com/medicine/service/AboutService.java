package com.medicine.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medicine.model.About;
import com.medicine.repository.AboutRepository;

@Service
public class AboutService {
	
	@Autowired
     AboutRepository aboutRepository;
	
	 public About getAbout(){
	        return aboutRepository.findAll().get(0);
	    }
}
