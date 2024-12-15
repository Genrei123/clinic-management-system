package com.jwt.spring_security.config;

import com.jwt.spring_security.model.Employee;
import com.jwt.spring_security.service.EmployeeService;
import com.jwt.spring_security.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.context.event.EventListener;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private EmployeeService employeeService; // Inject EmployeeService to update login timestamp

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/login", "/register").permitAll()
                        .requestMatchers("/unarchivePatient/", "/archivePatient/{id}", "/users", "/service/**", "/getPatientLogs",
                                "/purchaseItems", "/searchPatients", "/deletePatient/{id}", "/generateqr",
                                "/scanqr", "/addPatientLog", "/generatepdf/{patientId}", "/api/upload-profile-picture",
                                "/addPatient", "/getPatient", "/getPatient/{id}", "/home", "/getPatient",
                                "/employees/me", "/items").hasAnyAuthority("ROLE_EMPLOYEE", "ROLE_OWNER")
                        .requestMatchers("/update/", "/addBranch", "/branches", "/deleteBranch/", "/readBranch/", "/items",
                                "/items/", "/addItems", "/deleteItems/{id}", "/addItem", "/addItems", "/updateItems/{id}",
                                "/items", "/inventory", "/employees", "/reports", "/branches", "/readBranch/",
                                "/deleteBranch/", "/addBranch", "/addItems").hasAuthority("ROLE_OWNER")
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder(Constants.BCRYPT_STRENGTH));
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // This is a user in the database!
        UserDetails user1 = User
                .withDefaultPasswordEncoder()
                .username("Genrey")
                .password("Cristobal")
                .roles("Owner")
                .build();

        // Implements UserDetailsService
        return new InMemoryUserDetailsManager(user1);
    }

    // Listen to authentication success event to update login timestamp
    @EventListener
    public void onAuthenticationSuccess(AuthenticationSuccessEvent event) {
        // Retrieve the authentication object from the event
        Object principal = event.getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();

            // Fetch the employee by username (ensure username is unique)
            Employee employee = employeeService.findByUsername(username); // Ensure this method is in your service

            if (employee != null) {
                Long employeeID = employee.getEmployeeID(); // Ensure employeeID is of type Long
                employeeService.saveLoginTimestamp(employeeID); // Save login timestamp using Long employeeID
            }
        }
    }
}
