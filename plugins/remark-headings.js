/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const toString = require('mdast-util-to-string');
const visit = require('unist-util-visit');
const escapeHtml = require('escape-html');

// https://github.com/syntax-tree/mdast#heading
function toValue(node) {
  if (node && node.type) {
    switch (node.type) {
      case 'text':
        return node.value;
      case 'heading':
        return node.children.map(toValue).join('');
      case 'inlineCode':
        return `<code>${escapeHtml(node.value)}</code>`;
      case 'emphasis':
        return `<em>${node.children.map(toValue).join('')}</em>`;
      case 'strong':
        return `<strong>${node.children.map(toValue).join('')}</strong>`;
      case 'delete':
        return `<del>${node.children.map(toValue).join('')}</del>`;
      default:
    }
  }

  return toString(node);
}

// Visit all headings. We `slug` all headings (to account for
// duplicates), but only take h2 and h3 headings.
function search(node) {
  const headings = [];
  let current = -1;
  let currentDepth = 0;

  const onHeading = (child, index, parent) => {
    const value = toString(child);

    if (parent !== node || !value || child.depth > 3 || child.depth < 2) {
      return;
    }

    const entry = {
      value: toValue(child),
      id: child.data.id,
      children: [],
    };

    if (!headings.length || currentDepth >= child.depth) {
      headings.push(entry);
      current += 1;
      currentDepth = child.depth;
    } else {
      headings[current].children.push(entry);
    }
  };

  visit(node, 'heading', onHeading);

  return headings;
}

const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const stringifyObject = require('stringify-object');

const parseOptions = {
  plugins: ['jsx'],
  sourceType: 'module',
};
const isImport = child => child.type === 'import';
const hasImports = index => index > -1;
const isExport = child => child.type === 'export';

const isTarget = (child, name) => {
  let found = false;
  const ast = parse(child.value, parseOptions);
  traverse(ast, {
    VariableDeclarator: path => {
      if (path.node.id.name === name) {
        found = true;
      }
    },
  });

  return found;
};

const getOrCreateExistingTargetIndex = (children, name) => {
  let importsIndex = -1;
  let targetIndex = -1;

  children.forEach((child, index) => {
    if (isImport(child)) {
      importsIndex = index;
    } else if (isExport(child) && isTarget(child, name)) {
      targetIndex = index;
    }
  });

  if (targetIndex === -1) {
    const target = {
      default: false,
      type: 'export',
      value: `export const ${name} = [];`,
    };

    targetIndex = hasImports(importsIndex) ? importsIndex + 1 : 0;
    children.splice(targetIndex, 0, target);
  }

  return targetIndex;
};

const rightToc = (options = {}) => {
  const name = options.name || 'rightToc';

  const transformer = node => {
    const headings = search(node);
    const { children } = node;
    const targetIndex = getOrCreateExistingTargetIndex(children, name);

    if (headings && headings.length) {
      children[targetIndex].value = `export const ${name} = ${stringifyObject(headings)};`;
    }
  };

  return transformer;
};

module.exports = rightToc;
