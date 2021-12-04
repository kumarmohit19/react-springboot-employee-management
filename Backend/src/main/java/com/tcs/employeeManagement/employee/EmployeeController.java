package com.tcs.employeeManagement.employee;

import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Comparator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	@Autowired
	private EmployeeRepository employeeRepository;

	@GetMapping(value = "/employees")
	List<Employee> findAll(@RequestParam(value = "dept", required = false) String dept, @RequestParam(value = "salary", required = false) String salary) {
		List<Employee> employeeList= employeeRepository.findAll();

		if(dept != null){
			employeeList= employeeList.stream().filter(emp -> emp.getDepartment().equalsIgnoreCase(dept)).collect(Collectors.toList());
		}

		if(salary != null && salary.equalsIgnoreCase("asc")){
			employeeList.sort(Comparator.comparing(Employee::getSalary));
		}else{
			employeeList.sort(Comparator.comparing(Employee::getSalary).reversed());
		}

		return employeeList;
	}

	@PostMapping(value = "/employees")
	public ResponseEntity<?> createEmployee( @RequestBody Employee emp) {
		try {
			Employee addedEmp = employeeRepository.save(emp);

			URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(addedEmp.getId())
				.toUri();
			return ResponseEntity.created(location).build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
		
	}

	@PutMapping(value = "/employees/{id}")
	ResponseEntity<Employee> updateEmployee(@PathVariable("id") int id, @RequestBody Employee updEmp) {
		Employee emp = employeeRepository.findById(id)
				.orElseThrow(() -> new EmployeeNotFoundException("Employee with ID :" + id));

		if(updEmp.getFirstName() != null) emp.setFirstName(updEmp.getFirstName());
		if(updEmp.getLastName() != null) emp.setLastName(updEmp.getLastName());
		if(updEmp.getDepartment() != null) emp.setDepartment(updEmp.getDepartment());
		if(updEmp.getSalary() != null) emp.setSalary(updEmp.getSalary());

		employeeRepository.save(emp);

		return ResponseEntity.ok().body(emp);
	}

	@DeleteMapping(value = "/employees/{id}")
	ResponseEntity<String> deleteEmployee(@PathVariable("id") int id) {
		Employee emp = employeeRepository.findById(id)
				.orElseThrow(() -> new EmployeeNotFoundException("Employee Not Found with ID :" + id));
		employeeRepository.deleteById(emp.getId());
		return ResponseEntity.ok().body("Employee deleted with success!");
	}
}
