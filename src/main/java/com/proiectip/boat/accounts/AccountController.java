package com.proiectip.boat.accounts;

import com.proiectip.boat.admins.AdminRepository;
import com.proiectip.boat.admins.Admins;
import com.proiectip.boat.clients.Clients;
import com.proiectip.boat.clients.ClientsRepository;
import com.proiectip.boat.owners.OwnerService;
import com.proiectip.boat.owners.Owners;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accounts")
@CrossOrigin
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountsRepository accountsRepository;

    @Autowired
    private ClientsRepository clientsRepository;

    @Autowired
    private OwnerService ownerService;

    @Autowired
    private AdminRepository adminRepository;


    // for SIGN UP
    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Map<String,String>map){
        // daca exista email-ul sau username-ul in baza de date, nu se mai adauga
        Accounts account = new Accounts(map.get("username"), map.get("password"), map.get("email"),
                    map.get("role"), map.get("firstName"), map.get("lastName"), map.get("image"));
        if(checkEmail(account))
            return new ResponseEntity<>("Email already exists!", HttpStatus.BAD_REQUEST);

        if(checkUsername(account.getUsername()))
            return new ResponseEntity<>("Username already exists!", HttpStatus.BAD_REQUEST);

        // altfel, adaugam contul
        accountService.saveAccount(account);

        // dacă contul este de tip owner, adăugăm și owner-ul
        if(account.getRole().equals("Owner")) {

            int age = Integer.parseInt(map.get("age"));
            Owners owner = new Owners(account, null, account.getFirstName(), account.getLastName(), age,
                   map.get("passportNo"), map.get("address"));
            ownerService.saveOwner(owner);
        }
        else if(account.getRole().equals("Admin")) {
            Admins admin = new Admins(account, account.getFirstName(), account.getLastName());
            adminRepository.save(admin);
        }
        else if(account.getRole().equals("Client")) {
            Clients client = new Clients(account, account.getFirstName(), account.getLastName());
            clientsRepository.save(client);
        }

        return new ResponseEntity<>("Account added successfully!", HttpStatus.OK);
    }

    // for LOG IN
    @GetMapping("/checkEmailAndPassword")
    public ResponseEntity<String> check(@RequestParam(value = "username") String username,
                                        @RequestParam(value = "password") String password){
        Accounts account = accountService.findByUsernameAndPassword(username, password);
        if (account == null)
            return new ResponseEntity<>("Account not found!", HttpStatus.BAD_REQUEST);

        if(account.getRole().equals("Owner")){
            Owners owner = ownerService.findByAccount(account);
            if(!owner.isAccepted())
                return new ResponseEntity<>("Owner not approved!", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("Account found!", HttpStatus.OK);
    }

    @GetMapping("/getRole")
    public ResponseEntity<String> role(@RequestParam(value = "username") String username){
        return new ResponseEntity<>(accountService.findByUsername(username).getRole(), HttpStatus.OK);
    }

    @GetMapping("/getFirstName")
    public ResponseEntity<String> firstName(@RequestParam(value = "username") String username){
        return new ResponseEntity<>(accountService.findByUsername(username).getFirstName(), HttpStatus.OK);
    }

    @GetMapping("/getLastName")
    public ResponseEntity<String> lastName(@RequestParam(value = "username") String username){
        return new ResponseEntity<>(accountService.findByUsername(username).getLastName(), HttpStatus.OK);
    }

    // return all accounts
    @GetMapping("/getAll")
    public ResponseEntity< List<Accounts>> list(){
        return new ResponseEntity<>(accountService.getAllAccounts(), HttpStatus.OK);
    }

    public boolean checkEmail(Accounts accounts){
        return accountService.findByEmail(accounts.getEmail()) != null;
    }

    public boolean checkUsername(String username){
        return accountService.findByUsername(username) != null;
    }

    // delete account
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam(value = "username") String username) {
            if(accountService.findByUsername(username) != null) {
                Accounts account = accountService.findByUsername(username);

                if(account.getRole().equals("Admin"))
                    return new ResponseEntity<>("Can't delete admins", HttpStatus.BAD_REQUEST);

                //Decomentat dupa ce e facuta tabela de clienti
                if (account.getRole().equals("Client"))
                   clientsRepository.delete(clientsRepository.findByAccount(account));

                if(account.getRole().equals("Owner"))
                    ownerService.deleteOwner(ownerService.findByAccount(account));

                //Stergere cont daca e client sau owner
                accountService.deleteAccount(accountService.findByUsername(username));
                return new ResponseEntity<>("Account deleted successfully!", HttpStatus.OK);
            }
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

    // FILTRARI
    @PostMapping("/filterByAnything")
    public ResponseEntity<List<Accounts>> filterByRole(@RequestBody Map<String, String> map){
        String role = map.get("role");
        String firstName = map.get("firstName");
        String lastName = map.get("lastName");
        List<Accounts> list = accountsRepository.findAll();

        if(list.isEmpty())
            return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);

        if(role != null)
        {
            list.removeIf(account -> !account.getRole().equals(role));
        }
        if(firstName != null){
            list.removeIf(account -> !account.getFirstName().startsWith(lastName));
        }
        if(lastName != null){
            list.removeIf(account -> !account.getLastName().startsWith(lastName));
        }
        if(list.isEmpty())
            return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);
//        if(username != null)
//            list.sort(Comparator.comparing(Accounts::getFirstName));

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/filterByRoleAndSort")
    public ResponseEntity<List<Accounts>> filterByRoleAndSort(@RequestBody Map<String, String> map){
        String role = map.get("role");
        String mail = map.get("email");
        String username = map.get("username");

        List<Accounts> list = accountsRepository.findAll();
        if(list.isEmpty())
            return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST);

        if(role != null)
        {
            list.removeIf(account -> !account.getRole().equals(role));
        }

        if(mail != null){
            list.sort(Comparator.comparing(Accounts::getEmail));
        }
        else if(username != null){
            list.sort(Comparator.comparing(Accounts::getUsername));
        }

        return new ResponseEntity<>(list, HttpStatus.OK);

    }

}

