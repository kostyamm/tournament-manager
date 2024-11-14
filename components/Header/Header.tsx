import { HeaderLogo, HeaderWrapper } from '@/components/Header';
import { HeaderMenuMobile } from '@/components/Header/HeaderMenuMobile';
import { HeaderMenuDesktop } from '@/components/Header/HeaderMenuDesktop';

export const Header = () => {
    return (
        <HeaderWrapper>
            <HeaderLogo />
            <HeaderMenuMobile />
            <HeaderMenuDesktop />
        </HeaderWrapper>
    );
};

