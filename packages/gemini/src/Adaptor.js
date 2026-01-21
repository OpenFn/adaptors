import { GoogleGenAI, } from '@google/genai';
import { composeNextState, commonExecute, expandReferences, } from './Utils';
/**
 * Options provided to the Prompt function
 * @typedef {Object} PromptOptions
 * @public
 * @property {string} model - Which model to use, e.g., 'gemini-1.5-flash'.
 * @property {object} generationConfig - Configuration for generation (temperature, topK, etc.)
 * @property {object} safetySettings - Safety settings for the model.
 */
// Placeholder for DeepResearchOptions
/**
 * Options provided to the Deep Research function
 * @typedef {Object} DeepResearchOptions
 * @public
 * @property {string} model - Which model to use.
 * @property {object} tools - Tools configuration (e.g., googleSearch).
 */
let client;
const GEMINIMODEL = [
    'gemini-3-pro-preview',
    'gemini-3-flash-preview',
    'gemini-2.5-pro',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
];
const GEMINIIMAGE = [
    'gemini-3-pro-image-preview',
    'gemini-2.5-flash-image',
];
/**
 * Creates a Gemini client
 * @param state
 * @returns {state}
 */
export function createClient(state) {
    const { apiKey } = state.configuration;
    client = new GoogleGenAI({
        apiKey,
    });
    return state;
}
/**
 * Executes a series of operations.
 * @private
 * @param operations
 * @returns {operation}
 */
export function execute(...operations) {
    const initialState = {
        references: [],
        data: null,
    };
    return (state) => {
        return commonExecute(createClient, ...operations)({
            ...initialState,
            ...state,
        });
    };
}
/**
 * Prompt the Gemini interface to respond
 * @example
 * prompt(`Summarize this text: ${JSON.stringify($.data)}`);
 * @public
 * @function
 * @param {string} message - The prompt
 * @param {PromptOptions} options - Model and other parameters
 * @returns {operation}
 */
export function prompt(message, options = {}) {
    return async (state) => {
        const [resolvedMessage, resolvedOpts] = expandReferences(state, message, options);
        const modelName = resolvedOpts.model || GEMINIMODEL[6];
        const msg = await client.models.generateContent({
            model: modelName,
            contents: resolvedMessage,
        });
        const text = msg.text;
        console.log('√ Prompt operation completed');
        return composeNextState(state, { text, response: msg });
    };
}
/**
 * Prompt Gemini deep research (using Google Search grounding)
 * @example
 * deepResearch(`Find recent news about OpenFn`);
 * @public
 * @function
 * @param {string} message - The research query
 * @param {DeepResearchOptions} options - Model and tools
 * @returns {operation}
 */
export function deepResearch(message, options = {}) {
    return async (state) => {
        const [resolvedMessage, resolvedOpts] = expandReferences(state, message, options);
        // Assuming deep research uses a specific model or tool config
        // For now, implementing with googleSearch tool if available in SDK or passing it through
        const modelName = resolvedOpts.model || GEMINIMODEL[6];
        // Check if tools are provided or default to googleSearch retrieval tool if supported
        // Note: Actual implementation depends on specific SDK capabilities for "deep research"
        // Here we assume utilizing tools for grounding.
        const tools = resolvedOpts.tools || [{ googleSearch: {} }];
        // const model = client.models.ge({
        //   model: modelName,
        //   tools: tools,
        // });
        const msg = await client.models.generateContent({
            model: modelName,
            contents: resolvedMessage,
            config: {
                tools: tools
            }
        });
        const text = msg.text;
        const grabCitation = (response) => {
            let text = response.text;
            const supports = response.candidates[0]?.groundingMetadata?.groundingSupports;
            const chunks = response.candidates[0]?.groundingMetadata?.groundingChunks;
            // Sort supports by end_index in descending order to avoid shifting issues when inserting.
            const sortedSupports = [...supports].sort((a, b) => (b.segment?.endIndex ?? 0) - (a.segment?.endIndex ?? 0));
            for (const support of sortedSupports) {
                const endIndex = support.segment?.endIndex;
                if (endIndex === undefined || !support.groundingChunkIndices?.length) {
                    continue;
                }
                const citationLinks = support.groundingChunkIndices
                    .map(i => {
                    const uri = chunks[i]?.web?.uri;
                    if (uri) {
                        return `[${i + 1}](${uri})`;
                    }
                    return null;
                })
                    .filter(Boolean);
                if (citationLinks.length > 0) {
                    const citationString = citationLinks.join(", ");
                    text = text.slice(0, endIndex) + citationString + text.slice(endIndex);
                }
            }
            return text;
        };
        const citations = grabCitation(msg);
        // Candidates might contain grounding metadata
        console.log('√ Deep research operation completed');
        return composeNextState(state, { text, response: { msg, citations } });
    };
}
/**
 * Generate an image using Gemini/Imagen
 * @example
 * generateImage("A futuristic city skyline");
 * @public
 * @function
 * @param {string} promptText - The image prompt
 * @param {object} options - Model and generation options
 * @returns {operation}
 */
export function generateImage(promptText, options = {}) {
    return async (state) => {
        const [resolvedPrompt, resolvedOpts] = expandReferences(state, promptText, options);
        // Note: Image generation via GoogleGenerativeAI SDK might vary. 
        // Usually uses 'imagen-3.0-generate-001' or similar models.
        const modelName = resolvedOpts.model || GEMINIIMAGE[0];
        // This is a placeholder as the unified SDK usage for image generation might differ slightly
        // or require a different method than generateContent depending on version.
        // Assuming generateContent returns a blob or uri for image models.
        const result = await client.models.generateContent({
            model: modelName,
            contents: resolvedPrompt,
            config: {
                imageConfig: {
                    aspectRatio: resolvedOpts.aspectRatio || '1:1',
                    imageSize: resolvedOpts.imageSize || '1K',
                }
            }
        });
        let buffer;
        for (const part of result.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
            }
            else if (part.inlineData) {
                const imageData = part.inlineData.data;
                buffer = Buffer.from(imageData, "base64");
            }
            // Assuming result handling for image
            console.log('√ Generate image operation completed');
            return composeNextState(state, { result, buffer });
        }
        ;
    };
}
1;
export { dataPath, dataValue, dateFns, cursor, each, field, fields, fn, lastReferenceValue, merge, sourceValue, } from '@openfn/language-common';
