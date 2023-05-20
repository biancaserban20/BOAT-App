package com.proiectip.boat.admins;

import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.owners.Owners;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends MongoRepository<Admins, String> {

    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Admins> findAll(String category);

    public long count();
}
