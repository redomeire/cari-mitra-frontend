import axios from "axios";
import React from "react";
import { Button } from "react-daisyui";
import Alert from "../../components/Alert/Alert";
// import Button from "../components/Button/Button";
import Input from "../../components/Input/Input";
import Typography from "../../components/Typography/Typography";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

interface Props {
    status: string,
    visible: boolean,
    message: string
}

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [sop, setSop] = React.useState('');
    const [dukungan, setDukungan] = React.useState('');
    const [noTelp, setNoTelp] = React.useState('');
    const [alamat, setAlamat] = React.useState('');
    const [popup, setPopup] = React.useState<Props>({
        status: '',
        visible: false,
        message: ''
    })

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        axios.post('http://localhost:3333/api/partner/create', {
            nama: name,
            email: email,
            password: password,
            sop: sop,
            dukungan: dukungan,
            no_telp: noTelp,
            alamat: alamat
        })
        .then(res => {
            console.log(res);

            setPopup({
                status: res.data.status,
                visible: true,
                message: 'Success create new partner'
            });

            setTimeout(() => {
                navigate('/partner/login')
            }, 2000);
        })
        .catch(err => {
            console.log(err);

            setPopup({
                status: 'error register',
                visible: true,
                message: 'Error create partner'
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
                <Typography variant="subtitle1">Register for partner</Typography>
                <Typography variant="paragraph" className="my-5">Create account to interact with our system</Typography>
                <Button className="w-full bg-white border border-gray-300 hover:border-gray-300 rounded-full hover:bg-gray-100" startIcon={<FcGoogle size="20px" />}>
                    <Typography className="normal-case text-gray-700">Sign in with google</Typography>
                </Button>
                <form className="mt-5 w-full" onSubmit={handleSubmit}>
                    <Input required label="Nama*" placeholder="mail@carimitra.com" className="mb-5" onChange={e => setName(e.target.value)} />
                    <Input required label="Email*" placeholder="mail@carimitra.com" className="mb-5" onChange={e => setEmail(e.target.value)} />
                    <Input required label="Password*" type="password" placeholder="password goes here" onChange={e => setPassword(e.target.value)} />
                    <Input required label="Sop*" type="text" placeholder="sop anda" onChange={e => setSop(e.target.value)} />
                    <Input required label="Dukungan*" type="text" placeholder="fasilitas yang anda tawarkan" onChange={e => setDukungan(e.target.value)} />
                    <Input required label="No telp*" type="text" placeholder="nomor telepon perusahaan" onChange={e => setNoTelp(e.target.value)} />
                    <Input required label="alamat*" type="text" placeholder="alamat perusahaan" onChange={e => setAlamat(e.target.value)} />
                    
                    <Button className="w-full mt-5 rounded-full bg-purple-500 border-none normal-case">Register</Button>
                    <Typography className="text-[14px] mt-4">Already have accounts? <a href="/partner/login"><span className="font-semibold">Login</span></a></Typography>
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