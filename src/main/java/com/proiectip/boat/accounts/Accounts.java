package com.proiectip.boat.accounts;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private String role;

    // private String phone;

    public Accounts(String username, String password, String email, String role, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.lastName = lastName;
        this.firstName = firstName;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public Accounts() {
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }


    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAccountDetails() {
        return "Account{" +
                "id=" + this.getId() +
                ", username='" + this.getUsername() + '\'' +
                ", password='" +this.getPassword() + '\'' +
                ", email='" + this.getEmail() + '\'' +
                ", role='" + this.getRole() + '\'' +
                '}';
    }
}