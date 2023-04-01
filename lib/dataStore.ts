import { create } from 'zustand'
import { ChannelItem, VideoItem } from './dataUtils';

interface DataState {
    rawData: any;
    numVideos: number;
    minYear: number;
    maxYear: number;
    overallData: ChannelItem[];
    yearData: Map<string, ChannelItem[]>;
    monthData: Map<string, Map<string, ChannelItem[]>>;
    rewatchData: VideoItem[];
    mostFrequentWords: Map<string, number>;

    setRawData: (rawData: any) => void;
    setNumVideos: (numVideos: number) => void;
    setMinYear: (minYear: number) => void;
    setMaxYear: (maxYear: number) => void;
    setOverallData: (overallData: ChannelItem[]) => void;
    setYearData: (yearData: Map<string, ChannelItem[]>) => void;
    setMonthData: (monthData: Map<string, Map<string, ChannelItem[]>>) => void;
    setRewatchData: (rewatchData: VideoItem[]) => void;
    setMostFrequentWords: (mostFrequentWords: Map<string, number>) => void;
}

const useDataStore = create<DataState>((set) => ({
    rawData: null,
    numVideos: 0,
    minYear: 0,
    maxYear: 0,
    overallData: [],
    yearData: new Map(),
    monthData: new Map(),
    rewatchData: [],
    mostFrequentWords: new Map(),

    setRawData: (rawData: any) => set({ rawData }),
    setNumVideos: (numVideos: number) => set({ numVideos }),
    setMinYear: (minYear: number) => set({ minYear }),
    setMaxYear: (maxYear: number) => set({ maxYear }),
    setOverallData: (overallData: ChannelItem[]) => set({ overallData }),
    setYearData: (yearData: Map<string, ChannelItem[]>) => set({ yearData }),
    setMonthData: (monthData: Map<string, Map<string, ChannelItem[]>>) => set({ monthData }),
    setRewatchData: (rewatchData: VideoItem[]) => set({ rewatchData }),
    setMostFrequentWords: (mostFrequentWords: Map<string, number>) => set({ mostFrequentWords })
}))

export default useDataStore