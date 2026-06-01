export const applicationPrompt = (incident) => `
You are a Senior Software Engineer.

Analyze:

${incident}

Provide:
1. Application Causes
2. Risks
3. Confidence Score
`;