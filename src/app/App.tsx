import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";
import Modal from "shared/ui/Modal/Modal";
import { useState } from "react";

const App = () => {
  
    const { theme } = useTheme()

    const [isOpen, setIsOpen] = useState(false)

    

    return (
        <>
            <div className={classNames("app", {}, [theme])}>   
                <Suspense fallback="">
                    <Navbar />
                    <button onClick={()=>setIsOpen(true)}>{"toggle"}</button>
                    <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} >
                        {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti incidunt eum unde laborum amet explicabo alias quae dolore nobis ullam?"}
                    </Modal>
                    <div className="content-page">
                        <Sidebar />
                        <AppRouter />
                    </div>
                </Suspense>
            </div>
        </>
    )
}

export default App          