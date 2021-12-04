package com.tcs.employeeManagement.employee;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import javax.persistence.GenerationType;

@Entity
public class Employee {
    
    public Employee() {
        
    }
    
    public Employee(Integer id, String firstName,
             String lastName, String department,
            Integer salary) {
        super();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.salary = salary;
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Length(min=3)
    @Pattern(regexp= "^[A-Za-z]*$")
    private String firstName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    @Length(min=3)
    @Pattern(regexp= "^[A-Za-z]*$")
    private String lastName;
    
    private String department;
    
    @Min(15000)
    @Max(200000)
    private Integer salary;
    
    @Override
    public String toString() {
        return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", department="
                + department + ", salary=" + salary + "]";
    }
}
