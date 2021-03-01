import unified from 'unified';
import vdom from 'remark-vdom';
import slug from 'remark-slug';
import parse from 'remark-parse';
import toString from 'mdast-util-to-string';
import visit from 'unist-util-visit';

import type { Node, Parent } from 'unist';

type HeadingNodeData = {
  id: string;
  value: string;
  children: HeadingNodeData[];
};

interface HeadingNode extends Node {
  depth: number;
  data?: HeadingNodeData;
}

export async function getHeadings(content: string, depth: number = 3): Promise<TocHeading[]> {
  let current = -1;
  let currentDepth = 0;
  const headings = [] as TocHeading[];

  function stupidTransformer(node: Node) {
    function onHeading(child: HeadingNode, _: number, parent?: Parent) {
      if (typeof child.data === 'undefined') {
        child.data = {} as HeadingNodeData;
      }

      if (parent !== node || child.depth > depth || child.depth < depth - 1) {
        return;
      }
      const value = toString(child);
      const { id } = child.data;
      const entry = { id, value, children: [] } as HeadingNodeData;

      if (!headings.length || currentDepth >= child.depth) {
        headings.push(entry);
        current += 1;
        currentDepth = child.depth;
      } else {
        headings[current].children.push(entry);
      }
    }
    return visit<HeadingNode>(node, 'heading', onHeading);
  }
  function stupidPlugin() {
    return stupidTransformer;
  }
  unified()
    .use(parse)
    .use(slug)
    .use(vdom)
    .use(stupidPlugin)
    .process(content, err => {
      err && console.error(err);
    });

  return headings;
}
