import { MainPage } from "@/components/pages/MainPage";
import { ReactElement } from "react";


export type elementConfig = {
    path: string,
    element: ReactElement
}

export const routerConfig: Record<string, elementConfig> = {
    main: {
        path: '/',
        element: < MainPage />
    },
}

