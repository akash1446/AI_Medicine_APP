package com.medicine.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.medicine.model.Contact;
import com.medicine.service.ContactService;

@RestController
public class ContactController {


@Autowired
private ContactService service;

@PostMapping
public Contact save(@RequestBody Contact contact){

return service.save(contact);
}
}
