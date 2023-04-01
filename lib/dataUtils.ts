// import * as dfd from 'danfojs';

// @ts-nocheck
let firstYear = 0;
let lastYear = 0;

export interface ChannelItem {
    channelName: string;
    channelUrl: string;
    numVideosWatched: number;
}

interface JsonType {
    header?: string;
    title?: string;
    titleUrl?: string;
    subtitles?: {
        name?: string;
        url?: string;
    }[];
    time?: string;
    products?: string[];
    activityControls?: string[];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const processData = async (data: JsonType[]) => {
    let { overallData, firstYear, lastYear } = getOverallChannels(data);
    let yearData = getYearChannels(data);
    let monthData = getMonthChannels(data);
    // let danfoData = getDanfoData(data);

    // await sleep(2000); // fake sleep for testing

    return { overallData: overallData, yearData: yearData, monthData: monthData, firstYear: firstYear, lastYear: lastYear };
}

// export const getDanfoData = (data: JsonType[]) => {
//     let df = new dfd.DataFrame(data)
//     df['time'] =
//         df.print()
// }

export const getOverallChannels = (data: JsonType[]) => {
    let map = new Map<string, { numVideosWatched: number, channelUrl: string }>();

    // Count Videos for each channel
    for (let d of data) {
        if (d.hasOwnProperty('subtitles')) {
            let date = new Date(d.time);
            let videoYear = date.getFullYear();

            if (lastYear === 0) {
                lastYear = videoYear;
            }

            if (firstYear === 0 || firstYear > videoYear) {
                firstYear = videoYear;
            }

            let channelName = d.subtitles[0].name;
            let channelUrl = d.subtitles[0].url;
            if (map.has(channelName)) {

                let prevNumVideosWatched: number = 0;
                let item = map.get(channelName)
                if (item !== undefined) {
                    prevNumVideosWatched = item.numVideosWatched
                }
                map.set(channelName, { channelUrl: channelUrl, numVideosWatched: prevNumVideosWatched + 1 });
            }
            else {
                map.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 });
            }
        }
    }

    // Sort the map
    // let mapp = [...map].sort((a, b) => b[1].numVideosWatched > a[1].numVideosWatched ? 1 : -1);
    // let mappp = mapp.map((a) => ({ channelName: a[0], channelUrl: a[1].channelUrl, numVideosWatched: a[1].numVideosWatched }));

    // new method
    map = [...map.entries()].sort((a, b) => b[1].numVideosWatched > a[1].numVideosWatched ? 1 : -1)
    let list: ChannelItem[] = map.map((a) => ({ channelName: a[0], channelUrl: a[1].channelUrl, numVideosWatched: a[1].numVideosWatched }))

    return { overallData: list, firstYear: firstYear, lastYear: lastYear };
}

export const getYearChannels = (data: JsonType[]) => {
    let map = new Map();

    // Count Videos for each channel by year
    for (let d of data) {
        if (d.hasOwnProperty('subtitles')) {
            let date = new Date(d.time);
            let videoYear = date.getFullYear();
            let channelName = d.subtitles[0].name;
            let channelUrl = d.subtitles[0].url;

            if (map.has(videoYear)) {
                let innerMap = map.get(videoYear)
                if (innerMap.has(channelName)) {
                    let prevNumVideosWatched = innerMap.get(channelName).numVideosWatched
                    innerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: prevNumVideosWatched + 1 });
                }
                else {
                    innerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 });
                }
            }
            else {
                let innerMap = new Map();
                innerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 })
                map.set(videoYear, innerMap);
            }
        }
    }


    // Sort the map
    let newMap = new Map();

    map = [...map.entries()].map((yearItem) => {
        let innerMap = yearItem[1]; // yearItem[0] is the key aka the year

        // Sort the innerMap aka the channels map
        innerMap = [...innerMap.entries()].sort((a, b) => b[1].numVideosWatched > a[1].numVideosWatched ? 1 : -1);
        innerMap = innerMap.map((a) => ({ channelName: a[0], channelUrl: a[1].channelUrl, numVideosWatched: a[1].numVideosWatched }));
        newMap.set(yearItem[0], innerMap);
    });

    // yearData = newMap;

    return newMap;
}

const intToMonth = (month: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[month]
}

export const getMonthChannels = (data: JsonType[]) => {
    let map = new Map();

    // Count Videos for each channel by year
    for (let d of data) {
        if (d.hasOwnProperty('subtitles')) {
            let date = new Date(d.time);
            let videoYear = date.getFullYear().toString()
            let videoMonth = intToMonth(date.getMonth())
            let channelName = d.subtitles[0].name;
            let channelUrl = d.subtitles[0].url;

            if (map.has(videoYear)) {
                let innerMap = map.get(videoYear)
                if (innerMap.has(videoMonth)) {
                    let innerInnerMap = innerMap.get(videoMonth)
                    if (innerInnerMap.has(channelName)) {
                        let prevNumVideosWatched = innerInnerMap.get(channelName).numVideosWatched
                        innerInnerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: prevNumVideosWatched + 1 });
                    }
                    else {
                        innerInnerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 });
                    }
                }
                else {
                    let innerInnerMap = new Map();
                    innerInnerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 })
                    innerMap.set(videoMonth, innerInnerMap);
                }
            }
            else {
                let innerMap = new Map();
                let innerInnerMap = new Map();
                innerInnerMap.set(channelName, { channelUrl: channelUrl, numVideosWatched: 1 })
                innerMap.set(videoMonth, innerInnerMap);
                map.set(videoYear, innerMap);
            }
        }
    }

    // Sort the innerInnerMap aka the channels of the month map
    map = [...map.entries()].map((yearItem) => {
        let innerMap = yearItem[1]; // yearItem[0] is the key aka the year

        innerMap = [...innerMap.entries()].map((monthItem) => { 
            let innerInnerMap = monthItem[1]; // monthItem[0] is the key aka the month

            innerInnerMap = [...innerInnerMap.entries()].sort((a, b) => b[1].numVideosWatched > a[1].numVideosWatched ? 1 : -1);
            innerInnerMap = innerInnerMap.map((a) => ({ channelName: a[0], channelUrl: a[1].channelUrl, numVideosWatched: a[1].numVideosWatched }));
            return [monthItem[0], innerInnerMap]
        });

        return [yearItem[0], new Map(innerMap)]
    });
    return new Map(map)

}