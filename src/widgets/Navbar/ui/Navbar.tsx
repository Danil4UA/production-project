import { classNames } from "shared/lib/classNames/classNames"
import * as cls from "./Navbar.module.scss"
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import { memo, useCallback, useState } from "react";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, userActions } from "entities/User";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo( ({className}: NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()
    const onCloseModal = useCallback(()=>{
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(()=> {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(()=>{
        dispatch(userActions.logout())
    },[dispatch])
    if(authData){
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Button
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={onLogout}
                    className={classNames(cls.links)}>
                    {t("Exit")}
                </Button>
            </div>
        )
    }
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ThemeButton.CLEAR_INVERTED}
                onClick={onShowModal}
                className={classNames(cls.links)}>
                {t("Enter")}
            </Button>
            {isAuthModal && <LoginModal 
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />}
        </div>
    )

});

 