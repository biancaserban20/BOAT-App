package com.proiectip.boat.owners;


import com.proiectip.boat.accounts.Accounts;

import java.util.List;
public interface OwnerService {
    public Owners saveOwner(Owners owner);
    public List<Owners> getAllOwners();

    void deleteOwner(Owners owner);
    int no_of_owners();

    Owners findByAccount(Accounts account);

//    Owners findById(String idOwner);
}
