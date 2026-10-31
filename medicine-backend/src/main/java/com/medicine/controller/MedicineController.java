package com.medicine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medicine.model.Medicine;
import com.medicine.service.MedicineService;

@RestController
@RequestMapping("api/v1/medicines")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicineController {
	
	@Autowired
	MedicineService medicineService;

//	@PostMapping
//    public ResponseEntity<Medicine> addMedicine(
//            @RequestBody Medicine medicine) {
//
//        Medicine medicineDetails =  medicineService.saveMedicine(medicine);
//        
//        return ResponseEntity.status(HttpStatus.OK)
//        		                 .header("info","Data is Saved successfully")
//        		                 .body(medicineDetails);
//    }
	@GetMapping
    public ResponseEntity<List<Medicine>> getMedicines() {
         List<Medicine> medicineinfomation = medicineService.getAllMedicines();
         
         return ResponseEntity.status(HttpStatus.OK)
        		                  .header("info","Data is successfully Received")
        		                  .body(medicineinfomation);
    }
	 @PostMapping
	    public ResponseEntity<List<Medicine>> saveAllMedicineData(
	            @RequestBody List<Medicine> medicines) {

	        List<Medicine> savedMedicine =
	                medicineService.saveAllMedicineData(medicines);

	        return ResponseEntity.ok()
	                .header("info", "Medicines saved successfully")
	                .body(savedMedicine);
	    }
	}
	

