import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: "https://newsapi.org/v2/",
  headers: {
    Authorization: "6f85bbb7b468406f9a12d4647d2e6292"
  }
});

export const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});
