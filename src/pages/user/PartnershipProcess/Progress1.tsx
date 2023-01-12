import { Button } from "react-daisyui";
import Input from "../../../components/Input/Input";
import Typography from "../../../components/Typography/Typography";

const PartnershipProcess = ({ swiperRef }: { swiperRef: any }) => {
    let Storage = window.localStorage.getItem('Authorization')

    let user = Storage !== null ? JSON.parse(Storage || "") : ''

    return (
        <div>
            <Typography variant="subtitle2" className="mt-10 mb-3">Lengkapi data pribadimu dulu ya</Typography>
            <Typography variant="paragraph">Data ini diperlukan oleh perusahaan yang hendak kamu ajukan sponsorship</Typography>
            <div className="mx-auto mt-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="md:w-[45%]">
                        <Input defaultValue={user.nama_depan} label="Nama depan*" />
                    </div>
                    <div className="md:w-[45%]">
                        <Input defaultValue={user.nama_belakang} label="Nama depan*" />
                    </div>
                </div>
                <Input className="mb-3" defaultValue={user?.no_telp} label="Nomor telepon*" placeholder="081..." />
                <Input className="mb-3" defaultValue={user.email} label="Email*" placeholder="081..." />
                <Input defaultValue={user?.alamat} label="Alamat*" placeholder="081..." />
                <div className="flex justify-end">
                    <Button type="button" className="mt-5 w-fit" onClick={() => { swiperRef.current?.slideNext() }}>Next</Button>
                </div>
            </div>
        </div>
    );
}

export default PartnershipProcess;