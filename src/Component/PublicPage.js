import React, { Component } from 'react';
import NavBar from '../Container/Navbar'
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { pageList, pageDetail } from '../store/action'
class PublicPage extends Component {




    componentDidMount() {
        this.props.pagesListCo()
    }
    pickRow = (id) => {
        // console.log(id)
        this.props.pagesDetail(id)
    }
    render() {
        return (
            <div style={{ display: 'flex' }}>

                <div
                    style={{ width: "75%", marginTop: 20, paddingBottom: 60 }}
                >
                    <div style={{ width: "80%", margin: "0px auto" }}>
                        <Table celled padded>
                            <Table.Header>
                                <Table.Row >
                                    <Table.HeaderCell>Name</Table.HeaderCell>

                                </Table.Row>
                            </Table.Header>
                            {

                                this.props.listcreatePages !== null ?

                                    this.props.listcreatePages.map((value, index) => {
                                        return (

                                            <Table.Body key={index}>
                                                <Table.Row onClick={() => this.pickRow(value.id)}>
                                                    {
                                                        console.log(value.paragraph)
                                                    }
                                                    <Table.Cell singleLine>{value.name}</Table.Cell>
                                                    <Table.Cell singleLine>{value.paragraph}</Table.Cell>

                                                </Table.Row>
                                            </Table.Body>

                                        );
                                    })
                                    : null

                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listcreatePages: state.reducer.publishList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pagesListCo: () => {
            dispatch(pageList())
        },
        pagesDetail: (id) => {
            dispatch(pageDetail(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicPage);