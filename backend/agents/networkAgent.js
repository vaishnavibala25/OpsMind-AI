export const networkPrompt = (incident) => `
You are a Senior Network Engineer.

Analyze:

${incident}

Provide:
1. Possible Network Causes
2. Risks
3. Confidence Score
`;