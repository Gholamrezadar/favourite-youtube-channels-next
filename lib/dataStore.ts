import { create } from 'zustand'
import { ChannelItem } from './dataUtils';

interface DataState {
    rawData: any;
    numVideos: number;
    minYear: number;
    maxYear: number;
    overallData: Map<string, ChannelItem>;
    yearData: Map<string, Map<string, ChannelItem>>;
    monthData: Map<string, Map<string, Map<string, ChannelItem>>>;
    rewatchData: Map<string, number>;
    mostFrequentWords: Map<string, number>;

    setRawData: (rawData: any) => void;
    setNumVideos: (numVideos: number) => void;
    setMinYear: (minYear: number) => void;
    setMaxYear: (maxYear: number) => void;
    setOverallData: (overallData: Map<string, ChannelItem>) => void;
    setYearData: (yearData: Map<string, Map<string, ChannelItem>>) => void;
    setMonthData: (monthData: Map<string, Map<string, Map<string, ChannelItem>>>) => void;
    setRewatchData: (rewatchData: Map<string, number>) => void;
    setMostFrequentWords: (mostFrequentWords: Map<string, number>) => void;
}

const useDataStore = create<DataState>((set) => ({
    rawData: null,
    numVideos: 0,
    minYear: 0,
    maxYear: 0,
    overallData: new Map(),
    yearData: new Map(),
    monthData: new Map(),
    rewatchData: new Map(),
    mostFrequentWords: new Map(),

    setRawData: (rawData: any) => set({ rawData }),
    setNumVideos: (numVideos: number) => set({ numVideos }),
    setMinYear: (minYear: number) => set({ minYear }),
    setMaxYear: (maxYear: number) => set({ maxYear }),
    setOverallData: (overallData: Map<string, ChannelItem>) => set({ overallData }),
    setYearData: (yearData: Map<string, Map<string, ChannelItem>>) => set({ yearData }),
    setMonthData: (monthData: Map<string, Map<string, Map<string, ChannelItem>>>) => set({ monthData }),
    setRewatchData: (rewatchData: Map<string, number>) => set({ rewatchData }),
    setMostFrequentWords: (mostFrequentWords: Map<string, number>) => set({ mostFrequentWords })
}))

export default useDataStore

// How to use later
// function BearCounter() {
//     const bears = useBearStore((state) => state.bears)
//     return <h1>{ bears } around here ...</h1>
// }

// function Controls() {
//     const increasePopulation = useBearStore((state) => state.increasePopulation)
//     return <button onClick={ increasePopulation }> one up < /button>
// }