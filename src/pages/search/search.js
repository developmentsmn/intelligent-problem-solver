import React, { Component } from "react";
import Page from "../../components/Page/Page";
import SearchPage from "../../components/Search/SearchPage"

class Search extends Component {
  render() {
    return (
      <Page>
        <SearchPage />
      </Page>
    );
  }
}

export default Search;
