/* global gapi */

/**
 * AuthService uses the Google Platform Library to authenticate users. This library is loaded from a script specified in
 * the index.html, where you can also find the client id.
 * Since the script exposes a global object gapi at an unknown time, this Service need to be initialized.
 * The initialization process will periodically check if the library is loaded until it can find the gapi global object
 */
const AuthService = {

  _authChangeListeners: [],
  auth2: null,

  async init() {
    await this._waitForGapiToLoad();
    this.auth2 = await this._loadAuth2Api();
    this._notifyListeners();
  },

  /**
   * Wait until the Google Platform Library exposes the gapi global object
   * @returns {Promise<any>}
   * @private
   */
  _waitForGapiToLoad() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (window.gapi) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  },

  /**
   * Request to the Google Platform Library to load the auth2 module
   * @returns {Promise<any>}
   * @private
   */
  _loadAuth2Api() {
    return new Promise(resolve => {
      gapi.load('auth2', function () {
        const auth2 = gapi.auth2.init();
        resolve(auth2);
      });
    });
  },

  addOnAuthChangeListener(listener) {
    this._authChangeListeners.push(listener);
  },

  renderSignInButton(containerId, onSignedIn) {
    this.assertInitialized();
    gapi.signin2.render(containerId, {
      onSuccess: () => {
        onSignedIn();
        this._notifyListeners();
      }
    });
  },

  _notifyListeners() {
    this._authChangeListeners.forEach(listener => listener())
  },

  isInitialized() {
    return !!this.auth2;
  },

  isSignedIn() {
    this.assertInitialized();
    return this.auth2.isSignedIn.get();
  },

  signOut() {
    this.assertInitialized();
    return new Promise(resolve => this.auth2.signOut().then(() => {
      resolve();
      this._notifyListeners();
    }));
  },

  getBearerToken () {
    this.assertInitialized();
    return this.auth2.currentUser.get().getAuthResponse().id_token;
  },

  getUserInfo(){
    this.assertInitialized();
    return this.auth2.currentUser.get().getBasicProfile();
  },

  assertInitialized () {
    if(!this.isInitialized()) {
      throw new Error('AuthService not initialized');
    }
  }

};

export default AuthService;
