import { createContext, Dispatch, SetStateAction } from "react"


export interface ChannelItem{
    channelName: string;
    channelUrl: string;
    numVideosWatched: number;
}

export interface Data{
    title: string;
    overallData: ChannelItem[];
    yearData: Map<number, ChannelItem[]>;
    minYear: number;
    maxYear: number;
    setMinYear: Dispatch<SetStateAction<number>>;
    setMaxYear: Dispatch<SetStateAction<number>>;
    setOverallData: Dispatch<SetStateAction<ChannelItem[]>>;
    setYearData: Dispatch<SetStateAction<Map<number, ChannelItem[]>>>;
}

export const dataContextDefaultValue: Data = {
    title: "Hello new data",
    overallData: [],
    yearData: new Map(),
    minYear: 0,
    maxYear: 0,
    setMinYear: () => null,
    setMaxYear: () => null,
    setOverallData: () => null,
    setYearData: () => null,
}

export const DataContext = createContext<Data>(dataContextDefaultValue);

