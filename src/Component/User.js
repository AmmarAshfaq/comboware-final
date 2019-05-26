import React, { Component } from 'react';
import Navbar from "../Container/Navbar";
import { Input, Button, Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { publishPage } from '../store/action'
class User extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            paragraph: ''
        }
    }
    publish = () => {
        let { name, paragraph } = this.state
        console.log(this.state)
        this.props.createPage({
            heading: name,
            paragraph
        })
    }
    render() {
        console.log(this.state.name)
        return <div style={{ display: 'flex' }}>
            <div style={{ width: '25%', backgroundColor: 'blue' }}>
                <Navbar history={this.props.history} />
            </div>
            <div
                style={{ width: "75%", marginTop: 150, paddingBottom: 140 }}
            >
                <div style={{ margin: '0px auto', width: '70%', }}>

                    <Input fluid placeholder='Heading....' onChange={(event) => this.setState({ name: event.target.value })} style={{ marginBottom: 20 }} />
                    <Form>
                        <TextArea placeholder='Paragraph....' 
                        rows={17}
                         onChange={(event) => this.setState({ paragraph: event.target.value })} style={{ marginBottom: 20 }}
                        />
                    </Form>
                    {/* <Input fluid placeholder='Paragraph....'
                        onChange={(event) => this.setState({ paragraph: event.target.value })} style={{ marginBottom: 20 }} /> */}
                    <Button onClick={this.publish}>Publish</Button>
                </div>

            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return {
        createPage: (data) => {
            dispatch(publishPage(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);