import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Button,
  Picker
} from "react-native";

import { client } from "./graphql/client";
import { TopHeadlines } from "./graphql/queries";
import { ArticleRow } from "./components/ArticleRow";

const styles = StyleSheet.create({
  headerText: {
    color: "#ff8d01",
    fontWeight: "bold",
    fontSize: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    lineHeight: 60
  },
  view: {
    backgroundColor: "#fff"
  },
  list: {
    fontSize: 15,
    margin: 10
  },
  picker: {
    width: 70,
    height: 70
  },
  pickerItem: {
    color: "#000000",
    fontSize: 15,
    height: 70
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginLeft: 10,
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "yellow",
    borderRadius: 15
  },
  label: {
    marginTop: 10
  }
});

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];
const countries = ["au", "fr", "gb", "jp", "kr", "ru", "us"];

class App extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    articles: [],
    loading: true,
    category: "technology",
    country: "us"
  };

  // get headlines on mount
  componentDidMount() {
    this.requestTopHeadlines();
  }

  // request client
  requestTopHeadlines = () => {
    client
      .query({
        query: TopHeadlines,
        variables: {
          category: this.state.category,
          country: this.state.country
        }
      })
      .then(response => {
        console.log("response", response);
        this.setState({
          loading: response.loading,
          articles: response.data.headlines.articles
        });
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  renderFooter = () => {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return null;
  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>Category:</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.category}
        onValueChange={itemValue => {
          this.setState({ category: itemValue }); // update state with hours when changed
        }}
        mode="dropdown"
      >
        {categories.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>

      <Text style={styles.label}>Country:</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.country}
        onValueChange={itemValue => {
          this.setState({ country: itemValue }); // update state with minutes when changed
        }}
        mode="dropdown"
      >
        {countries.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Button
        style={styles.button}
        title="Filter"
        onPress={() => this.requestTopHeadlines()}
      />
    </View>
  );

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.articles}
          ListHeaderComponent={(
            <View style={styles.view}>
              <Text style={styles.headerText}>Top Headlines</Text>
              {this.renderPickers()}
            </View>
          )}
          stickyHeaderIndices={[0]} // make header stay at top
          renderItem={({ item, index }) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <ArticleRow index={index} {...item} /> // spread so each part of object is item and easily accessible
          )}
          keyExtractor={item => `${item.publishedAt}-${item.title}`} // string used as key
          ListFooterComponent={this.renderFooter()}
        />
      </SafeAreaView>
    );
  }
}

export default App;
