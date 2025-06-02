import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertDialogTemplateProps {
    title?: string;
    description?: string;
    actionText?: string;
    cancelText?: string;
    onAction?: () => void;
    onCancel?: () => void;
    open?: boolean;
    handleClose?: () => void;
}

export function AlertDialogTemplate({ title, description, actionText, cancelText, onCancel, onAction, open, handleClose }: AlertDialogTemplateProps) {
    return (
        <AlertDialog open={open} onOpenChange={handleClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="capitalize">{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onAction}>{actionText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
