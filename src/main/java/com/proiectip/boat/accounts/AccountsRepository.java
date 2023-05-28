package com.proiectip.boat.accounts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository extends MongoRepository<Accounts, String> {
    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Accounts> findAll(String category);

    Accounts findByUsernameAndPassword(String username, String password);

    Accounts findByEmail(String email);

    public long count();

    Accounts findByUsername(String username);

    Accounts findAccountById(String idAccount);

    List<Accounts> findByRole(String role);
}