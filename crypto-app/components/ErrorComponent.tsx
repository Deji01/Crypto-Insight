import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorComponentProps {
    message: string;
    onRetry?: () => void;
}

export default function ErrorComponent({ message, onRetry }: ErrorComponentProps) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="mt-2">
                    Retry
                </Button>
            )}
        </Alert>
    );
}