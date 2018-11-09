/**
 * TODO: Try Highlighter
    import React from "react";
    import ReactDOM from "react-dom";
    import Highlighter from "react-highlight-words";

    ReactDOM.render(
    <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
    />,
    document.getElementById("root")
    );
 */
import { autobind } from 'core-decorators';
// import * as _ from 'lodash';
import * as React from 'react';

import {
    Button,
    Card,
    // CardActions,
    CardText,
    CardTitle,
} from 'react-md';

import {
    // HierarchicalMenuFilter,
    Hits,
    // HitsStats,
    // MatchPhrasePrefix,
    // MenuFilter,
    NoHits,
    // Pagination,
    QueryString,
    // RefinementListFilter,
    // ResetFilters,
    SearchBox,
    // SearchkitComponent,
    SearchkitManager,
    SearchkitProvider,
    // SelectedFilters,
    // TermQuery,
} from 'searchkit';

const sk = new SearchkitManager('http://localhost:9200/oto_code/');
const queryFields = ['content'];

const HitItem = (props) => {
    console.log(JSON.stringify(props));
    const title = props.result._source.name;
    const subtitle = props.result._source.path;
    const id = props.result._id;
    const score = props.result._score;
    const sourceContent = props.result._source.content;

    return (
        <Card>
            <CardTitle
                expander
                title={title}
                subtitle={subtitle}
            />
            <CardText expandable>
                <div>
                    <h6>{`id: ${id}`}</h6>
                    <h6>{`score: ${score}`}</h6>
                    {sourceContent}
                </div>
            </CardText>
        </Card>
    );
};

@autobind
export default class ElasticSearch extends React.Component<any, any>  {
    hitRef;
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <SearchkitProvider searchkit={sk}>
                    <div className="search_and_hit">
                        <SearchBox
                            queryBuilder={QueryString}
                            queryFields={queryFields}
                        />
                        <div className="hit_box">
                            <Hits
                                ref={(hitRef) => {
                                    this.hitRef = hitRef;
                                    console.log({ hitRef });
                                }}
                                hitsPerPage={10}
                                itemComponent={HitItem}
                            />
                            <NoHits
                                translations={{
                                    'NoHits.DidYouMean': 'Search for {suggestion}',
                                    'NoHits.NoResultsFound': 'No hits found for {query}',
                                    'NoHits.SearchWithoutFilters': 'Search for {query} without filters',
                                }}
                            />
                        </div>
                    </div>
                </SearchkitProvider>
                <Button
                    onClick={() => { console.log({hitRef: this.hitRef}); }}
                    raised
                >
                    Log Hit Ref
                </Button>
            </div>
        );
    }
}
