import axios from "axios";
import { JSONparser } from "./parser";

const logicProof = async (problem) => {
  console.log(problem);
  const terms = problem.split("#");

  var linkData = require('./solverLinks.json')

  var link = undefined;
  //console.log("array:", terms);

  if(terms[1] === "Propositional Logic ")
  {
    const key = "PropositionalLogic";
    if(terms[2] === "Prove ")
    {
      const key2 = "Prove";
      link = linkData[key][key2]
      console.log("link:", link);
      problem = terms[3];
    }
  }

  //https://www.wolframcloud.com/objects/405cf2ed-d64a-4a43-9a84-9d194517b783
  const result = await axios.get(link, {
    params: {
      problem,
    },
  });
  return JSONparser(result.data.Result);
};

export default logicProof;
