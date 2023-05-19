package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.Accounts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OwnersRepository extends MongoRepository<Owners, String>{

    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Owners> findAll(String category);

    public long count();

    Owners findByAccount(Accounts account);
//    Owners findOwnerById(String id);
    Owners deleteOwnerById(String idOwner);
}
