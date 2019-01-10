import axios from 'axios';

export const JSONparser = (arrayString) => {
    return JSON.parse(JSON.parse(arrayString));
};

export const TeXparser = async (stdString) => {
    let result = await axios.get("https://www.wolframcloud.com/objects/4d6d5550-5b10-4daf-ae17-faed628f04c8",{
        params: {
            stdform: stdString,
        }
    });
    return JSON.parse(result.data.Result);
}

export default {JSONparser, TeXparser}
