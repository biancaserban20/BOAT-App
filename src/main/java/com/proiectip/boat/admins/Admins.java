package com.proiectip.boat.admins;

import com.proiectip.boat.accounts.Accounts;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Document(collection = "admins")
public class Admins {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @DocumentReference
    private Accounts account;
    private String firstName;
    private String lastName;

    public Admins() {
    }

    public Admins(Accounts account, String firstName, String lastName) {
        this.account = account;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Admins(Accounts account) {
        this.account = account;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "Admins{" +
                "id='" + id + '\'' +
                ", account=" + account +
                '}';
    }
}
