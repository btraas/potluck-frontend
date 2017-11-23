import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

/**
 * Generic collection of items displayed as cards. 
 * Use the Child prop to render elements.
 */
class Collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.setState({
            data:this.props.data
        })
    }

    componentWillReceiveProps(nextProps, prevState) {
        this.setState({
            data: nextProps.data
        })
    }

    render() {
        let Child = this.props.child;
        let title = this.props.title;
        const {data} = this.state; 
        var items = null;
        if(Array.isArray(data) && data.length === 0) {
            items = null;
            let item = null, title = null, index = null;
            return (
                    <Grid padded>
                        <Grid.Column mobile={16} computer={4} tablet={8} key={`${title}+'-'+${index}`}>
                            <Child  data={item}/>
                        </Grid.Column>
                    </Grid>
                );
        } else {
            items = this.state.data.map((item,index) => {
                return (
                    <Grid.Column mobile={16} computer={4} tablet={8} key={`${title}+'-'+${index}`}>
                        <Child  data={item}/>
                    </Grid.Column>
                );
            });
        }
        return (
            <Grid padded>
                {items}
            </Grid>
        );
  }
}
export default Collection;