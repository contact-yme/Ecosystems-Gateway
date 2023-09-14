import { Nautilus } from "@deltadao/nautilus";

export async function compute(
  nautilus: Nautilus,
  datasetDid?: string,
  algoDid?: string //needs to be whitelisted on the dataset
) {
  const dataset = { did: datasetDid };

  const algorithm = { did: algoDid };

  const computeConfig = {
    dataset,
    algorithm,
  };

  const computeJob = await nautilus.compute(computeConfig);
  console.log("COMPUTE JOB: ", computeJob);
  return Array.isArray(computeJob) ? computeJob[0] : computeJob;
}

export async function getComputeStatus(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeJobStatus = await nautilus.getComputeStatus({
    jobId,
    providerUri,
  });
  console.log("Compute Job Status: ", computeJobStatus);
}

export async function retrieveComputeResult(
  nautilus: Nautilus,
  providerUri: string,
  jobId?: string
) {
  const computeResult = await nautilus.getComputeResult({
    jobId: jobId || "38d3ab56002844ac92fd72803129654b",
    providerUri,
  });
  console.log("Compute Result URL: ", computeResult);
}
