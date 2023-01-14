import axios from "axios";
import React from "react";
import { Button } from "react-daisyui";
import Alert from "../../components/Alert/Alert";
// import Button from "../components/Button/Button";
import Input from "../../components/Input/Input";
import Typography from "../../components/Typography/Typography";
import { FcGoogle } from "react-icons/fc";

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

        axios.post('http://localhost:3333/api/auth/login', {
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

                window.localStorage.setItem('Authorization', JSON.stringify(res.data.data))

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

    const handleGoogle = () => {
        axios.get('http://localhost:3333/api/auth/google/redirect')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        })
    }

    return (
        // <AppLayout>
        <div className="flex items-stretch min-h-screen font-sora">
            <Alert
                popup={popup}
                setPopup={setPopup}
            />

            <div className="p-14 md:w-1/2">
                <Typography variant="subtitle1">Login</Typography>
                <Typography variant="paragraph" className="my-5">See your growth and get consulting support</Typography>
                <Button className="w-full bg-white border border-gray-300 hover:border-gray-300 rounded-full hover:bg-gray-100" startIcon={<FcGoogle size="20px" />}>
                    <Typography className="normal-case text-gray-700">Sign in with google</Typography>
                </Button>
                <form className="mt-5" onSubmit={handleSubmit}>
                    <Input required label="Email*" placeholder="mail@carimitra.com" className="mb-5" onChange={e => setEmail(e.target.value)} />
                    <Input required label="Password*" type="password" placeholder="mail@carimitra.com" onChange={e => setPassword(e.target.value)} />
                    <div className="flex items-center mt-5">
                        <Input type="checkbox" className="w-fit mr-2 h-fit" />
                        <Typography className="text-[15px] font-semibold">Remember me</Typography>
                    </div>
                    <Button className="w-full mt-5 rounded-full bg-purple-500 border-none normal-case">Login</Button>
                    <Typography className="text-[14px] mt-4">Not registered yet? <a href="/auth/register"><span className="font-semibold">Create an account</span></a></Typography>
                </form>
            </div>
            <div className="bg-purple-600 md:w-1/2 p-14 flex items-center justify-center text-white">
                <div className="flex flex-col justify-center">
                    <img src="/images/home/agreement2.png" alt="login" className="md:w-[600px]"/>
                    <Typography variant="subtitle2" className="text-center">Turn your ideas into reality</Typography>
                    <Typography variant="paragraph" className="text-center w-[70%] mx-auto mt-4">Consistent quality and experience across all platforms and devices</Typography>
                </div>
            </div>
        </div>

        // </AppLayout>    
    );
}

export default Login;