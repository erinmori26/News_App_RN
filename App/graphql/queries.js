import gql from "graphql-tag";

// string interpolation of query
// use @rest for rest link, get path from api
// get articles and define type, choose what data you want, source is another type
// only get data requested, not all data
// accept different categories
export const TopHeadlines = gql`
  query TopHeadlines($category: String, $country: String) {
    headlines(category: $category, country: $country)
      @rest(
        type: "HeadlinesPayload"
        path: "top-headlines?country={args.country}&category={args.category}"
      ) {
      totalResults
      articles @type(name: "ArticlePayload") {
        title
        publishedAt
        url
        source @type(name: "SourcePayload") {
          name
        }
      }
    }
  }
`;
