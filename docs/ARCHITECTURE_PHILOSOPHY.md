# Architecture Philosophy (NBA Platform)

The Neelus Boarding Adventure (NBA) application is built upon a hybrid architecture emphasizing strict decentralization of rules, scalable test-driven systems, and a high-fidelity visual experience.

## 1. The Autonomous AI Workspace (Hybrid Knowledge)
In modern AI-assisted engineering, the "Source of Truth" must always live strictly within the source-controlled repository so that it remains portable, version-controlled, and transparent to all human developers.
- **Self-Contained Instructions**: Files like `.antigravity_instructions.md` and `docs/DESIGN_STANDARDS.md` dictate how any AI assistant or developer interfaces with this codebase.
- **Global Memory Linking**: The AI's internal Knowledge Base (KI) system is purely utilized as a pointer bridge, ensuring the AI instantly parses these localized, version-controlled files upon starting a new session without requiring manual prompting.

## 2. Infrastructure & Component Layers
- **Frontend (TDD First):** Built using modern React (Vite environment). All critical business logic must be verified via `vitest` unit tests in `src/pages/__tests__/` prior to integration. 
- **Backend (Amplify Architecture):** We employ a "Verify Later" security strategy. The system leverages AWS Amplify to handle robust authentication protocols securely.
- **Component Separation:** Global aesthetic UI elements (such as `AmbientBackground.tsx`) are strictly separated from core operational layouts to keep components single-purpose and clean.

## 3. Operational Guiding Principles
1. **Uncompromising Aesthetics:** Every user touchpoint must embody the "BBA Dog-Tech Matrix" design language—merging trustworthy enterprise blueprint aesthetics with subtle pet-centric motifs.
2. **Confidence via Coverage:** Code without tests is a liability. Adherence to Test-Driven Development (TDD) guarantees that our operational hub remains crash-proof.
3. **Decentralized Independence:** If any new developer (human or machine) clones this exact node, they must instantly inherit the exact development standards dictated by the documentation in this `/docs` hub.
