import { Steps } from "react-daisyui";
import AppLayout from "../components/layout/AppLayout";

const PartnershipProcess = () => {
    return (
        <AppLayout>
            <div className="w-full flex justify-center bg-purple-600 p-20">
            <Steps>
                <Steps.Step color="neutral">Lengkapi data pribadi</Steps.Step>
                <Steps.Step color="primary">Choose plan</Steps.Step>
                <Steps.Step>Purchase</Steps.Step>
            </Steps>
            </div>
        </AppLayout>
    );
}

export default PartnershipProcess;