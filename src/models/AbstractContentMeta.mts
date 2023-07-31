/// Abstract content meta model
import moment from 'moment';
import { JsonObject } from 'type-fest';

/* Export interface */
export interface IAbstractContentMeta {
  title: string;
  fields: JsonObject;
  feed: boolean;
  created_at: string;
  modified_at: string;
}

/* Export class */
export abstract class AbstractContentMeta {
  /* Members */
  protected title: string = '';
  protected fields: JsonObject = {};
  protected feed: boolean = true;
  protected created_at: string = '1970-01-01T00:00:00Z';
  protected modified_at: string = '1970-01-01T00:00:00Z';

  /* Abstract methods */
  public abstract toYAML(): string;

  /* Methods */
  public getTitle(
    delimiter?: string,
    prefix?: string,
    postfix?: string
  ): string {
    return [prefix, this.title, postfix]
      .filter((v: string | undefined): boolean => v !== undefined)
      .join(delimiter);
  }
  public getFields(): JsonObject {
    return this.fields;
  }
  public getFeed(): boolean {
    return this.feed;
  }
  public getCreatedTimestamp(): number {
    return moment(this.created_at).unix();
  }
  public getCreatedISOString(): string {
    return moment(this.created_at).format();
  }
  public getFormattedCreatedTime(format?: string): string {
    return moment(this.created_at).format(format);
  }
  public getModifiedISOString(): string {
    return moment(this.modified_at).format();
  }
  public getModifiedTimestamp(): number {
    return moment(this.modified_at).unix();
  }
  public getFormattedModifiedTime(format?: string): string {
    return moment(this.modified_at).format(format);
  }
}
