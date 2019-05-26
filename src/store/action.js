import ActionTypes from "./constant";
// import firebase from 'firebase';
import dbConfig from "../config";
import web3 from '../web3'
const ROOT_URL = 'http://localhost:8080'
export function AssetTrackerFunc(obj) {
  return dispatch => {
    console.log(obj);
    let arrList = [];
    obj.forEach(element => {
      arrList.push(element.returnValues);
    });

    console.log(arrList);
    dispatch({
      type: ActionTypes.TRACKER_LOGS,
      payload: arrList
    });


  };
}
///        login //////////////////////////////////////////
export function loginAction(obj) {
  return dispatch => {
    // console.log(obj)
    web3.eth.personal.unlockAccount(obj.accountAddress, obj.password, 600)
      .then((res) => {
        console.info('Login successful:', res)
        dbConfig
          .auth()
          .signInWithEmailAndPassword(obj.email, obj.password)
          .then(() => {
            // console.log(userDetail.name)
            let user = dbConfig.auth().currentUser;
            // console.log(user)
            console.log(user)
            obj.history.push("/createAsset");
            let userObj = {
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              accountAddress: obj.accountAddress

            };
            localStorage.setItem('userInfo', JSON.stringify(userObj))

            dispatch(signSucceed(userObj))
          }).catch((err) => {
            console.log(err)
          })
      }).catch(error => {
        console.log('Login Error:', error)
        // dispatch({ type: LOGIN_FAILED, payload: null });
      })
  };
}

function signSucceed(user) {
  return {
    type: ActionTypes.SIGNIN_SUCCED,
    payload: user
  };
}
function signInError(error) {
  return {
    type: ActionTypes.SIGNIN_ERROR,
    payload: error
  }
}
// signUp ////////////////////////////////////////////////////////////////
export function signupAction(obj) {
  let user = null;
  return dispatch => {
    console.log(obj);
    web3.eth.personal.newAccount(obj.password).then((res) => {
      console.log('new account', res)
      // localStorage.setItem('ownerAccount', res)

      alert(`Your ethereum account address is: ${res}. Please save this address for further usage.`)

      dbConfig
        .auth()
        .createUserWithEmailAndPassword(obj.email, obj.password)
        .then(() => {
          obj.history.push("/");
          user = dbConfig.auth().currentUser;

          user
            .updateProfile({
              displayName: obj.name
            })
            .then(() => {
              // console.log(user)
              let userObj = {
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                accountAddress: res,
                dataObj: {}
              };
              // console.log(userObj)
              user.sendEmailVerification().then(function () {
                // Email sent.
                alert('Verification Sent');
                // console.log(user.uid)
                dbConfig.database().ref(`comboware/${user.uid}`).set(userObj);
              }).catch(function (error) {
                // An error happened.
                alert(`Error: ${error}`)
              });

              console.log(userObj);
              dispatch(signUpSucced(userObj));
            }).catch((err) => {
              console.log(err)
            })
        });
    }).catch(error => {
      console.error('error creating account ', error);
      alert(`Error: ${error}`)
      // dispatch({ type: SIGNUP_FAILED })
    })
  };
}

export function fetchDatabaseData() {

  return async dispatch => {
    console.log('......')
    const result = await fetch(`${ROOT_URL}/fetchSQLData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // authorization: getToken
      }

    })
    const getData = await result.json();
    // console.log(getData)
    if (!getData.error) {

      dispatch({
        type: ActionTypes.DATABASE_CONNECTION_SUCCESS,
        payload: getData
      })
      dispatch({
        type: ActionTypes.SQLDATAPUBLISH,
        payloadFetchData: getData
      })

    }
    else {
      console.log('erroe')
    }

  }
}

export function getBlockchainDBData() {
  return async dispatch => {
    const result = await fetch(`${ROOT_URL}/getBlockchainData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    });
    const getData = await result.json();
    console.log(getData.result)
    let getIpfsData = await fetch(`https://ipfs.io/ipfs/${getData.result}`, {
      method: 'GET'
    })
    let fetchBLOCDATA = await getIpfsData.json()
    console.log(fetchBLOCDATA.recordset)

    // let objStore = {
    //   firstName: getData.result[0],
    //   lastName: getData.result[1],
    //   address: getData.result[2],
    //   city: getData.result[3]
    // }
    // let arrList = [];
    // arrList.push(objStore)
    // // const [0,1,2,3] = getData.result;
    // // [0,1,2,3] = getData.result;
    // let onlyValues = Object.values(getData.result)
    // // for(let i = 0;i<onlyValues.length;i++){

    // // }
    if (fetchBLOCDATA !== null) {
      dispatch({
        type: ActionTypes.FETCH_DATA_SUCCESS,
        payload: fetchBLOCDATA.recordset
      })
    } else {
      console.log('erroe')
    }
    // console.log(getData)
  }
}
export function storeDatabaseData() {
  return async dispatch => {
    let result = await fetch(`${ROOT_URL}/pushSQLData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    })
    let fetchResult = await result.json();
    console.log(fetchResult)
    dispatch({
      type: ActionTypes.DATA_SUBMIT_SUCCESSFULL,
      payload: fetchResult.result,
      transactionProve: fetchResult.data
    })
  }
}
function signUpSucced(user) {
  return {
    type: ActionTypes.SIGNUP_SUCCED,
    payload: user
  };
}
function signUpError(error) {
  return {
    type: ActionTypes.SIGNUP_ERROR,
    payload: error
  }
}








/////////////////////////////// Publish Pages ////////////////////////////////////

///// create page ///
export function publishPage(data) {

  return dispatch => {
    console.log(data.name)
    let userId = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userId)
    let uniqueId = dbConfig.database().ref(`comboware`).child('Publish Pages').push().key;
    // console.log(uniqueId)

    let updates = {
      // name: data
    }
    let dataVal = {
      name: data.heading,
      paragraph: data.paragraph,
      userID: userId.uid
    }
    updates[`comboware/Publish Pages/${uniqueId}`] = dataVal
    console.log(updates)
    // console.log(updates)

    dbConfig.database().ref().update(updates)


  }
}
////// create page ////
///// page list ////


export function pageList() {
  return dispatch => {
    let userId = JSON.parse(localStorage.getItem('userInfo'));
    dispatch({
      type: ActionTypes.DELETE_ALL_PAGE_LIST
    })
    dbConfig.database().ref(`comboware`).child('Publish Pages').once('value', (snapshot) => {

      let pagesDetail = snapshot.val(),
        dataKeys = Object.keys(pagesDetail);
      // console.log(pageDetail)
      // console.log(dataKeys)
      dataKeys.map(i => {
        // console.log(i,pagesDetail[i].paragraph)
        let obj = {
          // console.log(i)
          name: pagesDetail[i].name,
          userId: pagesDetail[i].userID,
          id: i,
          paragraph: pagesDetail[i].paragraph
        }
        // console.log(obj)
        dispatch(listRetrieveSuccess(obj))


      })


    })
  }
}

export function sqlDetail(data) {
  return dispatch => {
    dispatch(pageDetailSuccess(data))
  }
}
export function pageDetail(id) {
  return dispatch => {
    console.log(id)
    dbConfig.database().ref(`comboware`).child(`Publish Pages/${id}`).once('value', (snapshot) => {
      let pageDetail = snapshot.val();
      console.log(pageDetail)
      dispatch(pageDetailSuccess(pageDetail))

    })

  }
}
function listRetrieveSuccess(data) {
  return {
    type: ActionTypes.PUBLISH_LIST_SUCCESS,
    payload: data
  }
}



function pageDetailSuccess(data) {
  return {
    type: ActionTypes.PUBLIC_PAGE_DETAIL_SUCCEESS,
    payload: data
  }
}







/////////////////Publish Page/////////////////////////////
///////////////// ASSET CREATA LOGS///
export function showAssetCreate(data) {
  return disptach => {
    console.log(data, 'aaaaaajaaa')
  }
}
///////////////// ASSET CREATA LOGS///




////////////////////////////////////////// COnnection with different databases ////////////////////
export function connectWithDBActions(obj) {
  return async dispatch => {
    // console.log(obj)
    let result = await fetch(`${ROOT_URL}/connectWithDatabase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(obj)
    })

    let fetchUser = await result.json();

    // console.log(fetchUser)
    if (fetchUser.message) {
      console.log(fetchUser.message)
    } else {
      dispatch({
        type: ActionTypes.CONNECT_WITH_DATABASE,
        payload: fetchUser.connectSuccessfull
      })
    }
    // console.log(result)

  }
}




////////////////////////////////////////// COnnection with different databases ////////////////////
