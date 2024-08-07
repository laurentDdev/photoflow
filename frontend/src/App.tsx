import styles from "./App.module.scss"
import {Outlet} from "react-router-dom"
import {Suspense} from "react";
import {AuthProvider} from "./contexts/AuthContext.tsx";

function App() {

  return (
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <div className={"flex-fill d-flex flex-column"}>
            <AuthProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </AuthProvider>
        </div>
      </div>
  )
}

export default App
