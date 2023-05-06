package com.proiectip.boat.properties;
import com.proiectip.boat.accounts.Accounts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PropertiesRepository extends MongoRepository<Properties, String>{
    @Query("{name:'?0'}")
    Properties findItemByName(String name);

    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Properties> findAll(String category);
}
