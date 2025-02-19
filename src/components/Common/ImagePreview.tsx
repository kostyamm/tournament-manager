import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib';

// export async function getImageSize(url: string) {
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();
//     const image = sharp(Buffer.from(buffer));
//     const { width, height } = await image.metadata();
//
//     return { width, height };
// }

type ImagePreviewProps = ImageProps & {
    shadow?: boolean;
    rounded?: boolean;
    aspect?: number;
}

export const ImagePreview = async ({
    src,
    alt,
    className,
    aspect,
    shadow = true,
    rounded = true,
    ...restProps
}: ImagePreviewProps) => {
    // const { width, height } = await getImageSize(src as string);

    return (
        <Image
            src={src}
            alt={alt}
            sizes="100vw"
            // width={width || 500}
            // height={height || 300}
            width={500}
            height={300}
            style={{
                width: '100%',
                height: 'auto',
            }}
            className={cn(
                shadow && 'shadow-3xl',
                rounded && 'rounded-xl',
                aspect && `aspect-[${aspect}]`,
                className,
            )}
            {...restProps}
        />
    );
};