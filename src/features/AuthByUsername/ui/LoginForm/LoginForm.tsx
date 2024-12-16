import { classNames } from "shared/lib/classNames/classNames";
import * as cls from "./LoginForm.module.scss";
import { useTranslation } from "react-i18next";
import Button, { ThemeButton } from "shared/ui/Button/Button";
import Input from "shared/ui/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback } from "react";
import { loginActions, loginReducer } from "../../model/slice/LoginSlice";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { AppDispatch } from "app/providers/StoreProvider/config/store";
import Text from "shared/ui/Text/Text";
import { TextTheme } from "shared/ui/Text/Text";
import { getLoginUsername } from "../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginError } from "../../model/selectors/getLoginError/getLoginError";
import DynamicModuleLoader, { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface LoginFormProps {
    className?: string;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const {t} = useTranslation()

    const dispatch = useDispatch<AppDispatch>()

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

    const onLoginClick = useCallback(()=>{
        dispatch(loginByUsername({
            username,
            password
        }))
    },[dispatch, username, password])

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