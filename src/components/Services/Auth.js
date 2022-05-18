// import axios from 'axios';

//export const LoginService = async (values) => {
//     var qs = require('qs');
//     await axios.post('auth/login', qs.stringify(values))
//         .then(response => {
//             console.log(response.data)
//             localStorage.removeItem("user");
//             localStorage.removeItem("userInfo");
//             localStorage.setItem("user", JSON.stringify(response.data));
//             response.data.userdata && localStorage.setItem("userInfo", JSON.stringify(response.data.userdata));
//         })
//         .catch(error => {
//             console.log(error);
//         });
//}

// export const isAuth = async () => {
//     if (localStorage.getItem('user') && localStorage.getItem('userInfo')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': JSON.parse(localStorage.getItem('user')).token
//             }
//         }
//         await axios.post('/auth/isAuth', null, config).then(
//             res => {
//                 if (res.data.status) {
//                     localStorage.setItem("user", JSON.stringify(res.data));
//                 } else {
//                     console.log(res.data.message === 'EXPIRED_TOKEN' ? "expired token" : res.data);
//                     logout()
//                 }
//             }
//         )
//             .catch(error => {
//                 console.log(error)
//                 logout()
//             })

//     } else {
//         console.log('no token ');
//         logout()
//     }
// }

export const logout = async () => {
  try {
    // let res = await axios.get('auth/logout');
    //if (res.data) {
    // localStorage.removeItem("user");
    // localStorage.removeItem("userInfo");
    window.location.replace("http://localhost:3000/login");
    // }
  } catch (error) {
    console.error(error);
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    window.location.replace("http://localhost:3000/login");
  }
};
