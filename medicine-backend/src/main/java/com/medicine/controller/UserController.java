package com.medicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicine.model.User;
import com.medicine.service.UserService;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired
    private UserService userService;
	

	   @PostMapping("/register")
	    public ResponseEntity<User> register(@RequestBody User user) {

	        User savedUser = userService.register(user);

	        return ResponseEntity.ok(savedUser);
	    }



//	@GetMapping
//	public ResponseEntity<User> getRegister(@RequestParam String email) {
//
//	    User user = userService.findRegister(email);
//
//	    return ResponseEntity.ok(user);
//	}

}
