package com.jwt.spring_security.repo;

import com.jwt.spring_security.model.Branch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class branchService {
    @Autowired
    branchRepo branchRepo;

    public Branch findBranch(Long id) {
        return branchRepo.findByBranchID(id);
    }

    public Branch saveBranch(Branch branch) {
        return branch;
    }

    public boolean deleteByBranchID(Long id) {
        if (branchRepo.existsById(id)) {
            branchRepo.deleteById(id);
            return true;
        }
        return false;
    }

}
