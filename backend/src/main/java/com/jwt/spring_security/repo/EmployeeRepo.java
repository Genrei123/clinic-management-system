package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    Employee findByEmployeeID(Long employeeID);


}
