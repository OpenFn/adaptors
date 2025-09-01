import fs from 'fs';
const packagesDir = '../../packages';

export default function getAdaptorsFromDir() {
  return fs
    .readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

const createNode = (type, props) => ({ type, ...props });

export const createCommitLinkNode = hash =>
  createNode('link', {
    url: `https://github.com/OpenFn/adaptors/commit/${hash}`,
    children: [createNode('text', { value: hash })],
  });

export const createTextNode = value => createNode('text', { value });

/**
 * Splits a text node containing commit hashes into multiple nodes
 * @param {Object} textNode - The text node to process
 * @returns {Array|Object} - Array of nodes if split, or single node if no changes
 */
export function splitTextNodeWithCommitHashes(textNode) {
  // Match both plain and bracketed hashes, capturing the hash portion
  const matches = [...textNode.value.matchAll(/(?:\[)?([a-f0-9]{7,40})]?/g)];

  if (matches.length === 0) return textNode;

  // Check for already linked hashes
  const linkedHashes = new Set(
    textNode.value
      .match(/\[[^\]]*(\b[a-f0-9]{7,40}\b)[^\]]*\]\([^)]+\)/g)
      ?.map(match => match.match(/\b[a-f0-9]{7,40}\b/)[0]) || []
  );

  const parts = [];
  let currentIndex = 0;

  matches.forEach(match => {
    const [fullMatch, hash] = match;
    const matchIndex = match.index;

    // Add text before the hash if any
    if (matchIndex > currentIndex) {
      parts.push(
        createTextNode(textNode.value.substring(currentIndex, matchIndex))
      );
    }

    // Add hash as link or text
    parts.push(
      linkedHashes.has(hash)
        ? createTextNode(fullMatch)
        : createCommitLinkNode(hash)
    );

    currentIndex = matchIndex + fullMatch.length;
  });

  // Add remaining text after last match
  if (currentIndex < textNode.value.length) {
    parts.push(createTextNode(textNode.value.substring(currentIndex)));
  }

  return parts.length > 1 ? parts : parts[0];
}

/**
 * Recursively processes AST nodes to convert commit hashes to GitHub links
 * @param {Object} node - The AST node to process
 * @returns {Object|Array} - The processed node(s)
 */
export function processCommitHashes(node) {
  if (!node || typeof node !== 'object') return node;
  if (node.type === 'link') return node;
  if (node.type === 'text' && node.value)
    return splitTextNodeWithCommitHashes(node);

  if (node.children?.length) {
    return {
      ...node,
      children: node.children.flatMap(child => processCommitHashes(child)),
    };
  }

  return node;
}
