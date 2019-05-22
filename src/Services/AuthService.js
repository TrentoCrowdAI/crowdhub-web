/* global gapi auth2 */


const AuthService = {

  authChangeListeners: [],
  auth2: null,

  async init() {
    await this._waitForGapiToLoad();
    this.auth2 = await this._loadAuth2Api();
    this._notifyListeners();
  },

  _waitForGapiToLoad() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (window.gapi) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  },

  _loadAuth2Api() {
    return new Promise(resolve => {
      gapi.load('auth2', function () {
        const auth2 = gapi.auth2.init();
        resolve(auth2);
      });
    });
  },

  addOnAuthChangeListener(listener) {
    this.authChangeListeners.push(listener);
  },

  renderSignInButton(containerId, onSignedIn) {
    gapi.signin2.render(containerId, {
      onSuccess: () => {
        onSignedIn();
        this._notifyListeners();
      }
    });
  },

  _notifyListeners() {
    this.authChangeListeners.forEach(listener => listener())
  },

  isInitialized() {
    return !!this.auth2;
  },

  isSignedIn() {
    return this.auth2.isSignedIn.get();
  },

  signOut() {
    return new Promise(resolve => this.auth2.signOut().then(() => {
      resolve();
      this._notifyListeners();
    }));
  },

  getUserInfo(){
    return this.auth2.currentUser.get().getBasicProfile();
  }

};

export default AuthService;
