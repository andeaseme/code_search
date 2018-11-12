import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
// import * as _ from 'lodash';
import * as React from 'react';

import {
    Button,
    SelectField,
    TextField,
} from 'react-md';

import ElasticSearchStore from './elasticSearchStore';
import SearchKitBlock from './SearchKitBlock';

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
    constructor(props) {
        super(props);

        this.state = {
            host: props.elasticSearchStore.host || '',
            isSubmitted: false,
        };
    }

    render() {
        let searchkitprovider: JSX.Element = null;

        if (this.state.isSubmitted) {
            searchkitprovider = (
                <SearchKitBlock
                    host={this.props.elasticSearchStore.host}
                    queryFields={this.props.elasticSearchStore.queryFields}
                />
            );
        }
        return (
            <div>
                <div className="inline">
                    <TextField
                        id="host-textfield"
                        label="Host"
                        value={this.props.elasticSearchStore.host}
                        onChange={(host: string) => this.props.elasticSearchStore.host = host}
                    />
                    <Button
                        onClick={() => { this.setState((prevState) => ({isSubmitted: !prevState.isSubmitted})) } }
                        raised
                    >
                        on/off
                    </Button>

                </div>
                <SelectField
                    id={'queryFields'}
                    label="Query Fields"
                    menuItems={this.props.elasticSearchStore.queryFieldOptions}
                    onChange={(value) => { this.props.elasticSearchStore.queryFields = [value as string]; }}
                />
                {searchkitprovider}
            </div>
        );
    }
}
