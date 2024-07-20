import "../styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import { Suspense } from "react"


export const metadata = {
    title: "Promptopia",
    description: "A virtual world where you can create and explore unique prompts."
}

const Rootlayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <Provider>            
            <div className = "main">
                <div className = "gradient" />
            </div>
            <main className="app">
                <Nav />
                <Suspense>
                    {children}
                </Suspense>
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout