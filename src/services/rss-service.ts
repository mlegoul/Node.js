import axios from 'axios';
import convert from 'xml-js';
import {RssModel} from '../models/rss-model';


const BASE_URL: string = 'https://www.lemonde.fr/rss/en_continu.xml';


// Convert rss to json after call url and clean JSON
async function convertRssToJson(): Promise<any> {
    const rssFeed = await axios.get(`${BASE_URL}`);

    return convert.xml2js(rssFeed.data)
        .elements
        .map(value1 => value1.elements
            .map((value2: RssModel) => value2.elements)
            .map(value3 => value3
                // Only have the last ten news
                .slice(7, 17)
                .map((value4: RssModel) => value4.elements)
                .map(value5 => value5
                    .reduce((acc) => {
                        return {
                            ...acc,
                            ...value5.slice(0, 1)
                                .reduce((acc, content: RssModel) => {
                                    return {
                                        ...acc, [content.name]: Object.values(content.elements)
                                            .map((value6: RssModel) => value6.cdata).toString()
                                    }
                                }, {}),
                            ...value5.slice(1, 2)
                                .reduce((acc, content: RssModel) => {
                                    return {
                                        ...acc, ['created_at']: Object.values(content.elements)
                                            .map((value6: RssModel) => value6.text).toString()
                                    }
                                }, {}),
                            ...value5.slice(2, 3)
                                .reduce((acc, content: RssModel) => {
                                    return {
                                        ...acc, [content.name]: Object.values(content.elements)
                                            .map((value6: RssModel) => value6.cdata).toString()
                                    }
                                }, {}),
                            ...value5.slice(4, 5)
                                .reduce((acc, content: RssModel) => {
                                    return {
                                        ...acc, [content.name]: Object.values(content.elements)
                                            .map((value6: RssModel) => value6.text).toString()
                                    }
                                }, {}),
                            ...value5.slice(5)
                                .reduce((acc, content: RssModel) => {
                                    return {
                                        ...acc, ['imgUrl']: Object.values(content.attributes)[0]
                                    }
                                }, {}),
                        }
                    }, {})
                )
            )
        )
        .reduce((acc, value) => {
            return value
                .reduce((acc, value) => {
                    return {
                        ...acc,
                        ...Object.values(value)
                    }
                }, {})
        }, {});
}

export default {
    convertRssToJson,
}
