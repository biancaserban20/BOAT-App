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


    public static void main(String[] args) {
        SpringApplication.run(MdbSpringBootApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

    }

}