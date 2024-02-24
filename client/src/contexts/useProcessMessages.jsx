import { useToast } from "@src/@/components/ui/use-toast";
import { errorTypes } from "../services/errorTypes";

const useProcessMessages = () => {
    const { toast } = useToast();

    const processError = (error) => {
        const errorMessage = error?.response?.data?.error
            ? errorTypes[error.response.data.error] || error.response.data.error
            : error.message || errorTypes.SERVER_ERROR;
        console.error("Error:", errorMessage);
        toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
        });
    };

    const processSuccess = (message) => {
        toast({
            title: "Success",
            description: message,
        });
    };

    return { processError, processSuccess };
};

export default useProcessMessages;
