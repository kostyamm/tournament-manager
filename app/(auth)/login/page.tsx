import { AuthButton } from '@/components/AuthButton';

export default function Login({ searchParams }: { searchParams?: { callbackUrl: string } }) {
    return (
        <div className="h-dvh flex items-center justify-center">
            <AuthButton callbackUrl={searchParams?.callbackUrl} />
        </div>
    );
};
