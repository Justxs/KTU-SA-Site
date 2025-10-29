---
applyTo: "**"
---

1. **Code Structure**: Follow the existing folder and file structure. Create new files in the appropriate directories and maintain the naming conventions used in the project.

2. **Styling**: This part is needed to be refactored to use MUI's styling solution instead of CSS modules. Prefer using component props for styling over custom CSS classes and sx prop where possible.

3. **API Calls**: Use the existing API service layer for making HTTP requests. Follow the established patterns for handling loading states, errors, and data transformations.

4. **Accessibility**: Ensure that all new components and features are accessible. Follow the project's accessibility guidelines and use semantic HTML.

5. **SEO**: Optimize components for search engines by using proper HTML tags, metadata, and following best practices for SEO.

6. **Localization**: Ensure that all text content is translatable and follows the project's localization guidelines. Use the i18n library for managing translations and avoid hardcoding strings.

7. **MUI**: Use latest v7 MUI components and hooks. Avoid deprecated components and patterns.

8. **Hooks**: Do not use useMemo and useCallback unless it is told otherwise.

9. **TypeScript**: Ensure all new code is written in TypeScript and follows the project's type safety guidelines. Use interfaces and types effectively to define component props and state.

10. **Commenting**: DO NOT WRITE COMMENTS UNLESS INSTRUCTED TO DO SO. Only write comments when explicitly asked.

11. **NextJs**: Follow NextJs v16 best practices for routing, data fetching, and component structure. Use server-side rendering and static site generation where appropriate.
