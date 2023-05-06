package com.proiectip.boat.owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
@CrossOrigin
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    public String addOwner(Owners owner){
        ownerService.saveOwner(owner);
        return "New owner is added";
    }

    public List<Owners> list(){
        return ownerService.getAllOwners();
    }

    public String deleteOwner(Owners owner){
        ownerService.deleteOwner(owner);
        return "Owner is deleted";
    }

}
