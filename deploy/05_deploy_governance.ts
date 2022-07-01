import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import {
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
} from "../helper-hardhat-config"

const deployGovernorContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const scToken = await get("SCToken")
  const timeLock = await get("TimeLock")

  log("----------------------------------------------------")
  log("Deploying MyGovernor...")
  const governorContract = await deploy("MyGovernor", {
    from: deployer,
    args: [
        scToken.address,
        timeLock.address,
        QUORUM_PERCENTAGE,
        VOTING_PERIOD,
        VOTING_DELAY,
    ],
    log: true,
  })
  log(`MyGovernor at ${governorContract.address}`)
}

export default deployGovernorContract
deployGovernorContract.tags = ["all", "governor"]