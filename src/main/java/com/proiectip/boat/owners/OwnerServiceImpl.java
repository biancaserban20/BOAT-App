package com.proiectip.boat.owners;
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
    public int no_of_owners() {
        return (int) ownersRepository.count();
    }

    @Override
    public Owners findByAccountId(String id) {
        return ownersRepository.findByAccountId(id);
    }
}
