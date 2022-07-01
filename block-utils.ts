import { network } from "hardhat"

export async function moveTime(amount: number) {
  console.log("Moving blocks...")
  await network.provider.send("evm_increaseTime", [amount])

  console.log(`Moved forward in time ${amount} seconds`)
}

export async function moveBlocks(amount: number) {
  console.log("Moving blocks...")
  for (let index = 0; index < amount; index++) {
    await network.provider.request({
      method: "evm_mine",
      params: [],
    })
  }
  console.log(`Moved ${amount} blocks`)
}
