/// Post meta model
import Ajv, { JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import YAML from 'yaml';
import _ from 'lodash';
import { JsonObject, Jsonify } from 'type-fest';

/* Validator */
const ajv: Ajv = new Ajv({ useDefaults: true });
addFormats(ajv);

const schema: JSONSchemaType<Jsonify<PostMeta>> = {
  additionalProperties: false,
  properties: {
    categories: {
      items: { type: 'string' },
      type: 'array'
    },
    created_at: {
      format: 'iso-date-time',
      type: 'string'
    },
    feed: {
      default: true,
      type: 'boolean'
    },
    fields: {
      default: {},
      required: [],
      type: 'object'
    },
    modified_at: {
      format: 'iso-date-time',
      type: 'string'
    },
    tags: {
      items: { type: 'string' },
      type: 'array'
    },
    title: { type: 'string' }
  },
  required: ['categories', 'created_at', 'modified_at', 'tags', 'title'],
  type: 'object'
};
const validate: ValidateFunction<Jsonify<PostMeta>> = ajv.compile(schema);

/* Export class */
export class PostMeta {
  /* Member */
  public readonly title: string = '';
  public readonly categories: string[] = [];
  public readonly tags: string[] = [];
  public readonly fields: JsonObject = {};
  public readonly feed: boolean = false;
  public readonly created_at: string = '';
  public readonly modified_at: string = '';

  /* Constructor */
  public constructor(rawStr: string) {
    /* Parse YAML */
    const rawData: PostMeta = YAML.parse(rawStr);

    /* Check schema */
    if (!validate(rawData)) {
      throw new Error(JSON.stringify(validate.errors));
    }

    /* Store members */
    _.assign(this, rawData);
  }

  /* Methods */
  public getFormattedCreatedTime(): string {
    return '';
  }

  public getFormattedModifiedTime(): string {
    return '';
  }
}
