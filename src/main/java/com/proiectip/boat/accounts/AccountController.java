package com.proiectip.boat.accounts;

import com.proiectip.boat.owners.OwnerService;
import com.proiectip.boat.owners.Owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private OwnerService ownerService;

    // for SIGN UP
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Accounts account){
        // daca exista email-ul sau username-ul in baza de date, nu se mai adauga
        if(checkEmail(account))
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);

        if(checkUsername(account.getUsername()))
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);

        // altfel, adaugam contul
        accountService.saveAccount(account);

        // dacă contul este de tip owner, adăugăm și owner-ul
        if(account.getRole().equals("Owner")) {
            Owners owner;
            owner = new Owners(account.getId());
            ownerService.saveOwner(owner);
        }
        else if(account.getRole().equals("Client")) {} // de adaugat clientul cand il fac

        return new ResponseEntity<>("Account added successfully!", HttpStatus.OK);
    }

    private String toString(int i) {
        return "i";
    }

    // for LOG IN
    @GetMapping("/checkEmailAndPassword")
    public ResponseEntity<String> check(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        if (accountService.findByUsernameAndPassword(username, password) != null)
            return new ResponseEntity<>("Account found!", HttpStatus.OK);

        return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);
    }

    // return all accounts
    @GetMapping("/getAll")
    public ResponseEntity< List<Accounts>> list(){
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    public boolean checkEmail(Accounts accounts){
        if(accountService.findByEmail(accounts.getEmail()) != null)
            return true;
        return false;
    }

    public boolean checkUsername(String username){
        if(accountService.findByUsername(username) != null)
            return true;
        return false;
    }

    // delete account
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam(value = "username") String username) {
//            String username = map.get("username");
            System.out.println(username);
            if(accountService.findByUsername(username) != null) {
                Accounts account = accountService.findByUsername(username);
                accountService.deleteAccount(accountService.findByUsername(username));
                ownerService.deleteOwner(ownerService.findByAccountId(account.getId()));

                return new ResponseEntity<>("Account deleted successfully!", HttpStatus.OK);
            }
            // else pentru client
            return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);
    }

    // change password
    @PutMapping("/update")
    public boolean update(@RequestBody Map<String, String> map){
        String username = map.get("username");
        String password = map.get("password");
        if(accountService.findByUsername(username) != null){
            Accounts account = accountService.findByUsername(username);
            account.setPassword(password);
           // accountService.saveAccount(account); => nu stiu daca trebuie save, de testat la change password
            return true;
        }
        return false;
    }
}

