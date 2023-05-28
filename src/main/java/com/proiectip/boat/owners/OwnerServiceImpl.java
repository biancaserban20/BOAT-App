package com.proiectip.boat.owners;
import com.proiectip.boat.accounts.Accounts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OwnerServiceImpl implements OwnerService {
    @Autowired
    private OwnersRepository ownersRepository;

    @Override
    public Owners saveOwner(Owners owner) {
        return ownersRepository.save(owner);
    }

    @Override
    public List<Owners> getAllOwners() {
        return ownersRepository.findAll();
    }

    @Override
    public void deleteOwner(Owners owner) {
        ownersRepository.delete(owner);
    }

    @Override
    public Owners findByAccount(Accounts account) {
        return ownersRepository.findByAccount(account);
    }

//    @Override
//    public Owners findById(String idOwner) {
//        return ownersRepository.findOwnerById(idOwner);
//    }
}
