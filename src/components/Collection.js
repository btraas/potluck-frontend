import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'

/**
 * Generic collection of items displayed as cards. 
 * Use the Child prop to render elements.
 */
class Collection extends Component {

    render() {
        let {title, data} = this.props;
        let Child = this.props.child;
        let items = [];
        if(data.length !== 0) {
            items = data.map((item,index) => {
                return (
                    <Grid.Column mobile={16} computer={4} tablet={8} key={`${title}+'-'+${index}`}>
                        <Child  data={item}/>
                    </Grid.Column>
                );
            });
        } else {
            items = (
                <Grid.Column mobile={16} computer={4} tablet={8}>
                    <Child  data={null}/>
                </Grid.Column>
            )
        }
        
        return (
            <Grid padded>
                {items}
            </Grid>
        );
  }
}
export default Collection;