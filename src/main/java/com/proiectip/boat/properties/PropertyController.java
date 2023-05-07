package com.proiectip.boat.properties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/properties")
@CrossOrigin
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Properties property){
        if(checkName(property) && checkID(property))
            return new ResponseEntity<>("Property already exists", HttpStatus.BAD_REQUEST);

        propertyService.saveProperty(property);
        return new ResponseEntity<>("Property added successfully", HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Properties>> list(){
        return new ResponseEntity<>(propertyService.getAllProperties(), HttpStatus.OK);
    }

    @GetMapping("/getByName")
    public ResponseEntity<Properties> getByName(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByName(map.get("name"));
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    @GetMapping("/getByLocation")
    public ResponseEntity<Properties> getByLocation(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByLocation(map.get("location"));
        return new ResponseEntity<>(property, HttpStatus.OK);
    }

    public boolean checkName(Properties properties){
        if(propertyService.findPropertyByName(properties.getName()) != null)
            return true;
        return false;
    }

    public boolean checkID(Properties properties){
        if(propertyService.findPropertyByID(properties.getId()) != null)
            return true;
        return false;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
        Properties property = propertyService.findPropertyByName(map.get("name"));
        propertyService.deleteProperty(property);
        return new ResponseEntity<>("Property deleted successfully", HttpStatus.OK);
    }

}
