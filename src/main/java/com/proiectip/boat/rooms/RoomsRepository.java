package com.proiectip.boat.rooms;

import com.proiectip.boat.admins.Admins;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.List;

@Repository
public interface RoomsRepository extends MongoRepository<Rooms, String>{

}
