import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ethers } from "hardhat"

const deployRCToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments} = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("----------------------------------------------------")
  log("Deploying RCToken")
  const rcToken = await deploy("RCToken", {
    from: deployer,
    args: [1_000_000_000],
    log: true,
  })
  log(`RCToken at ${rcToken.address}`)
  log(`Delegating to ${deployer}`)
  //await delegate(rcToken.address, deployer)
  log("Delegated!")
}

const delegate = async (rcTokenAddress: string, delegatedAccount: string) => {
  const rcToken = await ethers.getContractAt("RCToken", rcTokenAddress)
  const transactionResponse = await rcToken.delegate(delegatedAccount)
  await transactionResponse.wait(1)
  console.log(`Checkpoints: ${await rcToken.numCheckpoints(delegatedAccount)}`)
}

export default deployRCToken
deployRCToken.tags = ["all", "rctoken"]