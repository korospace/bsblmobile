const TOKEN_KEY = "token";

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


export { TokenService, loggedIn };
