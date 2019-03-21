import { connect } from "tls";
import firebase from "./firebase";

const algoliasearch = require('algoliasearch');
//const firebase = require('firebase');
//const functions = require('firebase-functions');

const searchResult = async (query) => {
    //const database = firebase.database();

    
    // App ID and API Key are stored in functions config variables
    const ALGOLIA_ID = "1QK64K4MC0";
    const ALGOLIA_ADMIN_KEY = "abdec51c096fdf77124d23f2b34e5e13"
    const ALGOLIA_SEARCH_KEY = "a1fdfcad793153dad8cf462aa8c01ff7"

    const ALGOLIA_INDEX_NAME = 'KnowledgeElement';
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


    /*
    const records = [];
    firebase.firestore().collection('KnowledgeElement').get()
        .then(snapshot => {
            console.log(snapshot.size);
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());

          const childKey = doc.id;
          const childData = doc.data();

          childData.objectID = childKey;

          records.push(childData);
        });

        
        index
            .saveObjects(records)
            .then(() => {
                console.log('Contacts imported into Algolia');
            })
            .catch(error => {
                console.error('Error when importing contact into Algolia', error);
                process.exit(1);
            });
        }, function(error) {
            console.error(error);

      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

    /*
    // Get all contacts from Firebase
    database.ref('/KnowledgeElement/').once('value', element => {
    // Build an array of all records to push to Algolia
    console.log(element.key);
    const records = [];
    element.forEach(element => {
      // get the key and data from the snapshot
      const childKey = element.key;
      const childData = element.val();
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });
    
  
    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log('Contacts imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing contact into Algolia', error);
        process.exit(1);
      });
  }, function(error) {
      console.error(error);
  });
  
  

/*
    // Update the search index every time a blog post is written.
    exports.onNoteCreated = functions.firestore.document('KnowledgeElement/{noteId}').onCreate((snap, context) => {
        // Get the note document
        const note = snap.data();
    
        // Add an 'objectID' field which Algolia requires
        note.objectID = context.params.noteId;
    
        // Write to the algolia index
        const index = client.initIndex(ALGOLIA_INDEX_NAME);
        return index.saveObject(note);
    });
*/
    
    //var client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY);
    var index = client.initIndex('KnowledgeElement');
    //const query = "law";
    //let response = undefined;
    //var test = undefined;
    
    // Perform an Algolia search:
    // https://www.algolia.com/doc/api-reference/api-methods/search/
    
    
    return await index.search(
        { 
            query,
        })

    
};

export default searchResult;