package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.AccountService;
import com.proiectip.boat.accounts.Accounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/owners")
@CrossOrigin
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private OwnersRepository ownersRepository;

    @Autowired
    private AccountService accountService;

    @GetMapping("/list")
    public ResponseEntity<List<Owners>> list(){
        return new ResponseEntity(ownerService.getAllOwners(), HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody Map<String, String> map){
        String idOwner = map.get("_id");
        String idAccount = map.get("account");
        Accounts account = accountService.findById(idAccount);
        if(account != null) {
            accountService.deleteAccount(account);
        }
        else {
            return new ResponseEntity("Account not found!", HttpStatus.BAD_REQUEST);
        }
        ownersRepository.deleteById(idOwner);
        return new ResponseEntity("Owner deleted succesfully!", HttpStatus.OK);
    }


}
