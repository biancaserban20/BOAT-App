package com.proiectip.boat.owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
@CrossOrigin
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @GetMapping("/list")
    public ResponseEntity<List<Owners>> list(){
        return new ResponseEntity(ownerService.getAllOwners(), HttpStatus.OK);
    }


}
