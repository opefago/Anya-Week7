import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deploySCToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments} = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying SCToken...")
  const scToken = await deploy("SCToken", {
    from: deployer,
    args: [1_000_000_000],
    log: true,
  })
  log(`SCToken at ${scToken.address}`)
  log(`Delegating to ${deployer}`)
  await delegate(scToken.address, deployer)
  log("Delegated!")
}

const delegate = async (scTokenAddress: string, delegatedAccount: string) => {
  const scToken = await ethers.getContractAt("SCToken", scTokenAddress)
  const transactionResponse = await scToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await scToken.numCheckpoints(delegatedAccount)}`)
}

export default deploySCToken
deploySCToken.tags = ["all", "sctoken"]