import axios from 'axios';
import { JSONparser } from './parser'

const logicProof = async (problem) => {
    const result = await axios.get("https://www.wolframcloud.com/objects/2e02a25d-3eaf-4a6a-a772-7c16a8cd0666",{
        params: {
            problem
        }
    })
    return JSONparser(result.data.Result);
}

export default logicProof;