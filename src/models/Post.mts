/// Post model
import { PostMeta } from './PostMeta.mjs';
import { AbstractContent } from './AbstractContent.mjs';

/* Export class */
export class Post extends AbstractContent<PostMeta> {
  /* Constructor */
  public constructor(path: string) {
    super(path, (frontMatter: string): PostMeta => new PostMeta(frontMatter));
  }
}
