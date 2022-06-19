import React from "react";
import ChemView from "../ChemView";
import { useParams } from "react-router-dom";

export const ChemViewWrapper = () => {
    const { key } = useParams();

    return <ChemView iKey={key} />
}