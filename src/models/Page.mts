/// Page model
import { AbstractContent } from './AbstractContent.mjs';
import { PageMeta } from './PageMeta.mjs';

/* Export class */
export class Page extends AbstractContent<PageMeta> {
  /* Constructor */
  public constructor(path: string) {
    super(path, (frontMatter: string): PageMeta => new PageMeta(frontMatter));
  }
}
