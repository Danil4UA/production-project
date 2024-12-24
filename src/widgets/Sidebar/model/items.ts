import { VFC, SVGProps } from "react";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import MainIcon from "shared/assets/icons/home_icon.svg"
import AboutIcon from "shared/assets/icons/about_icon.svg"
import ProfileIcon from "shared/assets/icons/profile_icon.svg"

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: "Main"
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: "About"
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        text: "Profile",
        authOnly: true,
    },
]