import { AuthButton } from '@/components/AuthButton';

export default function Login({ searchParams }: { searchParams?: { callbackUrl: string } }) {
    return (
        <div className="min-h-[calc(100dvh_-_145px)] flex items-center justify-center">
            <AuthButton callbackUrl={searchParams?.callbackUrl} />
        </div>
    );
};
