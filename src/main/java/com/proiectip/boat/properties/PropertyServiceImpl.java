package com.proiectip.boat.properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class PropertyServiceImpl implements PropertyService{
    @Autowired
    private PropertiesRepository propertiesRepository;

    @Override
    public Properties saveProperty(Properties property) {
        return propertiesRepository.save(property);
    }

    @Override
    public List<Properties> getAllProperties() {
        return propertiesRepository.findAll();
    }

    @Override
    public void deleteProperty(Properties property) {
        propertiesRepository.delete(property);
    }

    @Override
    public Properties findPropertyByName(String name) {
        return propertiesRepository.findPropertyByName(name);
    }

    @Override
    public Properties findPropertyByID(String id) {
        return propertiesRepository.findPropertyByid(id);
    }

    @Override
    public Properties findPropertyByLocation(String location) {
        return propertiesRepository.findPropertyByLocation(location);
    }
}
