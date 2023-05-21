package com.proiectip.boat.clients;

import com.proiectip.boat.admins.Admins;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientsRepository extends MongoRepository<Clients, String> {
}
