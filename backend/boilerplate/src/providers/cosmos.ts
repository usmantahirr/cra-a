import {CosmosClient, Database} from '@azure/cosmos';

import {dbConfig} from '../config';

export class CosmosProvider {
  static instance: typeof CosmosProvider.prototype;
  constructor(private db: Database) {}
  static async init() {
    if (CosmosProvider.instance) {
      return CosmosProvider.instance;
    }
    const endpoint = dbConfig.cosmos_endpoint;
    const key = dbConfig.cosmos_key;

    const client = new CosmosClient({endpoint, key});
    const db = await client.database(dbConfig.database);
    const instance = new CosmosProvider(db);
    CosmosProvider.instance = instance;
  }

  static getInstance() {
    return CosmosProvider.instance;
  }

  getCollection(id: string) {
    return this.db.container(id);
  }
}
