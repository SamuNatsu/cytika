/// Post model
import { readFileSync } from 'fs';
import { PostMeta } from './PostMeta.mjs';

/* Export class */
export class Post {
  /* Members */
  public readonly meta: PostMeta;
  public readonly excerpt: string | null;
  public readonly rawContents: string;
  public readonly htmlContents: string = '';

  /* Constructor */
  public constructor(path: string) {
    /* Read raw file */
    const rawFile: string = readFileSync(path, 'utf-8');

    /* Separate front matter */
    const result1: RegExpExecArray | null = /^---\n([\s\S]+?)\n---\n/.exec(
      rawFile
    );
    if (result1 === null) {
      throw new Error(`Front matter not found: ${path}`);
    }
    this.meta = new PostMeta(result1[1]);

    /* Separate excerpt */
    const restContents: string = rawFile.slice(result1[0].length);
    const result2: RegExpExecArray | null = /^([\s\S]+?)\n<!--more-->/.exec(
      restContents
    );
    this.excerpt = result2 === null ? null : result2[1].trim();

    /* Store contents */
    this.rawContents = restContents
      .slice(result2 === null ? 0 : result2[0].length)
      .trim();

      console.log(this);
  }
}
