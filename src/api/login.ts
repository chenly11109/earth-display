import axios from "axios";

export function login() {
    axios.post('/user/oauth/authorize', {
        username: 'lee',
        password: '111'
    }).then((res) => {
        console.log(res);
        return res.data.token;
    }).catch((err) => {
        console.log(err);
        return err;
    });
}