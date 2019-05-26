import React,{Component} from 'react';
import {connect} from 'react-redux';
 import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
 class Loading extends Component{

    componentDidMount(){
       if(this.props.currentUserObj){
           this.props.history.push('/login')
       }else{
        this.props.history.push('/createAsset')
           
       }
    }
     render(){
         return(
             <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                 <Segment>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>

    </Segment>
                 </div>
         )
     }
 }
function mapStateToProps(state){
    console.log(state)
    return{
        currentUserObj:state.reducer.currentUser
    }
}
 export default connect(mapStateToProps,null)(Loading);