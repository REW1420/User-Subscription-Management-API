package com.usermanagement.usermanagement;

import com.example.usermanagement.controller.PlanController;
import com.example.usermanagement.dto.PlanRequest;
import com.example.usermanagement.dto.PlanResponse;
import com.example.usermanagement.service.PlanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanControllerTest {

    @Mock
    private PlanService planService;

    @InjectMocks
    private PlanController planController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll() {
        PlanResponse plan = new PlanResponse();
        plan.setId(1L);
        plan.setName("Premium Plan");
        plan.setDefaultDurationDays(365);
        when(planService.getAllPlans()).thenReturn(List.of(plan));

        ResponseEntity<List<PlanResponse>> response = planController.getAll();

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().size());
        verify(planService, times(1)).getAllPlans();
    }

    @Test
    void testGetOne() {
        PlanResponse plan = new PlanResponse();
        plan.setId(1L);
        plan.setName("Premium Plan");
        plan.setDefaultDurationDays(365);
        when(planService.getPlan(1L)).thenReturn(plan);

        ResponseEntity<PlanResponse> response = planController.getOne(1L);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Premium Plan", response.getBody().getName());
        verify(planService, times(1)).getPlan(1L);
    }

    @Test
    void testCreate() {
        PlanRequest request = new PlanRequest();
        request.setName("Premium Plan");
        request.setDefaultDurationDays(365);
        PlanResponse responsePlan = new PlanResponse();
        responsePlan.setId(1L);
        responsePlan.setName("Premium Plan");
        responsePlan.setDefaultDurationDays(365);

        when(planService.createPlan(request)).thenReturn(responsePlan);

        ResponseEntity<PlanResponse> response = planController.create(request);

        assertEquals(201, response.getStatusCodeValue());
        assertEquals("Premium Plan", response.getBody().getName());
        verify(planService, times(1)).createPlan(request);
    }

    @Test
    void testUpdate() {
        PlanRequest request = new PlanRequest();
        request.setName("Basic Plan");
        request.setDefaultDurationDays(365);
        PlanResponse responsePlan = new PlanResponse();
        responsePlan.setId(1L);
        responsePlan.setName("Basic Plan");
        responsePlan.setDefaultDurationDays(365);

        when(planService.updatePlan(1L, request)).thenReturn(responsePlan);

        ResponseEntity<PlanResponse> response = planController.update(1L, request);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Basic Plan", response.getBody().getName());
        verify(planService, times(1)).updatePlan(1L, request);
    }

    @Test
    void testDelete() {
        doNothing().when(planService).deletePlan(1L);

        ResponseEntity<Void> response = planController.delete(1L);

        assertEquals(204, response.getStatusCodeValue());
        verify(planService, times(1)).deletePlan(1L);
    }
}
