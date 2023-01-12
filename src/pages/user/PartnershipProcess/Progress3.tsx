import { Button, FileInput } from "react-daisyui";
import Typography from "../../../components/Typography/Typography";

const Progress3 = ({ swiperRef, setStepNumber }: { swiperRef: any, setStepNumber: Function }) => {
    return (
        <div>
            <Typography variant="subtitle2" className="mt-10 mb-3">Lengkapi dokumen yang dibutuhkan</Typography>
            <Typography variant="paragraph">Contohnya seperti surat pengantar dari instansi terkait dan proposal</Typography>
            <div className="mx-auto mt-10">
                <Typography variant="paragraph" className="my-2">Surat Pengantar Instansi*</Typography>
                <FileInput accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, pdf/*" className="w-full" color="primary" required/>
                <Typography variant="paragraph" className="my-2 mt-10">Proposal*</Typography>
                <FileInput accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, pdf/*" className="w-full" color="primary" required/>
                <div className="flex justify-end mt-10">
                    <Button type="button" className="mt-5 w-fit mr-3" onClick={() => { 
                        swiperRef.current?.slidePrev()
                        setStepNumber((prev: number) => prev - 1)
                        }}>Prev</Button>
                    <Button type="submit" className="mt-5 w-fit">Submit</Button>
                </div>
            </div>
        </div>
    );
}

export default Progress3;