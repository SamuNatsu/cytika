/// Abstract content model
import { readFileSync } from 'fs';
import { PageMeta } from './PageMeta.mjs';
import { PostMeta } from './PostMeta.mjs';

/* Export class */
export abstract class AbstractContent<MetaType extends PageMeta | PostMeta> {
  /* Members */
  protected meta: MetaType;
  protected excerpt: string | null;
  protected rawContents: string;
  protected htmlContents: string = '';

  /* Constructor */
  public constructor(
    path: string,
    createInstance: (frontMatter: string) => MetaType
  ) {
    /* Read raw file */
    const rawFile: string = readFileSync(path, 'utf-8');

    /* Separate front matter */
    const result1: RegExpExecArray | null = /^---\n([\s\S]+?)\n---\n/.exec(
      rawFile
    );
    if (result1 === null) {
      throw new Error(`Front matter not found: ${path}`);
    }
    try {
      this.meta = createInstance(result1[1]);
    } catch (err: unknown) {
      throw new Error(
        `Invalid front matter: ${path}\n${JSON.stringify(err, null, 2)}`
      );
    }

    /* Separate excerpt */
    const restContents: string = rawFile.slice(result1[0].length);
    const result2: RegExpExecArray | null = /^([\s\S]+?)\n<!--more-->/.exec(
      restContents
    );
    this.excerpt = result2 === null ? null : result2[1].trim();

    /* Get contents */
    this.rawContents = restContents
      .slice(result2 === null ? 0 : result2[0].length)
      .trim();
  }

  /* Methods */
  public getMeta(): MetaType {
    return this.meta;
  }
  public getExcerpt(): string | null {
    return this.excerpt;
  }
  public getRawContents(): string {
    return this.rawContents;
  }
  public getHTMLContents(): string {
    return this.htmlContents;
  }
}
