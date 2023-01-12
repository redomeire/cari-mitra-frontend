import { Button, Select, Textarea } from "react-daisyui";
import Input from "../../../components/Input/Input";
import Typography from "../../../components/Typography/Typography";

interface Props {
    setNamaAcara: Function,
    setJenisAcara: Function,
    setTempat: Function,
    setTanggal: Function,
    setWaktu: Function,
    setInstansi: Function,
    setDeskripsi: Function,
    setStepNumber: Function,
    swiperRef: any
}

const Progress2 = ({ 
    setStepNumber,
    setNamaAcara, 
    setJenisAcara,
    setTempat,
    setTanggal,
    setWaktu,
    setInstansi,
    setDeskripsi,
    swiperRef }: Props) => {

    return (
        <div>
            <Typography variant="subtitle2" className="mt-10 mb-3">Lengkapi data acaramu</Typography>
            <Typography variant="paragraph">Data ini diperlukan oleh perusahaan yang hendak kamu ajukan Sponsorship</Typography>
            <div className="mx-auto mt-10">
                <Input onChange={e => setNamaAcara(e.target.value)} className="mb-3" required label="Nama Acaramu" placeholder="Dies natalis ..." />
                <Typography variant="paragraph" className="mt-2 mb-2">Jenis acara*</Typography>
                <Select onChange={e => setJenisAcara(e.target.value)} required className="w-full mb-3" defaultValue={'default'}>
                    <Select.Option value={'default'} disabled>Pilih jenis acara anda</Select.Option>
                    <Select.Option value={'Dies natalis'}>Dies Natalis</Select.Option>
                    <Select.Option value={'seminar'}>Seminar</Select.Option>
                    <Select.Option value={'lomba'}>Lomba</Select.Option>
                </Select>
                <Input onChange={e => setTempat(e.target.value)} className="mb-3" required label="Tempat*" placeholder="Jalan Soekarno Hatta ..." />
                <div className="flex items-center justify-between mb-3">
                    <div className="md:w-[45%]">
                        <Input onChange={e => setTanggal(e.target.value)} required type="date" label="Tanggal*" />
                    </div>
                    <div className="md:w-[45%]">
                        <Input onChange={e => setWaktu(e.target.value)} required type="datetime-local" label="Waktu*" />
                    </div>
                </div>
                <Input onChange={e => setInstansi(e.target.value)} className="mb-3" required label="Instansi*" placeholder="instansi anda" />
                <Typography className="my-2">Deskripsi singkat acaramu</Typography>
                <Textarea onChange={e => setDeskripsi(e.target.value)} required placeholder="tulis deskripsi di sini" className="w-full" />
                <div className="flex justify-end">
                    {/* <Button type="button" className="mt-5 w-fit mr-3" onClick={() => { swiperRef.current?.slidePrev() }}>Prev</Button> */}
                    <Button type="button" className="mt-5 w-fit" onClick={() => { 
                        swiperRef.current?.slideNext()
                        setStepNumber((prev: number) => prev + 1)
                         }}>Next</Button>
                </div>
            </div>
        </div>
    );
}

export default Progress2;