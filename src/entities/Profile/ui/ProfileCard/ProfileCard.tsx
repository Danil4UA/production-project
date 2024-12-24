/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./ProfileCard.module.scss";
import Text, { TextAlign, TextTheme } from "shared/ui/Text/Text";
import Input from "shared/ui/Input/Input";
import { Profile } from "entities/Profile/model/types/profile";
import Loader from "shared/ui/Loader/Loader";
import { useTranslation } from "react-i18next";
import Avatar from "shared/ui/Avatar/Avatar";
import { Currency, CurrencySelect } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFistname?: (value?:string) => void;
    onChangeLastname?: (value?:string) => void;
    onChangeAge?: (value?:string) => void;
    onChangeCity?: (value?:string) => void;
    onChangeUsername?: (value?:string) => void;
    onChangeAvatar?: (value?:string) => void;
    onChangeCurrency?: (value?:Currency) => void;
    onChangeCountry?: (value?:Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {t} = useTranslation("profile")
    const {
        className, 
        data,
        isLoading,
        error,
        readonly,
        onChangeFistname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    }= props

    if(isLoading){
        return (
            <div className={classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
                <Loader />
            </div>
        )
    }
    if(error){
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text theme={TextTheme.ERROR} 
                    title={t("Error occured while loading the profile")} 
                    text={t("Please try to refresh the page")}
                    align={TextAlign.CENTER}
                />
            </div>
        )
    }
    const modes = {
        [cls.editing]: !readonly,
    }
    return (
        <div className={classNames(cls.ProfileCard, modes, [className])}>
            <div>
                {data?.avatar &&
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data.avatar} />
                    </div>
                }
                <Input 
                    value={data?.first}
                    placeholder={t("Your firstname")}
                    className={cls.input}
                    onChange={onChangeFistname}
                    readonly={readonly}
                />
                <Input 
                    value={data?.lastname}
                    placeholder={t("Your lastname")}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input 
                    value={data?.age}
                    placeholder={t("Your age")}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input 
                    value={data?.city}
                    placeholder={t("City")}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input 
                    value={data?.username}
                    placeholder={t("Username")}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input 
                    value={data?.avatar}
                    placeholder={t("Avatar")}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect 
                    className={cls.input}
                    value={data?.currency} 
                    onChange={onChangeCurrency} 
                    readonly={readonly}
                />
                <CountrySelect
                    className={cls.input}
                    value={data?.country} 
                    onChange={onChangeCountry} 
                    readonly={readonly}
                />
            </div>
            
        </div>
    );
};

export default ProfileCard;