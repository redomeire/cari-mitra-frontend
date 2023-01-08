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

const Register = () => {
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [popup, setPopup] = React.useState<Props>({
        status: '',
        visible: false,
        message: ''
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        axios.post('http://localhost:3333/api/auth/register', {
            nama_depan: firstname,
            nama_belakang: lastname,
            email: email,
            password: password
        })
        .then(res => {
            console.log(res);

            setPopup({
                status: res.data.status,
                visible: true,
                message: 'Success create new account'
            });
        })
        .catch(err => {
            console.log(err);

            setPopup({
                status: 'error register',
                visible: true,
                message: 'Error create account'
            });
        })
    }

    return ( 
        <div className="flex items-stretch min-h-screen font-sora">
            <Alert
                popup={popup}
                setPopup={setPopup}
            />

            <div className="p-14 md:w-1/2">
                <Typography variant="subtitle1">Register</Typography>
                <Typography variant="paragraph" className="my-5">Create account to interact with our system</Typography>
                <Button className="w-full bg-white border border-gray-300 hover:border-gray-300 rounded-full hover:bg-gray-100" startIcon={<FcGoogle size="20px" />}>
                    <Typography className="normal-case text-gray-700">Sign in with google</Typography>
                </Button>
                <form className="mt-5 w-full" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between w-full">
                        <div className="md:w-[47%]">
                            <Input required onChange={e => setFirstname(e.target.value)} type="text" label="first name*" placeholder="first name" className="md:w-full mr-4"/>
                        </div>
                        <div className="md:w-[47%]">
                            <Input required onChange={e => setLastname(e.target.value)} type="text" label="last name*" placeholder="last name" className="md:w-full"/>
                        </div>
                    </div>
                    <Input required label="Email*" placeholder="mail@carimitra.com" className="mb-5" onChange={e => setEmail(e.target.value)} />
                    <Input required label="Password*" type="password" placeholder="password goes here" onChange={e => setPassword(e.target.value)} />
                    
                    <Button className="w-full mt-5 rounded-full bg-purple-500 border-none normal-case">Register</Button>
                    <Typography className="text-[14px] mt-4">Already have accounts? <a href="/auth/login"><span className="font-semibold">Login</span></a></Typography>
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

     );
}
 
export default Register;