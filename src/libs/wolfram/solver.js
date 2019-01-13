import axios from 'axios';
import { JSONparser } from './parser'

const logicProof = async (problem) => {
    const result = await axios.get("https://www.wolframcloud.com/objects/405cf2ed-d64a-4a43-9a84-9d194517b783",{
        params: {
            problem
        }
    })
    return JSONparser(result.data.Result);
}

export default logicProof;