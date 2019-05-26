import React, { Component } from 'react';
import { connect } from 'react-redux';

class PublicPageDetail extends Component {
    render() {
        return (
            <div >
                {
                    this.props.detail !== null ?
                        <div style={{width:300,margin:'0px auto',paddingTop:100,paddingBottom:100}}>
                            <h1>{this.props.detail.name}</h1>
                            <p>{this.props.detail.paragraph}</p>
                        </div>
                        : null

                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        detail: state.reducer.publicPageDetail
        
    }
}
export default connect(mapStateToProps, null)(PublicPageDetail);