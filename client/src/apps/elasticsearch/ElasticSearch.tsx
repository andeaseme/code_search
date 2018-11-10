import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
// import * as _ from 'lodash';
import * as React from 'react';

import {
    Button,
    TextField,
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
    // SearchkitManager,
    SearchkitProvider,
    // SelectedFilters,
    // TermQuery,
} from 'searchkit';

import ElasticSearchStore from './elasticSearchStore';
import HitItem from './HitItem';

interface IProps {
    elasticSearchStore?: ElasticSearchStore;
}

/**
 * TODO: changing host in text field does not change the host used
 */
@autobind
@inject('elasticSearchStore')
@observer
export default class ElasticSearch extends React.Component<IProps, any>  {
    hitRef;
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <TextField
                    id="host-textfield"
                    label="Host"
                    value={this.props.elasticSearchStore.host}
                    onChange={(host: string) => this.props.elasticSearchStore.host = host}
                />
                <SearchkitProvider searchkit={this.props.elasticSearchStore.searchkit}>
                    <div className="search_and_hit">
                        <SearchBox
                            queryBuilder={QueryString}
                            queryFields={this.props.elasticSearchStore.queryFields}
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
