package com.proiectip.boat;

import com.proiectip.boat.accounts.AccountController;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.accounts.AccountsRepository;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.owners.OwnersRepository;
import com.proiectip.boat.properties.Properties;
import com.proiectip.boat.properties.PropertiesRepository;
import com.proiectip.boat.properties.PropertyController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@EnableMongoRepositories
@CrossOrigin
public class MdbSpringBootApplication implements CommandLineRunner {

    @Autowired
    AccountsRepository accountsRepository;

    @Autowired
    PropertiesRepository propertiesRepository;

    @Autowired
    OwnersRepository ownersRepository;


    public static void main(String[] args) {
        SpringApplication.run(MdbSpringBootApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //createAccounts();
        //createProperties();
        //createOwners();
        showAllProperties();
        System.out.println();
        System.out.println(PropertyController.checkOwner("0"));
    }

    private void createOwners() {
        System.out.println("Data creation started...");
        ownersRepository.save(new Owners("0", "0", "1", "Tavi", "Radu", 10, "123", "Malul Rosu"));

    }

    public void showAllProperties() {
        propertiesRepository.findAll().forEach(prop -> System.out.println(prop.getPropertyDetails()));
    }

    public void createProperties() {
        System.out.println("Data creation started...");
        propertiesRepository.save(new Properties( "0","0", "Casa lui Tavy", "Bucuresti", "Casa de vacanta", 3, "Casa"));
        propertiesRepository.save(new Properties("1", "1", "Casa lui Iona", "Bucuresti", "Casa de vacanta", 3, "Casa"));
        propertiesRepository.save(new Properties("2","2", "Casa lui Bia", "Bucuresti", "Casa de vacanta", 3, "Casa"));
        propertiesRepository.save(new Properties("3","3", "Casa lui Teo", "Bucuresti", "Casa de vacanta", 3, "Casa"));
        System.out.println("Data creation complete...");

    }
    //CREATE
    public void createAccounts() {
        System.out.println("Data creation started...");
        accountsRepository.save(new Accounts("0", "tavy02", "1234", "octavianradu@gmail.com", "admin"));
        accountsRepository.save(new Accounts("1", "iona03", "ip013!", "iona@gmail", "client"));
        accountsRepository.save(new Accounts("2", "bia04", "aprilie23", "biancaserban@yahoo.com", "proprietar"));
        accountsRepository.save(new Accounts("3", "teo05", "acs2020", "teoarde@yahoo.com", "admin"));
        System.out.println("Data creation complete...");
    }

    // READ
    // 1. Show all the data
    public void showAllAccounts() {

        accountsRepository.findAll().forEach(acc -> System.out.println(acc.getAccountDetails()));
    }

}