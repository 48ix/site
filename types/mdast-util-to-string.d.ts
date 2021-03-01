declare module 'mdast-util-to-string' {
  type Node = import('unist').Node;
  function toString(node: Node): string;
  export = toString;
}
