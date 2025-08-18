---
applyTo: '**/*.ts'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

---

## General principles

- **Separation of layers**: Divide the code into well-defined layers: `Domain`, `Application`, `Infrastructure` and `Presentation`.
- **Dependency inversion**: Dependencies should point toward the domain, not the other way around.
- **Framework independence**: The domain and application logic should not depend on frameworks or external libraries.
- **Testability**: Each layer should be easily testable in isolation.

## Suggested folder structure

- `src/`
  - `domain/`: Entities, interfaces and pure business logic.
  - `application/`: Use cases and application logic.
  - `infrastructure/`: Concrete implementations, such as database access or external services.
  - `presentation/`: User interfaces, controllers and input/output adapters.

## Best practices

- **Entities**: Define entities as plain classes or interfaces without external dependencies.
- **Use cases**: Implement application logic in services or functions that orchestrate entities.
- **Interfaces**: Use interfaces to abstract dependencies between layers.
- **Dependency injection**: Implement dependency injection to decouple concrete implementations from abstractions.

## Code generation rules

- When generating new modules or features, ensure each component is placed in the appropriate layer.
- Avoid placing business logic in the presentation or infrastructure layers.
- Ensure module dependencies respect the layer direction (outer -> inner).

## Reference files / folders

Include or update the domain, application, infrastructure and presentation folders as appropriate:

- `src/domain/`
- `src/application/`
- `src/infrastructure/`
- `src/presentation/`