// // TODO: Try Highlighter
//     import React from "react";
//     import ReactDOM from "react-dom";
//     import Highlighter from "react-highlight-words";
//     ReactDOM.render(
//     <Highlighter
//         highlightClassName="YourHighlightClass"
//         searchWords={["and", "or", "the"]}
//         autoEscape={true}
//         textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
//     />,
//     document.getElementById("root")
//     );

import { autobind } from 'core-decorators';
import * as _ from 'lodash';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
    Card,
    CardText,
    CardTitle,
} from 'react-md';

import ElasticSearchStore from './elasticSearchStore';

@inject('elasticSearchStore')
@observer
@autobind
export default class HitItem extends React.Component<any, any>  {
    mk_sourceElement(key, val) {
        return (
            <div className="inline" key={key}>
                <h4>{key}</h4>
                <div>{val}</div>
            </div>
        );
    }

    render() {
        // console.log(JSON.stringify(this.props));
        console.log(this.props);
        const title = this.props.result._source.name;
        const subtitle = this.props.result._source.path;
        const id = this.props.result._id;
        const index = this.props.result._index;
        const score = this.props.result._score;
        const type = this.props.result._type;

        const ess: ElasticSearchStore = this.props.elasticSearchStore;
        ess.queryFieldOptions = Object.keys(this.props.result._source);
        const sourceElements: JSX.Element[] = [];

        _.forEach(this.props.result._source, (val, key) => {
            sourceElements.push(this.mk_sourceElement(key, val));
        });
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
                        <h6>{`index: ${index}`}</h6>
                        <h6>{`score: ${score}`}</h6>
                        <h6>{`type: ${type}`}</h6>
                        {sourceElements}
                    </div>
                </CardText>
            </Card>
        );
    }
}
