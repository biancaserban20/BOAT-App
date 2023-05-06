package com.proiectip.boat.accounts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends MongoRepository<Accounts, String> {
    @Query("{username:'?0'}")
    Accounts findItemByUsername(String username);

    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Accounts> findAll(String category);

    Accounts findByUsernameAndPassword(String username, String password);

    public long count();

}