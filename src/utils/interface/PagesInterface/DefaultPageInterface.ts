/**
 *  --------------------- Default for All the Pages Interface ---------------------
 * Add a interface that is common for the pages will be Declared here
 */

import { Dispatch } from "react";
import { AnyAction } from "redux";
import { NavigateOptions, To } from "react-router-dom";

export interface IDefaultPageProps {
    children?: React.ReactNode;
    navigate: (url: To, options?: NavigateOptions) => void;
    location: Location;
    dispatch: Dispatch<AnyAction>;
    isuserauthenticated: string | void;
}