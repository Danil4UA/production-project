/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./ProfileCard.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProfileData } from "entities/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileIsLoading } from "entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "entities/Profile/model/selectors/getProfileError/getProfileError";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Text from "shared/ui/Text/Text";
import Input from "shared/ui/Input/Input";

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const {t} = useTranslation("profile")
    const data = useSelector(getProfileData)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t("Profile")}/>
                <Button theme={ThemeButton.OUTLINE}
                    className={cls.editBtn}
                >
                    {t("Edit")}
                </Button>
            </div>
            <div className={cls.data}>
                <Input 
                    value={data?.first}
                    placeholder={t("Your firstname")}
                    className={cls.input}
                />
                <Input 
                    value={data?.lastname}
                    placeholder={t("Your lastname")}
                />

            </div>
            
        </div>
    );
};

export default ProfileCard;