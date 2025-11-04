package com.example.usermanagement.repository;

import com.example.usermanagement.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    boolean existsByName(String name);
}
