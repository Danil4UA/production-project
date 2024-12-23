import { classNames } from "shared/lib/classNames/classNames";
import DynamicModuleLoader, { ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { 
    fetchProfileData, 
    getProfileError, 
    getProfileForm, 
    getProfileIsLoading, 
    getProfileReadonly, 
    profileActions, 
    ProfileCard, 
    profileReducer,
} from "entities/Profile";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useSelector } from "react-redux";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";

const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string; 
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)

    useEffect(()=>{
        dispatch(fetchProfileData())
    }, [dispatch])

    const onChangeFistname = useCallback((value?: string)=> {
        dispatch(profileActions.updateProfile({first: value || ""}))
    }, [dispatch])

    const onChangeLastname = useCallback((value?: string)=> {
        dispatch(profileActions.updateProfile({lastname: value || ""}))
    }, [dispatch])

    const onChangeAge = useCallback((value?: string)=> {
        const convertedNumber = Number(value)
        if(convertedNumber){
            dispatch(profileActions.updateProfile({age: Number(value || 0)}))
        } 
    }, [dispatch])

    const onChangeCity = useCallback((value?: string)=> {
        dispatch(profileActions.updateProfile({city: value || ""}))
    }, [dispatch])

    const onChangeUsername= useCallback((value?: string)=> {
        dispatch(profileActions.updateProfile({username: value || ""}))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string)=> {
        dispatch(profileActions.updateProfile({avatar: value || ""}))
    }, [dispatch])

    const onChangeCurrency = useCallback((currency?: Currency)=> {
        dispatch(profileActions.updateProfile({currency}))
    }, [dispatch])

    const onChangeCountry= useCallback((country?: Country)=> {
        dispatch(profileActions.updateProfile({country}))
    }, [dispatch])



    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <div className={classNames("", {}, [className])}>
                <ProfilePageHeader />
                <ProfileCard 
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFistname={onChangeFistname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                    readonly={readonly}
                />
            </div>
        </DynamicModuleLoader>
        
    );
};

export default ProfilePage;