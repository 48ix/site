declare module 'remark-slug' {
  type Plugin = import('unified').Plugin;
  const plugin: Plugin;
  export = plugin;
}
