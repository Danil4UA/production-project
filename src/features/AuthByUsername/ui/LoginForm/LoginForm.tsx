/* eslint-disable no-empty */
import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import { useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "../../model/slice/LoginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import Text from "shared/ui/Text/Text";
import { TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import DynamicModuleLoader, { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const {t} = useTranslation()

    const dispatch = useAppDispatch()

    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)


    const onChangeUsername = useCallback((value: string)=>{
        dispatch(loginActions.setUsername(value))
    },[dispatch])

    const onChangePassword = useCallback((value: string)=>{
        dispatch(loginActions.setPassword(value))
    },[dispatch])

    const onLoginClick = useCallback(async ()=>{
        const result = await dispatch(loginByUsername({
            username,
            password
        }))
        if(result.meta.requestStatus === "fulfilled") {
            onSuccess();
        }
    
    },[dispatch, username, password, onSuccess])

    return (
        <DynamicModuleLoader 
            removeAfterUnmount={true} 
            reducers={initialReducers}
        >
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t("Auth form")}/>
                {error && <Text text={t("The data your enter is incorrect")} theme={TextTheme.ERROR}/>}
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;