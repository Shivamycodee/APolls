import { AnonAadhaarPCD, exportCallDataGroth16FromPCD } from "anon-aadhaar-pcd";

async function main(_pcd){

    const { a, b, c, Input } = await exportCallDataGroth16FromPCD(_pcd);
    return { a, b, c, Input };

}

export default main;
