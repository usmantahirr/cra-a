import {CosmosProvider} from '../../providers';

export class UserModel {
  static getCollection() {
    const instance = CosmosProvider.getInstance();
    return instance.getCollection('users');
  }
  static create(data: unknown) {
    const collection = UserModel.getCollection();
    return collection.items.create(data);
  }
}
