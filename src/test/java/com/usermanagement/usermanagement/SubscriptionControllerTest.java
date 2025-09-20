package com.usermanagement.usermanagement;

import com.example.usermanagement.dto.SubscriptionResponse;
import com.example.usermanagement.controller.SubscriptionController;
import com.example.usermanagement.dto.SubscriptionRequest;
import com.example.usermanagement.service.SubscriptionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class SubscriptionControllerTest {

    @Mock
    private SubscriptionService subscriptionService;

    @InjectMocks
    private SubscriptionController subscriptionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        SubscriptionResponse sub = new SubscriptionResponse();
        sub.setId(1L);
        sub.setPlanName("Premium");
        sub.setStartDate(LocalDate.parse("2025-09-20"));
        sub.setEndDate(LocalDate.parse("2026-09-20"));
        when(subscriptionService.getAllSubscriptions()).thenReturn(List.of(sub));

        ResponseEntity<List<SubscriptionResponse>> response = subscriptionController.getAll();
        assertEquals(1, response.getBody().size());
        assertEquals("Premium", response.getBody().get(0).getPlanName());
    }

    @Test
    void testGetOne() {
        SubscriptionResponse sub = new SubscriptionResponse();
        sub.setId(1L);
        sub.setPlanName("Premium");
        sub.setStartDate(LocalDate.parse("2025-09-20"));
        sub.setEndDate(LocalDate.parse("2026-09-20"));
        when(subscriptionService.getSubscription(1L)).thenReturn(sub);

        ResponseEntity<SubscriptionResponse> response = subscriptionController.getOne(1L);
        assertEquals("Premium", response.getBody().getPlanName());
    }

    @Test
    void testCreate() {
        SubscriptionRequest req = new SubscriptionRequest();
        req.setPlanId(1L);
        req.setStartDate(LocalDate.parse("2025-09-20"));
        req.setEndDate(LocalDate.parse("2026-09-20"));

        SubscriptionResponse sub = new SubscriptionResponse();
        sub.setId(1L);
        sub.setPlanName("Premium");
        sub.setStartDate(LocalDate.parse("2025-09-20"));
        sub.setEndDate(LocalDate.parse("2026-09-20"));
        when(subscriptionService.createSubscription(1L, req)).thenReturn(sub);

        ResponseEntity<SubscriptionResponse> response = subscriptionController.create(1L, req);
        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Premium", response.getBody().getPlanName());
    }

    @Test
    void testDelete() {
        doNothing().when(subscriptionService).deleteSubscription(1L);
        ResponseEntity<Void> response = subscriptionController.delete(1L);
        assertEquals(204, response.getStatusCodeValue());
    }
}
