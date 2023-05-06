package com.proiectip.boat.properties;
import java.util.List;
public interface PropertyService {

    public Properties saveProperty(Properties property);
    public List<Properties> getAllProperties();

    void deleteProperty(Properties property);
}
