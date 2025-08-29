import fs from 'fs';
const packagesDir = '../../packages';

export default function getAdaptorsFromDir() {
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const commitHashRegex = /\b([a-f0-9]{7,40})\b/g;

/**
 * Creates a GitHub commit link node for the given hash
 * @param {string} hash - The commit hash to create a link for
 * @returns {Object} - A remark link node
 */
export function createCommitLinkNode(hash) {
  return {
    type: 'link',
    url: `https://github.com/OpenFn/adaptors/commit/${hash}`,
    title: null,
    children: [
      {
        type: 'text',
        value: hash,
      },
    ],
  };
}

/**
 * Creates a text node with the given value
 * @param {string} value - The text content
 * @returns {Object} - A remark text node
 */
export function createTextNode(value) {
  return {
    type: 'text',
    value,
  };
}

/**
 * Splits a text node containing commit hashes into multiple nodes
 * @param {Object} textNode - The text node to process
 * @returns {Array|Object} - Array of nodes if split, or single node if no changes
 */
export function splitTextNodeWithCommitHashes(textNode) {
  const matches = [...textNode.value.matchAll(commitHashRegex)];

  if (matches.length === 0) {
    return textNode;
  }

  const parts = [];
  let lastIndex = 0;

  for (const match of matches) {
    const hash = match[1];
    const matchIndex = match.index;

    // Add text before the hash
    if (matchIndex > lastIndex) {
      const textBefore = textNode.value.slice(lastIndex, matchIndex);
      parts.push(createTextNode(textBefore));
    }

    // Add the commit link node
    parts.push(createCommitLinkNode(hash));

    lastIndex = matchIndex + hash.length;
  }

  // Add remaining text after the last hash
  if (lastIndex < textNode.value.length) {
    const textAfter = textNode.value.slice(lastIndex);
    parts.push(createTextNode(textAfter));
  }

  // Return array if multiple parts, single node if only one
  return parts.length > 1 ? parts : parts[0];
}

/**
 * Recursively processes AST nodes to convert commit hashes to GitHub links
 * @param {Object} node - The AST node to process
 * @returns {Object|Array} - The processed node(s)
 */
export function processCommitHashes(node) {
  if (!node || typeof node !== 'object') {
    return node;
  }

  // Process text nodes that may contain commit hashes
  if (node.type === 'text' && node.value) {
    return splitTextNodeWithCommitHashes(node);
  }

  // Recursively process child nodes
  if (node.children && Array.isArray(node.children)) {
    const processedChildren = [];

    for (const child of node.children) {
      const processedChild = processCommitHashes(child);

      if (Array.isArray(processedChild)) {
        // If the child was split into multiple nodes, spread them
        processedChildren.push(...processedChild);
      } else {
        processedChildren.push(processedChild);
      }
    }

    return {
      ...node,
      children: processedChildren,
    };
  }

  return node;
}
