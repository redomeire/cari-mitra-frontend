import axios from "axios";
import React from "react";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import AppLayout from "../../components/layout/AppLayout";
import Typography from "../../components/Typography/Typography";

interface Props {
    status: string,
    visible: boolean,
    message: string
}

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [popup, setPopup] = React.useState<Props>({ 
        status: '',
        visible: false,
        message: ''
     })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        axios.post('http://127.0.0.1:3333/login', {
            email: email,
            password: password
        })
        .then(res => {
            console.log(res);
            setPopup({
                status: res.data.status,
                visible: true,
                message: 'Success login'
            });

            localStorage.setItem('Authorization', JSON.stringify(res.data.data))

            setTimeout(() => {
                window.location.reload()
            }, 1500);
        })
        .catch(err => {
            console.log(err);
            setPopup({
                status: err.response.data.status,
                visible: true,
                message: err.response.data.message
            });
        })
    }

    return ( 
        <AppLayout>
            <Alert
            popup={popup}
            setPopup={setPopup}
            />
            <form onSubmit={handleSubmit} className='rounded border p-5 md:w-[45%] mx-auto shadow-lg'>
            <Typography variant="title" className="mb-5">Login for admin</Typography>
                <Input label="Email" type="email" className="my-2 w-full" onChange={e => setEmail(e.target.value)}/>
                <Input label="Password" type="password" className="my-2" onChange={e => setPassword(e.target.value)}/>

                <Button type="submit" className="mt-5">Submit</Button>
            </form>
        </AppLayout>
     );
}
 
export default Login;