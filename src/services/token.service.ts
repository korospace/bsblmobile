const TOKEN_KEY = "token";
const getApiURL = "https://t-gadgetcors.herokuapp.com/https://bsbl.herokuapp.com";

const TokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken: any) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }
};

const loggedIn = (() => {
    if(TokenService.getToken() != null ) {
        return true;
    } else {
        return false;
    }
});


export { TokenService, getApiURL, loggedIn };
