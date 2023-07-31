/// Page meta model
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import YAML from 'yaml';
import _ from 'lodash';
import {
  AbstractContentMeta,
  IAbstractContentMeta
} from './AbstractContentMeta.mjs';

/* Validator */
const ajv: Ajv = new Ajv();
addFormats(ajv);

const schema: JSONSchemaType<IPageMeta> = {
  additionalProperties: false,
  properties: {
    slug: { type: 'string' },
    template: { type: 'string' },
    title: { type: 'string' },
    fields: {
      required: [],
      type: 'object'
    },
    feed: { type: 'boolean' },
    created_at: {
      format: 'iso-date-time',
      type: 'string'
    },
    modified_at: {
      format: 'iso-date-time',
      type: 'string'
    }
  },
  required: ['title', 'slug', 'created_at', 'modified_at'],
  type: 'object'
};
const validate: ValidateFunction<IPageMeta> = ajv.compile(schema);

/* Export interface */
export interface IPageMeta extends IAbstractContentMeta {
  slug: string;
  template: string;
}

/* Export class */
export class PageMeta extends AbstractContentMeta {
  /* Members */
  private slug: string = '';
  private template: string | null = null;

  /* Constructor */
  public constructor(rawStr: string) {
    super();

    /* Parse YAML */
    const rawData: PageMeta = YAML.parse(rawStr);

    /* Check schema */
    if (!validate(rawData)) {
      throw validate.errors;
    }

    /* Store members */
    _.assign(this, rawData);
  }

  /* Methods */
  public toYAML(): string {
    return YAML.stringify({
      title: this.title,
      slug: this.slug,
      template: this.template ?? undefined,
      fields: this.fields,
      feed: this.feed,
      created_at: this.getCreatedISOString(),
      modified_at: this.getModifiedISOString()
    });
  }
  public getSlug(): string {
    return this.slug;
  }
  public getTemplate(): string | null {
    return this.template;
  }
}
