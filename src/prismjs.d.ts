declare module 'prismjs' {
  const Prism: {
    highlightAll: () => void;
  };

  export default Prism;
}

declare module 'prismjs/components/prism-typescript';
declare module 'prismjs/components/prism-jsx';
declare module 'prismjs/components/prism-tsx';
