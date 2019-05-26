import ActionTypes from "../constant";

const INITIAL_STATE = {
  trackerArr: [],
  currentUser: {},
  databaseData: null,
  blockchainData: null,
  publishList: [],
  publicPageDetail: null,
  dataSubmitBlockchain: '',
  transactionRecord: null,
  connectWithDB: '',
  sqlFetchList: [],




  ////////// for account ethereum address signup and login ////////
  accountKey: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TRACKER_LOGS:
      return { ...state, trackerArr: action.payload };




    case ActionTypes.SIGNUP_SUCCED:
      return { ...state, currentUser: action.payload };
    // case ActionTypes.SIGNUP_SUCCED:
    //   return { ...state, accountKey: action.payload }







    case ActionTypes.SIGNIN_SUCCED:
      return { ...state, currentUser: action.payload };
    case ActionTypes.DATABASE_CONNECTION_SUCCESS:
      return { ...state, databaseData: action.payload }
    case ActionTypes.FETCH_DATA_SUCCESS:
      console.log(action.payload, 'fectjhjh')
      return { ...state, blockchainData: action.payload }
    case ActionTypes.PUBLISH_LIST_SUCCESS:
      console.log(action.payloadFetchData, 'meraj')
      let storeArr = state.publishList;
      storeArr.push(action.payload);

      return {
        ...state, publishList: storeArr,
      }
      case ActionTypes.SQLDATAPUBLISH:
      let sqlArr = state.sqlFetchList;
      sqlArr.push(action.payloadFetchData.sqlData)
      console.log(sqlArr,'ammar')
      return {
        ...state, 
        sqlFetchList: sqlArr
      }
    case ActionTypes.DATA_SUBMIT_SUCCESSFULL:
      return {
        ...state,
        dataSubmitBlockchain: action.payload,
        transactionRecord: action.transactionProve
      }
    case ActionTypes.PUBLIC_PAGE_DETAIL_SUCCEESS:
      return { ...state, publicPageDetail: action.payload }
    case ActionTypes.DELETE_ALL_PAGE_LIST:
      return { ...state, publishList: [] }
    case ActionTypes.CONNECT_WITH_DATABASE:
      return { ...state, connectWithDB: action.payload }
    default:
      return state;
  }
};
