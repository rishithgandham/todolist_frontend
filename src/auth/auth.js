import axios from 'axios';



async function isAuth() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return false;
        const isAuthenticated = axios.post('/api/v5/isauthenticated', {
            jwt: token
        }).then(response => {
            return response.data;
        }).catch(error => {
            logout();
            console.log('an error occured')
            console.log(error.response.data);
        })
        return isAuthenticated;

    } catch (error) {
        console.log('an error occured: ', error)
    }


}

export function logout() {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('details');
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    // window.location.href = '/#/check';
}

export default isAuth;

