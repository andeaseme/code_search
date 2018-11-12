// import * as _ from 'lodash';
import * as React from 'react';

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

import HitItem from './HitItem';

interface IProps {
    host: string;
    queryFields: string[];
}

export default class SearchKitBlock extends React.Component<IProps, any>  {
    searchKitManager;

    constructor(props: IProps) {
        super(props);

        console.log('SearchKitBlock...constructor props:', props);
        this.searchKitManager = new SearchkitManager(props.host);
    }

    render() {
        return (
            <SearchkitProvider
                searchkit={this.searchKitManager}
            >
                <div className="search_and_hit">
                    <SearchBox
                        queryBuilder={QueryString}
                        queryFields={this.props.queryFields}
                    />
                    <div className="hit_box">
                        <Hits
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
        );
    }
}
