package com.proiectip.boat.owners;
;

import java.util.List;
public interface OwnerService {
    public Owners saveOwner(Owners owner);
    public List<Owners> getAllOwners();

    void deleteOwner(Owners owner);
    int no_of_owners();

    Owners findByAccountId(String id);
}
