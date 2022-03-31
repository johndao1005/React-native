import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {USER_STATE_CHANGE} from '../constants/index'

export function fetchUser() {
    return((dispatch)=>{
        firestore().collection("user")
        .doc(auth().currentUser.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
                dispatch({type:USER_STATE_CHANGE, currentUser : snapshot.data()})
                //console.log(snapshot.data())
            } else{
                console.log('does not exists')
            }
        })
    })
}