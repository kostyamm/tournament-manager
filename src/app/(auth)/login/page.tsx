import { AuthButton } from '@/components/Common';

type PageProps = {
    searchParams?: Promise<{ callbackUrl: string }> | undefined;
};

export default async function Login(props: PageProps) {
    const searchParams = await props?.searchParams
    return (
        <div className="min-h-[calc(100dvh_-_145px)] flex items-center justify-center">
            <AuthButton callbackUrl={searchParams?.callbackUrl} />
        </div>
    );
};
