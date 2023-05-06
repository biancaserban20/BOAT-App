package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.Accounts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OwnersRepository extends MongoRepository<Owners, String>{

    @Query("{username:'?0'}")
    Owners findItemByUsername(String username);

    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Owners> findAll(String category);
}
