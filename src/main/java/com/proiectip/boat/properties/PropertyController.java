package com.proiectip.boat.properties;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.proiectip.boat.accounts.AccountService;
import com.proiectip.boat.accounts.Accounts;
import com.proiectip.boat.owners.OwnerController;
import com.proiectip.boat.owners.OwnerService;
import com.proiectip.boat.owners.Owners;
import com.proiectip.boat.owners.OwnersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/properties")
@CrossOrigin
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @Autowired
    private PropertiesRepository propertyRepository;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private AccountService accountService;

    @GetMapping("/listProperties")
    public ResponseEntity<List<Properties>> list(){
        return new ResponseEntity<>(propertyRepository.findAll(),HttpStatus.OK);
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
