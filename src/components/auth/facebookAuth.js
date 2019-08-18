import firebase from '../../firebase'

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({
    'display': 'popup'
});

export default provider;