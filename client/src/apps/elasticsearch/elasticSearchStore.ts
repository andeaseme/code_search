import * as _ from 'lodash';
import { action, computed, IObservableArray, observable} from 'mobx';
import {
    // HierarchicalMenuFilter,
    // Hits,
    // HitsStats,
    // MatchPhrasePrefix,
    // MenuFilter,
    // NoHits,
    // Pagination,
    // QueryString,
    // RefinementListFilter,
    // ResetFilters,
    // SearchBox,
    // SearchkitComponent,
    SearchkitManager,
    // SearchkitProvider,
    // SelectedFilters,
    // TermQuery,
} from 'searchkit';

export default class ElasticSearchStore {
    @observable host: string = 'http://localhost:9200/';
    // tslint:disable-next-line:variable-name
    @observable _queryFields: IObservableArray<string> = observable.array(['content']);
    // tslint:disable-next-line:variable-name
    @observable _queryFieldOptions: IObservableArray<string> = observable.array([]);

    @computed get searchkit() {
        console.log(`new SearchkitManager(${this.host})`);
        return new SearchkitManager(this.host);
    }

    @computed get queryFieldOptions(): string[] {
        return this._queryFieldOptions.slice();
    }
    set queryFieldOptions(options: string[]) {
        console.log({options});
        this._queryFieldOptions.replace(_.uniq([...this.queryFieldOptions, ...options]));
    }

    @computed get queryFields(): string[] {
        return this._queryFields.slice();
    }
    set queryFields(fields: string[]) {
        this._queryFields.replace(fields);
    }

    @action.bound hello() {
        return 'hello';
    }
}
