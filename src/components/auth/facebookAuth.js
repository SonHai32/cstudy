import firebase from '../../firebase'

var facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.addScope('email');
firebase.auth().useDeviceLanguage();
facebookProvider.setCustomParameters({
    'display': 'popup'
});

export default facebookProvider;