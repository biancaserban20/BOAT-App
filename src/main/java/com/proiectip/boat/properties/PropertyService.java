package com.proiectip.boat.properties;
import java.util.List;
public interface PropertyService {

    public Properties saveProperty(Properties property);
    public List<Properties> getAllProperties();

    void deleteProperty(Properties property);

    Properties findPropertyByName(String name);
    Properties findPropertyByID(String id);

    Properties findPropertyByLocation(String location);
}
