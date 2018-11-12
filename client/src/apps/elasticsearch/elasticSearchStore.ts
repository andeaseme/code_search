import * as _ from 'lodash';
import { action, computed, IObservableArray, observable} from 'mobx';


export default class ElasticSearchStore {
    @observable host: string = `http://52.23.227.172/code_search/`;
    @observable _queryFields: IObservableArray<string> = observable.array([]);
    @observable _queryFieldOptions: IObservableArray<string> = observable.array([]);

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
