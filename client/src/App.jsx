import { useEffect, useState } from 'react'; // Importing React hooks for managing state and side effects
import { createClient } from 'urql'; // Importing urql client for sending GraphQL queries
import './App.css'; // Importing CSS file for styling

function App() {
  const [tokens, setTokens] = useState([]); // State variable to store token data retrieved from GraphQL query

  const QueryURL = "https://gateway.thegraph.com/api/8862f3294ba3218fe895b24fd2d3a1cb/subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7"; // URL for the GraphQL endpoint

  const client = createClient({
    url: QueryURL // Creating a urql client with the specified URL
  });

  const query = `{
    tokens(first: 5) {
      id
      name
      symbol
      decimals
    }
  }`; // GraphQL query to fetch token data, requesting the first 5 tokens and their id, name, symbol, and decimals

  useEffect(() => {
    const getTokens = async () => {
      try {
        const { data } = await client.query(query).toPromise(); // Sending a GraphQL query and waiting for the response
        setTokens(data.tokens); // Updating the state with the token data received from the GraphQL query
      } catch (error) {
        console.error("Error fetching tokens:", error); // Handling any errors that occur during the GraphQL query
      }
    };
    getTokens(); // Calling the getTokens function when the component mounts
  }, []); // useEffect hook with an empty dependency array, ensuring it runs only once when the component mounts

  return (
    <>
      <div>
        <h1>Tokens Information</h1> 
        {tokens !== null && tokens.length > 0 && tokens.map((token) => { // Checking if tokens array is not null and contains elements
          return (
            <div key={token.id}> // Rendering each token's id, name, symbol & decimals
              <div>{token.id}</div>
              <div>{token.name}</div>
              <div>{token.symbol}</div>
              <div>{token.decimals}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
