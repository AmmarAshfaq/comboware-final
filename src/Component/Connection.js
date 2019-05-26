import React, { Component } from 'react';
import Navbar from "../Container/Navbar";
import { Button, Table, Icon, Header, Modal, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchDatabaseData, storeDatabaseData, getBlockchainDBData, connectWithDBActions } from '../store/action'
import web3 from "../web3";
import Asset from "../Asset";
import ipfs from '../ipfs';
class ConnectionDB extends Component {

    constructor() {
        super();
        this.state = {
            buffer: null,
            ipfsHash: "",

            // for SQL //
            serverName: '',
            loginName: '',
            password: '',
            databaseName: '',
            modelOpen: false,
            dbSelect: ''

            // for SQL //

        }
    }

    ///////////////////////////////// component functions ///////////////////////
    handleOpen = (select) => this.setState({
        modelOpen: true,
        dbSelect: select
    })
    handleClose = () => this.setState({
        modelOpen: false
    })
    handleChange = (event, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

  

    ///////////////////////////////// component functions ///////////////////////

    ///////////////////////  server connection //////////////////////////////
    fetchData = () => {
        console.log('jhjhjshjh')
        this.props.getDataBaseData();
    }
    storeData = () => {
        this.props.storeDbData();
    }
    getBlockchainData = () => {
        this.props.getBData()
    }

    onHandleFormSubmit = () => {
        const { serverName, loginName, password, databaseName, dbSelect } = this.state;
        if (dbSelect === 'SQL') {
            this.props.connectWithDBComponent({
                serverName: serverName,
                user: loginName,
                password: password,
                database: databaseName
            })
        } else {
            console.log('connect with differentDB')
        }
        this.setState({
            serverName: '',
            user: '',
            password: '',
            database: '',
            modelOpen: false
        })
    }
    ///////////////////////  server connection //////////////////////////////

    //// new through ipfs //////////////

    ////////////////////////  submit data into blockchain when ipfs hash is commming /////
    // onSubmit = (event) => {
    //     event.preventDefault();
    //     console.log('submit')
    //     ipfs.files.add(this.state.buffer, async (err, result) => {
    //         if (err) {
    //             console.error(err, 'show err')
    //             return
    //         }
    //         console.log(result[0].hash)
    //         let accountAdd = JSON.parse(localStorage.getItem('userInfo'))
    //         console.log(accountAdd.accountAddress)
    //         let hashFetch = await Asset.methods.set(result[0].hash).send({
    //             from: accountAdd.accountAddress
    //         })
    //         console.log(hashFetch, 'b h')
    //         let hashGet = await Asset.methods.get().call()
    //         console.log('ipfsHash', hashGet)
    //         this.setState({
    //             ipfsHash: hashGet
    //         })
    //         console.log(this.state.ipfsHash)
    //         // this.setState({
    //         //     ipfsHash: result[0].hash
    //         // })
    //         // console.log('ipfs hash', this.state.ipfsHash)
    //     })
    // }

    ////////////////////////  submit data into blockchain when ipfs hash is commming /////

    // file pick kari json ki format main change hwi 
    //// capture any file in your local machine //////////////////
    // captureFile = (event) => {
    //     event.preventDefault();
    //     console.log('captureFile')
    //     const file = event.target.files[0];
    //     const reader = new window.FileReader();
    //     reader.readAsArrayBuffer(file)
    //     reader.onloadend = () => {
    //         this.setState({
    //             buffer: Buffer(reader.result)

    //         })
    //         console.log(this.state.buffer)

    //     }
    // }
    //// capture any file in your local machine //////////////////

    //// new through ipfs //////////////

    render() {
        console.log(this.state.dbSelect)
        const { serverName, loginName, password, databaseName } = this.state;
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '25%', backgroundColor: 'blue' }}>
                    <Navbar history={this.props.history} />
                </div>
                <div
                    style={{
                        width: "75%", marginTop: 70, paddingBottom: 80,
                        // backgroundColor: '#000',
                    }}
                >

                    {/* ipfs file upload ui //////////////////////////////////////////////////// */}
                    {/* <div style={{ width: "80%", backgroundColor: '#fff', border: '3px solid #000', marginLeft: '10%', borderRadius: 10 }}>
                        <h1>IPFS File Upload</h1>

                        <p>
                            This image is store in ipfs and ethereum blockchaun
        </p>
                        <img src={
                            `https://ipfs.io/ipfs/${this.state.ipfsHash}`
                        } alt="" />


                        <h2>Upload image</h2>
                        <form
                            onSubmit={
                                this.onSubmit
                            }
                        >
                            <input type='file' onChange={
                                this.captureFile

                            } />
                            <input type="submit" />
                        </form>


                    </div> */}
                    {/* ipfs file upload ui //////////////////////////////////////////////////// */}
                    {/* server connection ui //////////////////////////////////////////////////// */}
                    <div style={{ display: 'flex', flexDirection: 'row', width: "80%", marginLeft: '14%', paddingBottom: 20 }} >
                        <div style={{ flex: 1 }}>
                            <Button positive onClick={() => this.handleOpen('SQL')}>
                                SQL
    </Button>
                            {this.props.connectWithDB !== "" ?
                                <h1>{this.props.connectWithDB}</h1> :
                                null}
                            < Modal
                                dimmer={'inverted'}
                                open={this.state.modelOpen}
                                onClose={this.handleClose}
                                size="tiny"
                            >  <Header content='Insert Detail For Connection' />
                                {
                                    this.state.dbSelect === 'SQL' ?
                                        <Modal.Content>
                                            <Form >
                                                <Form.Group width='equal'>
                                                    <Form.Input fluid label='Server Name' placeholder='Server Name' name="serverName" value={serverName} width={8} onChange={this.handleChange} />
                                                    <Form.Input fluid label='User Name' placeholder='User Name' name="loginName" value={loginName} width={8} onChange={this.handleChange} />

                                                </Form.Group>
                                                <Form.Group width='equal'>
                                                    <Form.Input fluid label='Password' type="password" placeholder='Password' name="password" value={password} width={8} onChange={this.handleChange} />
                                                    <Form.Input fluid label='Database Name' placeholder='Database Name' name="databaseName" value={databaseName} width={8} onChange={this.handleChange} />

                                                </Form.Group>


                                            </Form>
                                        </Modal.Content>
                                        :
                                        <Modal.Content>
                                            <Form >
                                                <Form.Group width='equal'>
                                                    <Form.Input fluid label='Server Name' placeholder='Server Name' name="serverName" value={serverName} width={8} onChange={this.handleChange} />
                                                    <Form.Input fluid label='User Name' placeholder='User Name' name="loginName" value={loginName} width={8} onChange={this.handleChange} />

                                                </Form.Group>



                                            </Form>
                                        </Modal.Content>
                                }
                                <Modal.Actions>
                                    <Button color='red' onClick={this.handleClose}>
                                        <Icon name='close' /> Close
                      </Button>
                                    <Button color='green'
                                        onClick={this.onHandleFormSubmit}
                                    >
                                        <Icon name='send' /> Submit
                      </Button>
                                </Modal.Actions>
                            </Modal>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Button positive onClick={() => this.handleOpen('MySQL')}>
                                MySQL
    </Button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Button positive onClick={() => this.handleOpen('MongoDB')} >
                                MongoDB
    </Button>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Button positive onClick={() => this.handleOpen('PostgreSQL')} >
                                PostgreSQL
    </Button>
                        </div>
                    </div>
                    <div style={{ width: "80%", backgroundColor: '#fff', border: '3px solid #000', marginLeft: '10%', borderRadius: 10 }}>
                        <Button positive style={{ marginLeft: '45%', marginTop: '3%', marginBottom: '3%' }} onClick={this.fetchData}>Get MS SQL Data</Button>
                        {
                            this.props.dataBaseData !== null ?

                                this.props.dataBaseData.sqlData.recordset.map((item, index) =>{

                                 return   <Table celled inverted key={index}>
                                        <Table.Body>
                                            <Table.Row>

                                                <Table.Cell>{item.PersonID}</Table.Cell>

                                                <Table.Cell>{item.FirstName}</Table.Cell>
                                                <Table.Cell>{item.LastName}</Table.Cell>
                                                <Table.Cell>{item.City}</Table.Cell>
                                                <Table.Cell>{item.Address}</Table.Cell>
                                            </Table.Row>

                                        </Table.Body>
                                    </Table>
                                }

                                )
                                : null
                        }
                    </div>

                    <div style={{ width: "80%", backgroundColor: '#fff', border: '3px solid #000', marginLeft: '10%', borderRadius: 10, marginTop: '3%', marginBottom: '3%' }}>
                        <Button positive style={{ marginLeft: '43%', marginTop: '3%', marginBottom: '3%' }} onClick={this.storeData}>Push Data To Blockchain</Button>


                        {

                            this.props.dataSubmitBlockchain !== '' ? <div><h1 style={{ textAlign: 'center' }} >{this.props.dataSubmitBlockchain}</h1>
                                <h1>Transaction Record is:</h1>
                                <p><strong>blockHash:</strong> {this.props.transactionRecord.blockHash}</p>
                                <p><strong>blockNumber:</strong> {this.props.transactionRecord.blockNumber}</p>
                                <p><strong>contractAddress:</strong> {this.props.transactionRecord.contractAddress}</p>
                                <p><strong>cumulativeGasUsed:</strong> {this.props.transactionRecord.cumulativeGasUsed}</p>
                                <p><strong>gasUsed:</strong> {this.props.transactionRecord.gasUsed}</p>
                                <p><strong>root:</strong> {this.props.transactionRecord.root}</p>
                                <p><strong>to:</strong> {this.props.transactionRecord.to}</p>
                                <p><strong>transactionHash:</strong> {this.props.transactionRecord.transactionHash}</p>
                                <p><strong>transactionIndex:</strong> {this.props.transactionRecord.transactionIndex}</p>
                                <p><strong>from:</strong> {this.props.transactionRecord.from}</p>





                            </div> : null

                        }
                    </div>
                    <div style={{ width: "80%", backgroundColor: '#fff', border: '3px solid #000', marginLeft: '10%', borderRadius: 10 }}>
                        <Button positive style={{ marginLeft: '45%', marginTop: '3%', marginBottom: '3%' }} onClick={this.getBlockchainData}>Get Blockchain Data</Button>
                        {
                            this.props.bockchainData !== null ?
                                this.props.bockchainData.map((item, index) =>
                                    <Table celled inverted key={index}>
                                        <Table.Body>
                                            <Table.Row>

                                                <Table.Cell>{item.PersonID}</Table.Cell>

                                                <Table.Cell>{item.FirstName}</Table.Cell>
                                                <Table.Cell>{item.LastName}</Table.Cell>
                                                <Table.Cell>{item.Address}</Table.Cell>
                                                <Table.Cell>{item.City}</Table.Cell>

                                            </Table.Row>

                                        </Table.Body>
                                    </Table>
                                )
                                : null
                        }
                    </div>

                    {/* server connection ui //////////////////////////////////////////////////// */}

                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        dataBaseData: state.reducer.databaseData,
        bockchainData: state.reducer.blockchainData,
        dataSubmitBlockchain: state.reducer.dataSubmitBlockchain,
        transactionRecord: state.reducer.transactionRecord,
        connectWithDB: state.reducer.connectWithDB
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getDataBaseData: () => dispatch(fetchDatabaseData()),
        storeDbData: () => dispatch(storeDatabaseData()),
        getBData: () => dispatch(getBlockchainDBData()),
        connectWithDBComponent: (obj) => dispatch(connectWithDBActions(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectionDB);

