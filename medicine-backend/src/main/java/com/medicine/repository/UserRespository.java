package com.medicine.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medicine.model.User;

public interface UserRespository extends JpaRepository<User, Long> {

//	/*~~(class org.openrewrite.java.tree.J$Erroneous cannot be cast to class org.openrewrite.java.tree.J$Assignment (org.openrewrite.java.tree.J$Erroneous and org.openrewrite.java.tree.J$Assignment are in unnamed module of loader 'app'))~~>*/@Query("SELECT u FROM User u WHERE u.email = :email")
//	Optional<User> findByEmail(String email);


}
