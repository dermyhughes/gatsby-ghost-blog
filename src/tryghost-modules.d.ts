declare module '@tryghost/content-api' {
  interface GhostContentAPIOptions {
    url: string;
    key: string;
    version: string;
  }

  export default class GhostContentAPI {
    constructor(options: GhostContentAPIOptions);

    settings: {
      browse(): Promise<unknown>;
    };

    posts: {
      browse(options?: unknown): Promise<unknown[]>;
    };

    pages: {
      browse(options?: unknown): Promise<unknown[]>;
    };

    tags: {
      browse(options?: unknown): Promise<unknown[]>;
    };
  }
}

declare module '@tryghost/helpers' {
  const helpers: {
    tags: (post: unknown, options?: unknown) => unknown;
  };

  export default helpers;
}
