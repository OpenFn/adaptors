import {
  GoogleGenAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerateContentResponse,
} from '@google/genai';
import {
  composeNextState,
  commonExecute,
  expandReferences,
} from './Utils';

/**
 * Options provided to the Prompt function
 * @typedef {Object} PromptOptions
 * @public
 * @property {string} model - Which model to use, defaults to 'gemini-2.5-flash-lite'
 * @property {object} generationConfig - Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk
 */

/**
 * Options provided to the Deep Research function
 * @typedef {Object} DeepResearchOptions
 * @public
 * @property {string} model - Which model to use, defaults to 'gemini-2.5-flash-lite'
 * @property {object} tools - Tools configuration (e.g., googleSearch) shortcut to add tools in generationConfig use any of the following tools: https://ai.google.dev/gemini-api/docs/tools
 * @property {object} generationConfig - Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk
 */


/**
 * Options provided to the Generate Image function
 * @typedef {Object} GenerateImageOptions
 * @public
 * @property {string} model - Which model to use, defaults to ' 'gemini-3-pro-image-preview'
 * @property {string} imageSize - Size of the image to generate, defaults to '1k'
 * @property {string} aspectRatio - Aspect ratio of the image to generate, defaults to '1:1' 
 * @property {object} generationConfig - Configuration for generation (temperature, topK, etc.) see the options here: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/multimodal/content-generation-parameters#googlegenaisdk_textgen_config_with_txt-nodejs_genai_sdk
 */

let client: GoogleGenAI;

const GEMINIMODEL = [
  'gemini-3-pro-preview',
  'gemini-3-flash-preview',
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
]as const

type GeminiModel = typeof GEMINIMODEL[number];

const GEMINIIMAGE = [
  'gemini-3-pro-image-preview',
  'gemini-2.5-flash-image',
] as const

type GeminiImageModel = typeof GEMINIIMAGE[number];

/**
 * Creates a Gemini client
 * @param state
 * @returns {state}
 */
export function createClient(state: any) {
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
export function execute(...operations: any[]) {
  const initialState = {
    references: [],
    data: null,
  };

  return (state: any) => {
    return (commonExecute(
      createClient,
      ...operations
    ) as any)({
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
export function prompt(message: string, options: any = {}) {
  return async (state: any) => {
    const [resolvedMessage, resolvedOpts] = expandReferences(
      state,
      message,
      options
    );
    const modelName: GeminiModel = resolvedOpts.model || 'gemini-2.5-flash-lite'; 

    const msg = await client.models.generateContent({
      model: modelName,
      contents: resolvedMessage,
      config: resolvedOpts.config,
   
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

// May actually want to replace this with the actual deep research function
export function deepResearch(message: string, options: any = {}) {
  return async (state: any) => {
    const [resolvedMessage, resolvedOpts] = expandReferences(
      state,
      message,
      options
    );

    const modelName: GeminiModel = resolvedOpts.model || 'gemini-2.5-flash-lite';
    
    const tools = resolvedOpts.tools || [{ googleSearch: {} }];

     const msg = await client.models.generateContent({
      model: modelName,
      contents: resolvedMessage,
      config:{
        tools:tools,
        ...resolvedOpts.config
      }
    }); 
    
    const text = msg.text;
    // Candidates might contain grounding metadata

    console.log('√ Deep research operation completed');
    return composeNextState(state, { text, response: {msg, citations: msg.candidates[0]?.groundingMetadata?.groundingSupports, groundingChunks: msg.candidates[0]?.groundingMetadata?.groundingChunks} });
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
export function generateImage(promptText: string, options: any = {}) {
  return async (state: any) => {
     const [resolvedPrompt, resolvedOpts] = expandReferences(
      state,
      promptText,
      options
    );
    
    const modelName: GeminiImageModel = resolvedOpts.model || 'gemini-3-pro-image-preview'

    const result = await client.models.generateContent({
      model: modelName,
      contents: resolvedPrompt,
      config:{
        imageConfig:{
          aspectRatio: resolvedOpts.aspectRatio || '1:1',
          imageSize: resolvedOpts.imageSize || '1K',
        },
        ...resolvedOpts.config,
      }
    })

    let buffer;
    
    for (const part of result.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      buffer = Buffer.from(imageData, "base64");
    }
    // Assuming result handling for image
    
    console.log('√ Generate image operation completed');
    return composeNextState(state, {result, buffer});
  };
}
}

export {
  dataPath,
  dataValue,
  dateFns,
  cursor,
  each,
  field,
  fields,
  fn,
  lastReferenceValue,
  merge,
  sourceValue,
} from '@openfn/language-common';
