import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const deployStakingController: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const scToken = await get("SCToken")
  const rcToken = await get("RCToken")

  log("----------------------------------------------------")
  log("Deploying StakingController...")
  const stakingController = await deploy("StakingController", {
    from: deployer,
    args: [
        1500,
        scToken.address,
        rcToken.address,
        deployer
    ],
    log: true,
  })
  log(`StakingController at ${stakingController.address}`)
}

export default deployStakingController
deployStakingController.tags = ["all", "controller"]