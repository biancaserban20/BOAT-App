package com.proiectip.boat.owners;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Document(collection = "owners")
public class Owners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String idAccount;
    private String idAdmin;
    private String firstName;
    private String lastName;
    private int age;
    private String passportNo;
    private String address;

    public Owners(String id, String idAccount, String idAdmin, String firstName, String lastName, int age, String passportNo, String address) {
        this.id = id;
        this.idAccount = idAccount;
        this.idAdmin = idAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.passportNo = passportNo;
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public String getIdAccount() {
        return idAccount;
    }

    public String getIdAdmin() {
        return idAdmin;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getPassportNo() {
        return passportNo;
    }

    public String getAddress() {
        return address;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIdAccount(String idProperty) {
        this.idAccount = idProperty;
    }

    public void setIdAdmin(String idAdmin) {
        this.idAdmin = idAdmin;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setPassportNo(String passportNo) {
        this.passportNo = passportNo;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOwnerDetails(){
        return "Owner{" +
                "id=" + this.getId() +
                ", idProperty='" + this.getIdAccount() + '\'' +
                ", idAdmin='" + this.getIdAdmin() + '\'' +
                ", firstName='" + this.getFirstName() + '\'' +
                ", lastName='" + this.getLastName() + '\'' +
                ", age='" + this.getAge() + '\'' +
                ", passportNo='" + this.getPassportNo() + '\'' +
                ", address='" + this.getAddress() + '\'' +
                '}';
    }
}
