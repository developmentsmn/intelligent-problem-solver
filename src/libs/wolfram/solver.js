import axios from 'axios';
import {JSONparser} from './parser'

const logicProof = async (problem) => {
    var result = await axios.get("https://www.wolframcloud.com/objects/3408893e-452a-49cc-bbbe-2154fd636900",{
        params: {
            problem
        }
    })
    return JSONparser(result.data.Result);
}

export default logicProof;