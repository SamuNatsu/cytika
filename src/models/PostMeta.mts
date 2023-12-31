/// Post meta model
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

const schema: JSONSchemaType<IPostMeta> = {
  additionalProperties: false,
  properties: {
    title: { type: 'string' },
    categories: {
      items: { type: 'string' },
      type: 'array'
    },
    tags: {
      items: { type: 'string' },
      type: 'array'
    },
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
  required: ['title', 'categories', 'tags', 'created_at', 'modified_at'],
  type: 'object'
};
const validate: ValidateFunction<IPostMeta> = ajv.compile(schema);

/* Export interface */
export interface IPostMeta extends IAbstractContentMeta {
  categories: string[];
  tags: string[];
}

/* Export class */
export class PostMeta extends AbstractContentMeta {
  /* Members */
  private categories: string[] = [];
  private tags: string[] = [];

  /* Constructor */
  public constructor(rawStr: string) {
    super();

    /* Parse YAML */
    const rawData: PostMeta = YAML.parse(rawStr);

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
      categories: this.categories,
      tags: this.tags,
      fields: this.fields,
      feed: this.feed,
      created_at: this.getCreatedISOString(),
      modified_at: this.getModifiedISOString()
    });
  }
  public getCategories(): string[] {
    return this.categories;
  }
  public getTags(): string[] {
    return this.tags;
  }
}
