// elasticsearchConfig.js

const { Client } = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200'});
const { v4: uuidv4 } = require('uuid');


const createUserIndex = async () => {
    try {
        const users = await client.indices.create({ index: 'users' });
        const emails = await client.indices.create({ index: 'emails' });
        await syncEmails()
        console.log('User Index created successfully:');
        console.log('Emails Index created successfully:');
    } catch (error) {
        if (error.meta.statusCode === 400) {
            console.log('Index already exists:');
        } else {
            console.error('Error creating index:', error);
        }
    }
};

const syncEmails = async () =>{
    
}

const indexDocumentUser = async ({user}) => {
    try {
        const id = uuidv4();
        console.log(id)
        console.log(user?.name)
        console.log(user?.password)
        const response = await client.index({
            index: "users",
            id: id,
            body: {
              name: user?.name,
              password: user?.password,
            },
            refresh: true // Ensure the document is searchable immediately
          })
        console.log('Document indexed successfully:', response);
    } catch (error) {
        console.error('Error indexing document:', error);
    }
};
const searchUserIndex = async (username) => {
    try {
        const response = await client.search({
            index: 'users', // Ensure the index name is correct
            body: {
                query: {
                    match: { name: username } // Match query for the 'name' field
                }
            }
        });
        return response.body.hits.hits; // Correctly access the search hits
    } catch (error) {
        console.error('Error searching index:', error);
        throw error; // Propagate the error to handle it in the calling function
    }
};

const initializeElasticsearch = async () => {
    try {
        await createUserIndex();
        console.log('Elasticsearch setup complete');
    } catch (error) {
        console.error('Error during Elasticsearch initialization:', error);
    }
};

const searchUserIndexByName = async (name) => {
    try {
        const response = await client.search({
            index: 'users',   // Replace with your actual index name
            body: {
                query: {
                    match: { name: name }   // Replace 'name' with the field you're searching by
                }
            }
        }, {
            ignore: [404],
            maxRetries: 3
        });
        return response.hits.hits; // Returns the search results
    } catch (error) {
        console.error('Error searching index:', error);
    }
};

// Export the client and functions
module.exports = {
    initializeElasticsearch,
    searchUserIndex,
    indexDocumentUser,
    searchUserIndexByName
    
};
