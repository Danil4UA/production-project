import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions } from "../../model/slice/LoginSlice";
import { getLoginState } from "../../model/selectors/getLoginState/getLoginState";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { AppDispatch } from "app/providers/StoreProvider/config/store";
import Text from "shared/ui/Text/Text";
import { TextTheme } from "shared/ui/Text/Text";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const {t} = useTranslation()

    const dispatch = useDispatch<AppDispatch>()
    const {username, password, isLoading, error} = useSelector(getLoginState)

    const onChangeUsername = useCallback((value: string)=>{
        dispatch(loginActions.setUsername(value))
    },[dispatch])

    const onChangePassword = useCallback((value: string)=>{
        dispatch(loginActions.setPassword(value))
    },[dispatch])

    const onLoginClick = useCallback(()=>{
        dispatch(loginByUsername({
            username,
            password
        }))
    },[dispatch, username, password])

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t("Auth form")}/>
            {error && <Text text={error} theme={TextTheme.ERROR}/>}
            <Input 
                className={cls.input} 
                type="text" 
                placeholder={t("Enter username")} 
                autofocus
                onChange={onChangeUsername}
                value={username}
            />
            <Input 
                className={cls.input} 
                type="text" 
                placeholder={t("Enter password")} 
                autofocus
                onChange={onChangePassword}
                value={password}
            />
            <Button
                theme={ThemeButton.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t("Enter")}
            </Button>
        </div>
    );
});

export default LoginForm;