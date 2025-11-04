package com.example.usermanagement.config;

import com.example.usermanagement.entity.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (!userRepository.existsByEmail("admin@example.com")) {
                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                String encodedPassword = encoder.encode("admin123");

                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@example.com");
                admin.setPassword(encodedPassword);

                userRepository.save(admin);
                System.out.println("✅ Default admin user created: admin@example.com / admin123");
            } else {
                System.out.println("ℹ️ Admin user already exists, skipping seed...");
            }
        };
    }
}
