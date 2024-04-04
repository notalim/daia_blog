import { useToast } from "@src/@/components/ui/use-toast";
import { errorTypes } from "../services/errorTypes";

const useProcessMessages = () => {
    const { toast } = useToast();

    const processError = (error) => {
        console.log("Error:", error);
        const errorMessage = error|| "An error occurred."
        // console.error("Error:", errorMessage);
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
