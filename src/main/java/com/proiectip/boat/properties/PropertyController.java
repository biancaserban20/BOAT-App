package com.proiectip.boat.properties;
import com.proiectip.boat.owners.Owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RestController
@RequestMapping("/properties")
@CrossOrigin
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @Autowired
    private static MongoTemplate mongoTemplate;

    @PostMapping("/add")
    public String add(@RequestBody Properties property){
        if(checkName(property) && checkID(property))
            return "Property already exists";

        if(!checkOwner(property.getIdOwner()))
            return "Owner" + property.getIdOwner() + "does not exist";


        propertyService.saveProperty(property);
        return "New property is added";
    }

    //@Query ("{idOwner: ?0}")
    public static boolean checkOwner(String id){

        // query dupa idOwner in Owners
        Query query = new Query();
        query.addCriteria(Criteria.where("id").is(id));
       // System.out.println(mongoTemplate.find(query, Owners.class));

        // daca nu exista niciun owner cu id-ul respectiv, return false
//        if(list.size() == 0) {
//            System.out.println("Owner does not exist");
//            return false;
//        }
//
//        // daca exista, return true
//        System.out.println("Owner exists");
        return true;

    }

    @GetMapping("/getAll")
    public List<Properties> list(){
        return propertyService.getAllProperties();
    }

    @GetMapping("/checkName")
    public boolean checkName(@RequestBody Properties properties){
        List<Properties> list_aux = propertyService.getAllProperties();
        for (Properties property : list_aux){
            if(property.getName().equals(properties.getName()))
                return true;
        }
        return false;
    }

    @GetMapping("/checkID")
    public boolean checkID(@RequestBody Properties properties){
        List<Properties> list_aux = propertyService.getAllProperties();
        for (Properties property : list_aux){
            if(property.getId() == properties.getId())
                return true;
        }
        return false;
    }

    @DeleteMapping("/delete")
    public String delete(@RequestBody Properties property){
        if(!checkName(property) && !checkID(property))
            return "Property does not exist";
        propertyService.deleteProperty(property);
        return "Property is deleted";
    }

}
