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
    private String password;
    private String email;
    private String role;

    // private String phone;

    public Accounts(String id, String username, String password, String email, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
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

    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(String id) {
        this.id = id;
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