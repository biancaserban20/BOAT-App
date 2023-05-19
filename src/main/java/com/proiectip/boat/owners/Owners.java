package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.properties.Properties;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.CascadeType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "owners")
public class Owners {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @DocumentReference
    private Accounts account;
    private String idAdmin;

    @DocumentReference
    private List<Properties> properties;
    private String firstName;
    private String lastName;
    private int age;
    private String passportNo;
    private String address;
    private String accepted;

    public Owners(Accounts account, String idAdmin, String firstName, String lastName, int age, String passportNo, String address) {
        this.account = account;
        this.idAdmin = idAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.passportNo = passportNo;
        this.address = address;
        this.accepted = "false";
        this.properties = new ArrayList<>();
    }

    public Owners(Accounts account) {
        this.account = account;
        this.firstName = null;
        this.lastName = null;
        this.age = 0;
        this.passportNo = null;
        this.address = null;
        this.accepted = "false";
        this.properties = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public Accounts getAccount() {
        return account;
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
                ", idProperty='" + this.getAccount() + '\'' +
                ", idAdmin='" + this.getIdAdmin() + '\'' +
                ", firstName='" + this.getFirstName() + '\'' +
                ", lastName='" + this.getLastName() + '\'' +
                ", age='" + this.getAge() + '\'' +
                ", passportNo='" + this.getPassportNo() + '\'' +
                ", address='" + this.getAddress() + '\'' +
                '}';
    }
}
