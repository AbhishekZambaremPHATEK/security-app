
class TokenValidation {
    validToken (user) {
        var storage = user;
        if (storage !== null) {
            const date1 = new Date();
            var strDateTime = storage.exp;
            var result = strDateTime - (new Date().getTime() / 1000);
            if (result > 1) {
                return true;
            }else {
                return false;
            }

        } else {
            return false;
        }
    }  
}
let API = new TokenValidation();
export default API;