# **🚀 LinkUp Testing Repository**

Welcome to the **Testing** repository for LinkUp! This repository contains all automated test cases, including **E2E testing (Playwright)**, **Performance testing (JMeter)**, and **Cross-platform testing**.

## 📂 **Repository Structure**

```
📦 Testing
├── 📁 CI-CD                 # CI/CD configurations for automated test execution
├── 📁 Configs               # Test configuration files (env, credentials, etc.)
├── 📁 Cross-Testing         # Tests for cross-browser/platform compatibility
├── 📁 E2E                   # End-to-End tests (Playwright)
├── 📁 Performance/JMeter    # Performance & stress testing scripts
├── 📁 Reports               # Test reports & logs
├── 📁 fixtures              # Shared test data and mocks
├── 📁 utils                 # Utility functions & helpers for tests
└── README.md                # Repository documentation
```

## 🔄 **Branching Strategy**

We follow a structured **Git branching workflow** to ensure a smooth development and testing process:

### **Main Branches**
- `main` → Stable branch, updated only after tests pass.
- `testing` → Integration branch, where all test cases are merged before reaching `main`.

### **Feature Branches**
For each new test case, create a separate branch:
- `e2e-login-tests` → End-to-end tests for login.
- `e2e-profile-management-tests` → Tests for profile management.
- `perf-stress-tests` → Performance & stress testing.

### **Workflow for Adding New Tests**
1. **Create a new feature branch** from `testing`:
   ```sh
   git checkout testing
   git pull origin testing
   git checkout -b e2e-new-feature-tests
   git push origin e2e-new-feature-tests
   ```
2. **Develop & commit your test cases**:
   ```sh
   git add .
   git commit -m "Added new feature test cases"
   git push origin e2e-new-feature-tests
   ```
3. **Create a Pull Request (PR) to `testing`** and request review.
4. **Merge into `testing`** after approval.
    ```sh
   git checkout testing  
   git pull origin testing  
   git merge e2e-login-tests  
   git push origin testing  
   ```
6. **Merge `testing` into `main`** when all tests pass.
   ```sh
   git checkout main  
   git pull origin main  
   git merge testing  
   git push origin main 
   ```

## 🎯 **Testing Frameworks & Tools**
- **Playwright** → For E2E web testing.
- **JMeter** → For performance & stress testing.
- **GitHub Actions** → CI/CD for automated test execution.

## 🤝 **Contributing Guidelines**
- Follow the **branching workflow** outlined above.
- Ensure tests are well-documented and reusable.
- Run tests locally before creating a PR.

---

