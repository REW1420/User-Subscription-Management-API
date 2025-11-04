package com.example.usermanagement.service;

import com.example.usermanagement.dto.SubscriptionRequest;
import com.example.usermanagement.dto.SubscriptionResponse;
import com.example.usermanagement.entity.Subscription;
import com.example.usermanagement.entity.User;
import com.example.usermanagement.entity.Plan;
import com.example.usermanagement.repository.SubscriptionRepository;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.repository.PlanRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;
    private final PlanRepository planRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository,
            UserRepository userRepository,
            PlanRepository planRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
        this.planRepository = planRepository;
    }

    public List<SubscriptionResponse> getAllSubscriptions() {
        return subscriptionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public SubscriptionResponse getSubscription(Long id) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));
        return mapToResponse(subscription);
    }

    public SubscriptionResponse createSubscription(Long userId, SubscriptionRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Plan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));

        Subscription subscription = new Subscription();
        subscription.setPlan(plan);
        subscription.setStartDate(request.getStartDate());
        subscription.setEndDate(request.getEndDate());
        subscription.setUser(user);

        Subscription saved = subscriptionRepository.save(subscription);
        return mapToResponse(saved);
    }

    public SubscriptionResponse updateSubscription(Long id, SubscriptionRequest request) {
        Subscription subscription = subscriptionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Subscription not found"));

        Plan plan = planRepository.findById(request.getPlanId())
                .orElseThrow(() -> new IllegalArgumentException("Plan not found"));

        subscription.setPlan(plan);
        subscription.setStartDate(request.getStartDate());
        subscription.setEndDate(request.getEndDate());

        Subscription updated = subscriptionRepository.save(subscription);
        return mapToResponse(updated);
    }

    public void deleteSubscription(Long id) {
        if (!subscriptionRepository.existsById(id))
            throw new IllegalArgumentException("Subscription not found");
        subscriptionRepository.deleteById(id);
    }

    private SubscriptionResponse mapToResponse(Subscription subscription) {
        SubscriptionResponse response = new SubscriptionResponse();
        response.setId(subscription.getId());
        response.setPlanId(subscription.getPlan().getId());
        response.setPlanName(subscription.getPlan().getName());
        response.setStartDate(subscription.getStartDate());
        response.setEndDate(subscription.getEndDate());

        // Información del usuario
        response.setUserId(subscription.getUser().getId());
        response.setUserName(subscription.getUser().getName());
        response.setUserEmail(subscription.getUser().getEmail());

        return response;
    }

}
