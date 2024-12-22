import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./ProfilePageHeader.module.scss";
import { t } from "i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Text from "shared/ui/Text/Text";
import { useSelector } from "react-redux";
import { getProfileReadonly, profileActions, updateProfileData } from "entities/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(()=>{
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(()=> {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(()=> {
        dispatch(updateProfileData())
    }, [dispatch])


    return (
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text 
                title={t("Profile")}
            />
            {readonly ? 
                <Button 
                    theme={ThemeButton.OUTLINE}
                    className={cls.editBtn}
                    onClick={onEdit}
                >
                    {t("Edit")}
                </Button>
                :
                <>
                    <Button 
                        theme={ThemeButton.OUTLINE_RED}
                        className={cls.editBtn}
                        onClick={onCancelEdit}
                    >
                        {t("Cancel")}
                    </Button>
                    <Button 
                        theme={ThemeButton.OUTLINE}
                        // className={cls.saveBtn}
                        onClick={onSave}
                    >
                        {t("Save")}
                    </Button>
                </>
            } 
            
        </div>
    );
};

export default ProfilePageHeader;