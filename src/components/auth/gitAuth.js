import firebase from '../../firebase'


var gitProvider = new firebase.auth.GithubAuthProvider();
gitProvider.addScope('repo');

export default gitProvider;