import {
  execute as commonExecute,
  composeNextState,
} from '@openfn/language-common';
import { expandReferences } from '@openfn/language-common/util';

import pkg from 'mongodb';
const { MongoClient } = pkg;

/**
 * Execute a sequence of operations.
 * Wraps `@openfn/language-common/execute`, and prepends initial state for http.
 * @example
 * execute(
 *   insertDocuments(params),
 *   findDocuments(params)
 * )(state)
 * @function
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null,
  };

  return state => {
    return commonExecute(
      connect,
      ...operations,
      disconnect
    )({ ...initialState, ...state });
  };
}

/**
 * Connects to a mongoDb instance
 * @example
 *  connect(state)
 * @function
 * @param {State} state - Runtime state.
 * @returns {State}
 */
function connect(state) {
  const { clusterHostname, username, password, protocol = "mongodb+srv", options = { "retryWrites": true, "w": "majority" } } = state.configuration;
  
  const uri = `${protocol}://${encodeURIComponent(
    username
  )}:${encodeURIComponent(
    password
  )}@${clusterHostname}/test${
    Object.keys(options).length ? "?" : ""
  }${
    encodeURIComponent(new URLSearchParams(options).toString())
  }`;

  const client = new MongoClient(uri, { useNewUrlParser: true });

  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject(err);
      } else {
        console.log('Connected successfully to server');
        resolve({ ...state, client });
      }
    });
  });
}

/**
 * Removes connection from the state.
 * @example
 *  disconnect(state)
 * @function
 * @param {State} state
 * @returns {State}
 */
function disconnect(state) {
  state.client.close();
  delete state.client;
  return state;
}

/**
 * Inserts documents into a mongoDb collection
 * @example
 *  insertDocuments({
 *    database: 'str',
 *    collection: 'kids',
 *    documents: [1,2,3]
 *   });
 * @function
 * @public
 * @param {object} params - Configuration for mongo
 * @returns {State}
 */
export function insertDocuments(params) {
  return state => {
    const { client } = state;

    try {
      const [resolvedParams] = expandReferences(state, params);
      const { database, collection, documents, callback } = resolvedParams;

      const db = client.db(database);
      const mCollection = db.collection(collection);

      return new Promise((resolve, reject) => {
        mCollection.insertMany(documents, (err, result) => {
          if (err) {
            reject(err);
            state.client.close();
          } else {
            console.log(
              `Inserted ${documents.length} documents into the collection`
            );
            console.log(JSON.stringify(result, null, 2));
            const nextState = composeNextState(state, result);
            if (callback) resolve(callback(nextState));
            resolve(nextState);
          }
        });
      });
    } catch (error) {
      state.client.close();
      throw error;
    }
  };
}

/**
 * Find documents in a mongoDb collection
 * @example
 *  findDocuments({
 *    database: 'str',
 *    collection: 'cases',
 *    query: {a:3}
 *   });
 * @function
 * @public
 * @param {object} params - Configuration for mongo
 * @returns {State}
 */
export function findDocuments(params) {
  return state => {
    const { client } = state;

    try {
      const [resolvedParams] = expandReferences(state, params);
      const { database, collection, query, callback } = resolvedParams;

      const db = client.db(database);
      const mCollection = db.collection(collection);

      return new Promise((resolve, reject) => {
        mCollection.find(query).toArray((err, docs) => {
          if (err) {
            reject(err);
            state.client.close();
          } else {
            console.log(`Found ${docs.length} documents in the collection`);
            console.log(JSON.stringify(docs, null, 2));
            const nextState = composeNextState(state, docs);
            if (callback) resolve(callback(nextState));
            resolve(nextState);
          }
        });
      });
    } catch (error) {
      state.client.close();
      throw error;
    }
  };
}

/**
 * Updates document (optionally upserting) into a mongoDb collection
 * @example
 *  updateDocuments({
 *    database: 'str',
 *    collection: 'animals',
 *    filter: { type: 'fuzzy' },
 *    changes: { kind: 'soft' },
 *    options: { upsert: true }
 *   });
 * @function
 * @public
 * @param {object} params - Configuration for mongo
 * @returns {State}
 */
export function updateDocument(params) {
  return state => {
    const { client } = state;
    try {
      const [resolvedParams] = expandReferences(state, params);
      const { database, collection, filter, changes, options, callback } =
        resolvedParams;

      const db = client.db(database);
      const mCollection = db.collection(collection);

      return new Promise((resolve, reject) => {
        mCollection.updateMany(
          filter,
          { $set: changes },
          options,
          (err, result) => {
            if (err) {
              reject(err);
              state.client.close();
            } else {
              console.log(
                `Updated a document matching ${JSON.stringify(
                  filter
                )} in the collection.`
              );
              console.log(JSON.stringify(result, null, 2));
              const nextState = composeNextState(state, result);
              if (callback) resolve(callback(nextState));
              resolve(nextState);
            }
          }
        );
      });
    } catch (error) {
      state.client.close();
      throw error;
    }
  };
}

export {
  field,
  fields,
  sourceValue,
  fn,
  fnIf,
  alterState,
  each,
  merge,
  dataPath,
  dataValue,
  lastReferenceValue,
} from '@openfn/language-common';
