declare module 'remark-vdom' {
  type Plugin = import('unified').Plugin;
  const plugin: Plugin;
  export = plugin;
}
