import styles from "./App.module.scss"
import {Outlet} from "react-router-dom"
import {Suspense} from "react";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import ThemeProvider from "./contexts/ThemeContext.tsx";

function App() {

  return (
      <div className={`d-flex flex-column ${styles.appContainer}`}>
        <div className={"flex-fill d-flex flex-column"}>
            <ThemeProvider>
                <AuthProvider>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </AuthProvider>
            </ThemeProvider>
        </div>
      </div>
  )
}

export default App
