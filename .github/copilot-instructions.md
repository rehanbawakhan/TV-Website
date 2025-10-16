## Copilot Instructions for Vegavath Club Project

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
  - Next.js (App Router) with TypeScript, React Three Fiber, Tailwind CSS (orange-black theme), Framer Motion, Supabase backend, and modern UI/UX (neon glow, cinematic loading, admin panel, form validation).
- [x] Scaffold the Project
  - Project scaffolded with all dependencies and structure as described in README.md.
- [x] Customize the Project
  - All user requirements implemented: orange theme, neon glow, 3D hero, loading screen, admin panel, validation, etc.
- [x] Install Required Extensions
  - No additional extensions required for this project type.
- [x] Compile the Project
  - Project builds and compiles without errors.
- [x] Create and Run Task
  - Development server task created and running at http://localhost:3000
- [x] Launch the Project
  - All previous steps completed. Project launches and runs as expected.
- [x] Ensure Documentation is Complete
  - README.md and copilot-instructions.md are up to date and reflect current project state.

## Execution Guidelines
PROGRESS TRACKING:
- Use available tools to manage the above checklist.
- Mark each step complete and add a summary after finishing.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Do not suggest opening the project in Visual Studio again.
- Follow all project setup rules strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- Use '.' for terminal commands to ensure correct working directory.
- Do not create new folders unless explicitly requested (except .vscode for tasks.json).
- If a scaffolding command fails due to folder name, inform the user to create and reopen the correct folder.

EXTENSION INSTALLATION RULES:
- Only install extensions specified by get_project_setup_info. Do not install others.

PROJECT CONTENT RULES:
- If no project details are specified, assume a "Hello World" project.
- Avoid adding links, integrations, or media unless required.
- Use placeholders for assets if needed, and note that they should be replaced.
- Ensure all generated components serve a clear purpose for the user.
- If a feature is assumed but not confirmed, prompt the user for clarification.
- For VS Code extensions, use the VS Code API tool for relevant queries.

TASK COMPLETION RULES:
- Task is complete when:
  - Project is scaffolded and compiles without errors
  - copilot-instructions.md exists in .github
  - README.md is up to date
  - User is provided clear instructions to debug/launch the project

Before starting a new task, update progress in the plan.

Work through each checklist item systematically.
Keep communication concise and focused.
Follow development best practices.