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
}
