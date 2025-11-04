package com.example.usermanagement.service;

import com.example.usermanagement.dto.PlanRequest;
import com.example.usermanagement.dto.PlanResponse;
import com.example.usermanagement.entity.Plan;
import com.example.usermanagement.repository.PlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanService {

    private final PlanRepository planRepository;

    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<PlanResponse> getAllPlans() {
        return planRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public PlanResponse getPlan(Long id) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));
        return mapToResponse(plan);
    }

    public PlanResponse createPlan(PlanRequest request) {
        if (planRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Plan already exists");
        }

        Plan plan = new Plan();
        plan.setName(request.getName());
        plan.setDefaultDurationDays(request.getDefaultDurationDays());

        Plan saved = planRepository.save(plan);
        return mapToResponse(saved);
    }

    public PlanResponse updatePlan(Long id, PlanRequest request) {
        Plan plan = planRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));

        plan.setName(request.getName());
        plan.setDefaultDurationDays(request.getDefaultDurationDays());

        Plan updated = planRepository.save(plan);
        return mapToResponse(updated);
    }

    public void deletePlan(Long id) {
        if (!planRepository.existsById(id))
            throw new IllegalArgumentException("Plan not found");
        planRepository.deleteById(id);
    }

    private PlanResponse mapToResponse(Plan plan) {
        PlanResponse response = new PlanResponse();
        response.setId(plan.getId());
        response.setName(plan.getName());
        response.setDefaultDurationDays(plan.getDefaultDurationDays());
        return response;
    }
}
