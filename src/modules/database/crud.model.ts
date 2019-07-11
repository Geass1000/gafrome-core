import * as Bluebird from 'bluebird';
import * as _ from 'lodash';
import { Model, Document, DocumentQuery } from 'mongoose';

import { DatabaseException } from './exceptions/database.exception';

import { Enums } from './shared';
import { LoggerService } from '../logger';

export class CRUDModel<IModel, IModelDoc extends Document> {
  public className: string = 'CRUDModel';
  public model: Model<IModelDoc>;

  /**
   * @constructor
   */
  constructor(
    protected logger: LoggerService,
  ) {}

  /**
   * Returns the list of documents by specific aggregation condition.
   *
   * @param  {any[]} aggregations - aggregation condition
   * @return {Bluebird<Interfaces.Result.Many<IResult>>}
   */
  public aggregateMany<IResult> (
    aggregations: any[],
  ): Bluebird<IResult[]> {
    const query = this.model.aggregate(aggregations);
    return Bluebird.resolve(query.exec());
  }

  /**
   * Returns a document by specific aggregation condition.
   *
   * @param  {any[]} aggregations - aggregation condition
   * @return {Bluebird<Interfaces.Result.One<IResult>>}
   */
  public aggregateOne<IResult> (
    aggregations: any[],
  ): Bluebird<IResult> {
    const query = this.model.aggregate(aggregations);
    return Bluebird.resolve(query.exec())
      .then((result: any[]) => result[0] || null);
  }

  /**
   * Returns the list of documents (all).
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public getAll(
    asPromise: boolean = true,
  ): Bluebird<IModelDoc[]> | DocumentQuery<IModelDoc[], IModelDoc, any> {
    const query = this.model.find();
    return this.returnValue(query, asPromise);
  }

  /**
   * Returns the document by id.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public getById (
    id: string,
    asPromise: boolean = true,
  ): Bluebird<IModelDoc> | DocumentQuery<IModelDoc, IModelDoc, any> {
    this.checkDocumentId(id, `getById`, Enums.ExceptionType.Find);

    const query = this.model.findOne({ _id: id });
    return this.returnValue(query, asPromise);
  }

  /**
   * Returns the document by specific conditions.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public get(
    conditions: any,
    asPromise: boolean = true,
  ): Bluebird<IModelDoc> | DocumentQuery<IModelDoc, IModelDoc, any> {
    const query = this.model.findOne(conditions);
    return this.returnValue(query, asPromise);
  }

  /**
   * Adds new document to the collection. As result returns the new document.
   *
   * @return {Bluebird<IModelDoc>}
   */
  public addOne(
    obj: IModel,
    asPromise: boolean = true,
  ): Bluebird<IModelDoc> {
    if (!obj) {
      const error = new DatabaseException(
        `Item Data is required`,
        Enums.ExceptionType.Create,
      );
      this.logger.error(`getById`, error);
      throw error;
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * Adds new documents to the collection. As result returns the new documents.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public addMany(
    obj: IModel[]
  ): Bluebird<IModelDoc[]> {
    if (!_.isArray(obj)) {
      const error = new DatabaseException(
        `Item Data must be of type array`,
        Enums.ExceptionType.Create,
      );
      this.logger.error(`getById`, error);
      throw error;
    }

    return Bluebird.resolve(this.model.create(obj));
  }

  /**
   * Updates the document by id. As result returns the updated document.
   *
   * @return {Bluebird<IModelDoc[]>}
   */
  public updateById(
    id: string,
    obj: IModel,
    asPromise: boolean = true,
  ): Bluebird<IModelDoc> | DocumentQuery<IModelDoc, IModelDoc, any> {
    this.checkDocumentId(id, `updateById`, Enums.ExceptionType.Update);

    if (!obj) {
      const error = new DatabaseException(
        `Item Data is required`,
        Enums.ExceptionType.Update,
      );
      this.logger.error(`getById`, error);
      throw error;
    }

    const query = this.model.findOneAndUpdate({
        _id: id
      }, obj, { new: true });
    return this.returnValue(query, asPromise);
  }

  /**
   * Finds and removes the document by id. As result returns the
   * removed document.
   *
   * @return {Bluebird<IModelDoc>}
   */
  public removeById(
    id: string,
    asPromise: boolean = true,
  ): Bluebird<IModelDoc> | DocumentQuery<IModelDoc, IModelDoc, any> {
    this.checkDocumentId(id, `removeById`, Enums.ExceptionType.Delete);

    const query = this.model.findOneAndRemove({ _id: id });
    return this.returnValue(query, asPromise);
  }

  /**
   * Drops the collection.
   *
   * @return {Bluebird<any>}
   */
  public dropCollection(): Bluebird<any> {
    return Bluebird.resolve(this.model.collection.drop());
  }

  private returnValue<T extends DocumentQuery<any, any, any>> (
    query: T,
    asPromise: boolean,
  ): Bluebird<any> | T {
    return asPromise ? Bluebird.resolve(query.exec()) : query;
  }

  private checkDocumentId (
    id: string,
    methodName: string,
    errorType: Enums.ExceptionType,
  ): void {
    if (_.isString(id) || !_.isNil(id)) {
      return;
    }
    const error = new DatabaseException(
      `Item ID is required and must be of type 'string'`,
      errorType,
    );
    this.logger.error(methodName, error);
    throw error;
  }
}
