# 📚 User & Subscription Management API – Spring Boot CRUD

- Aplicación Spring Boot para gestionar usuarios, planes y suscripciones. Incluye:
- CRUD completo para usuarios, planes y suscripciones
- Relación usuario → suscripciones → plan
- Validación de datos con jakarta.validation
- H2 en memoria para pruebas y desarrollo
- Swagger/OpenAPI para documentación

## 📌 Features

- Layered architecture: `Controller`, `Service`, `Repository`, `Model`
- CRUD operations for a `Book` entity
- In-memory H2 database for development
- Input validation with annotations
- Dependency injection with `@Autowired` and constructors
- HTTP status code management
- Basic Swagger/OpenAPI documentation

## 📦 Technologies

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Validation (`jakarta.validation`)
- Swagger/OpenAPI (via `springdoc-openapi`)

---

## 🚀 How to Run

1. **Clone the repository**

```bash
git clone https://github.com/REW1420/User-Subscription-Management-API.git
```

```bash
cd User-Subscription-Management-API
```

2. **Build the project**

```bash
mvn clean install
```

- Or Grandle

```bash
./gradlew build
```

3. **Run the application**

```bash
mvn spring-boot:run
```

4. **Access the application**

- Swagger UI: http://localhost:8080/swagger-ui.html

- Base URL: http://localhost:8080/api

##🔧 API Endpoints

## User

| Método | Endpoint          | Descripción                |
| ------ | ----------------- | -------------------------- |
| GET    | `/api/users`      | Obtener todos los usuarios |
| POST   | `/api/users`      | Crear un usuario           |
| DELETE | `/api/users/{id}` | Eliminar un usuario        |

##Plans

| Método | Endpoint          | Descripción              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/plans`      | Obtener todos los planes |
| GET    | `/api/plans/{id}` | Obtener plan por ID      |
| POST   | `/api/plans`      | Crear un plan            |
| PUT    | `/api/plans/{id}` | Actualizar plan          |
| DELETE | `/api/plans/{id}` | Eliminar plan            |

## Subscriptions

| Método | Endpoint                            | Descripción                       |
| ------ | ----------------------------------- | --------------------------------- |
| GET    | `/api/subscriptions`                | Obtener todas suscripciones       |
| GET    | `/api/subscriptions/{id}`           | Obtener suscripción por ID        |
| POST   | `/api/users/{userId}/subscriptions` | Crear suscripción para un usuario |
| PUT    | `/api/subscriptions/{id}`           | Actualizar suscripción            |
| DELETE | `/api/subscriptions/{id}`           | Eliminar suscripción              |

## 🧪 Running Tests

```bash
./mvnw test
```

## 📂 Project Structure

src/
├── main/java/com/example/usermanagement
│ ├── controller/ # REST Controllers: Expose the API endpoints
│ ├── dto/ # Data Transfer Objects: Represent input and output data
│ ├── entity/ # JPA Entities: Map the database tables
│ ├── exception/ # Custom exception classes
│ ├── repository/ # JPA Repositories: Database access layer
│ └── service/ # Business logic
└── test/java/com/example/usermanagement
├── PlanControllerTest.java # Test for Plan controller
├── SubscriptionControllerTest.java # Test for Subscription controller
└── UserControllerTest.java # Test for User controller

## 🧑‍💻 Author

Created by William Ernesto Ramos Valladares
