import AppLayout from "../../components/layout/AppLayout";
import React from "react";
import axios from "axios";

const Riwayat = () => {
    React.useEffect(() => {
        let Storage = window.localStorage.getItem('Authorization')

        let user = Storage !== null ? JSON.parse(Storage || "") : ''

        axios.get('http://localhost:3333/api/pengajuan/user/get/all', {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    })

    return ( 
        <AppLayout>
            
        </AppLayout>
     );
}
 
export default Riwayat;